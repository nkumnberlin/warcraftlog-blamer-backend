import * as cdk from '@aws-cdk/core';
import * as iam from "@aws-cdk/aws-iam";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import {CachePolicy} from "@aws-cdk/aws-cloudfront";
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import * as s3 from "@aws-cdk/aws-s3";
import * as apigw from "@aws-cdk/aws-apigateway";
import {RestApi} from "@aws-cdk/aws-apigateway";

/**
 * App:
 * S3
 * CF
 *
 * Lambdas
 * API Gateway
 * postgres
 *
 */

// add integrationResponse!!!
const createApiGwLambdaIntegration = (api: RestApi, lambda: lambda.NodejsFunction, resPath: string) => {
    const resource = api.root.addResource(resPath);
    resource.addMethod(
        'POST',
        new apigw.LambdaIntegration(lambda as lambda.NodejsFunction, {
            passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
            allowTestInvoke: false,
        }),
    );
    resource.addMethod(
        'GET',
        new apigw.LambdaIntegration(lambda as lambda.NodejsFunction, {
            passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
            allowTestInvoke: false,
        }),
    );
    return resource;
}

const createLambda = (context: cdk.Stack, name: string, codepath: string) => {
    const lambdaExecRole: iam.Role = new iam.Role(context, "lambdaWLogsBlamerExecRole" + name, {
        roleName: "lambdaWLogsBlamerExecRole" + name,
        description: "",
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
        ]
    });

    // manually add node-modules
    const lam: lambda.NodejsFunction = new lambda.NodejsFunction(context, name, {
        memorySize: 512,
        handler: 'lambdaHandler',
        entry: codepath,
        bundling: {
            nodeModules: ['graphql-request', 'graphql'],
        },
        role: lambdaExecRole,
        environment: {}
    });
    return [lambdaExecRole, lam];
}

export class WLogsBlamerInfraStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const [lambdaExecRoleHandleReports, lambdaHandleReports] = createLambda(this, "ReportsHandler", "./code/build/src/reports/index.js");
        /**
         * S3
         * Microlance Frontend
         */
        const blamerFrontend = new s3.Bucket(this, 'WLogsBlamerFrontendBucket', {
            bucketName: 'wlogsblamer-frontend',
            websiteIndexDocument: 'index.html',
            encryption: s3.BucketEncryption.S3_MANAGED,
            publicReadAccess: false,
        });

        /**
         * API Gateway
         */
        const api = new apigw.RestApi(this, 'wlogs-blamer-api', {
            failOnWarnings: true,
            deploy: true,
            defaultCorsPreflightOptions: {
                allowMethods: apigw.Cors.ALL_METHODS,
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowHeaders: [
                    '*'
                ],
            }
        });

        const deployment = new apigw.Deployment(this, 'etc', {api: api});

        const [devStage] = ['dev'].map(item => new apigw.Stage(this, `${item}_stage`, {
            deployment: deployment,
            stageName: item
        }));

        api.deploymentStage = devStage
        const reportsHandlerResource = createApiGwLambdaIntegration(api, lambdaHandleReports as lambda.NodejsFunction, "REPORTS");


        (lambdaHandleReports as lambda.NodejsFunction).grantInvoke(new iam.ServicePrincipal('apigateway.amazonaws.com'));

        const s3_origin = new origins.S3Origin(blamerFrontend);

        /**
         * CloudFront
         */
        const api_origin = new origins.HttpOrigin(`${api.restApiId}.execute-api.${this.region}.amazonaws.com`);

        const dist = new cloudfront.Distribution(this, 'BlamerFE', {
            defaultBehavior: {
                origin: s3_origin,
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: false
            },
            additionalBehaviors: {
                'backend': {
                    origin: api_origin,
                    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    compress: false,
                    allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
                    cachePolicy: CachePolicy.CACHING_DISABLED
                }
            }
        });
    }
}
