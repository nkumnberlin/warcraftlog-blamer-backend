"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WLogsBlamerInfraStack = void 0;
const cdk = __importStar(require("@aws-cdk/core"));
const iam = __importStar(require("@aws-cdk/aws-iam"));
const cloudfront = __importStar(require("@aws-cdk/aws-cloudfront"));
const aws_cloudfront_1 = require("@aws-cdk/aws-cloudfront");
const origins = __importStar(require("@aws-cdk/aws-cloudfront-origins"));
const lambda = __importStar(require("@aws-cdk/aws-lambda-nodejs"));
const s3 = __importStar(require("@aws-cdk/aws-s3"));
const apigw = __importStar(require("@aws-cdk/aws-apigateway"));
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
const createApiGwLambdaIntegration = (api, lambda, resPath) => {
    const resource = api.root.addResource(resPath);
    resource.addMethod('POST', new apigw.LambdaIntegration(lambda, {
        passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
        allowTestInvoke: false,
    }));
    resource.addMethod('GET', new apigw.LambdaIntegration(lambda, {
        passthroughBehavior: apigw.PassthroughBehavior.WHEN_NO_MATCH,
        allowTestInvoke: false,
    }));
    return resource;
};
const createLambda = (context, name, codepath) => {
    const lambdaExecRole = new iam.Role(context, "lambdaWLogsBlamerExecRole" + name, {
        roleName: "lambdaWLogsBlamerExecRole" + name,
        description: "",
        assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
        ]
    });
    // manually add node-modules
    const lam = new lambda.NodejsFunction(context, name, {
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
};
class WLogsBlamerInfraStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const [lambdaExecRoleHandleReports, lambdaHandleReports] = createLambda(this, "ReportsHandler", "./code/build/src/gear/index.js");
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
        const deployment = new apigw.Deployment(this, 'etc', { api: api });
        const [devStage] = ['dev'].map(item => new apigw.Stage(this, `${item}_stage`, {
            deployment: deployment,
            stageName: item
        }));
        api.deploymentStage = devStage;
        const reportsHandlerResource = createApiGwLambdaIntegration(api, lambdaHandleReports, "REPORTS");
        lambdaHandleReports.grantInvoke(new iam.ServicePrincipal('apigateway.amazonaws.com'));
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
                    cachePolicy: aws_cloudfront_1.CachePolicy.CACHING_DISABLED
                }
            }
        });
    }
}
exports.WLogsBlamerInfraStack = WLogsBlamerInfraStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid0xvZ3NCbGFtZXJJbmZyYVN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid0xvZ3NCbGFtZXJJbmZyYVN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFDO0FBQ3JDLHNEQUF3QztBQUN4QyxvRUFBc0Q7QUFDdEQsNERBQW9EO0FBQ3BELHlFQUEyRDtBQUMzRCxtRUFBcUQ7QUFDckQsb0RBQXNDO0FBQ3RDLCtEQUFpRDtBQUdqRDs7Ozs7Ozs7O0dBU0c7QUFFSCw2QkFBNkI7QUFDN0IsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLEdBQVksRUFBRSxNQUE2QixFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ2xHLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQ2QsTUFBTSxFQUNOLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQStCLEVBQUU7UUFDekQsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGFBQWE7UUFDNUQsZUFBZSxFQUFFLEtBQUs7S0FDekIsQ0FBQyxDQUNMLENBQUM7SUFDRixRQUFRLENBQUMsU0FBUyxDQUNkLEtBQUssRUFDTCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUErQixFQUFFO1FBQ3pELG1CQUFtQixFQUFFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhO1FBQzVELGVBQWUsRUFBRSxLQUFLO0tBQ3pCLENBQUMsQ0FDTCxDQUFDO0lBQ0YsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFrQixFQUFFLElBQVksRUFBRSxRQUFnQixFQUFFLEVBQUU7SUFDeEUsTUFBTSxjQUFjLEdBQWEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSwyQkFBMkIsR0FB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RyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsQ0FBQztRQUV2RyxNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN2RCxlQUFlLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUI7Z0JBQ3ZFLFFBQVEsRUFBRSxLQUFLO2FBQ2xCO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFNBQVMsRUFBRTtvQkFDUCxNQUFNLEVBQUUsVUFBVTtvQkFDbEIsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjtvQkFDdkUsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsY0FBYyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsU0FBUztvQkFDbkQsV0FBVyxFQUFFLDRCQUFXLENBQUMsZ0JBQWdCO2lCQUM1QzthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbkVELHNEQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCB7Q2FjaGVQb2xpY3l9IGZyb20gXCJAYXdzLWNkay9hd3MtY2xvdWRmcm9udFwiO1xuaW1wb3J0ICogYXMgb3JpZ2lucyBmcm9tICdAYXdzLWNkay9hd3MtY2xvdWRmcm9udC1vcmlnaW5zJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanNcIjtcbmltcG9ydCAqIGFzIHMzIGZyb20gXCJAYXdzLWNkay9hd3MtczNcIjtcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHtSZXN0QXBpfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcblxuLyoqXG4gKiBBcHA6XG4gKiBTM1xuICogQ0ZcbiAqXG4gKiBMYW1iZGFzXG4gKiBBUEkgR2F0ZXdheVxuICogcG9zdGdyZXNcbiAqXG4gKi9cblxuLy8gYWRkIGludGVncmF0aW9uUmVzcG9uc2UhISFcbmNvbnN0IGNyZWF0ZUFwaUd3TGFtYmRhSW50ZWdyYXRpb24gPSAoYXBpOiBSZXN0QXBpLCBsYW1iZGE6IGxhbWJkYS5Ob2RlanNGdW5jdGlvbiwgcmVzUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShyZXNQYXRoKTtcbiAgICByZXNvdXJjZS5hZGRNZXRob2QoXG4gICAgICAgICdQT1NUJyxcbiAgICAgICAgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYSBhcyBsYW1iZGEuTm9kZWpzRnVuY3Rpb24sIHtcbiAgICAgICAgICAgIHBhc3N0aHJvdWdoQmVoYXZpb3I6IGFwaWd3LlBhc3N0aHJvdWdoQmVoYXZpb3IuV0hFTl9OT19NQVRDSCxcbiAgICAgICAgICAgIGFsbG93VGVzdEludm9rZTogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgICk7XG4gICAgcmVzb3VyY2UuYWRkTWV0aG9kKFxuICAgICAgICAnR0VUJyxcbiAgICAgICAgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYSBhcyBsYW1iZGEuTm9kZWpzRnVuY3Rpb24sIHtcbiAgICAgICAgICAgIHBhc3N0aHJvdWdoQmVoYXZpb3I6IGFwaWd3LlBhc3N0aHJvdWdoQmVoYXZpb3IuV0hFTl9OT19NQVRDSCxcbiAgICAgICAgICAgIGFsbG93VGVzdEludm9rZTogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgICk7XG4gICAgcmV0dXJuIHJlc291cmNlO1xufVxuXG5jb25zdCBjcmVhdGVMYW1iZGEgPSAoY29udGV4dDogY2RrLlN0YWNrLCBuYW1lOiBzdHJpbmcsIGNvZGVwYXRoOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBsYW1iZGFFeGVjUm9sZTogaWFtLlJvbGUgPSBuZXcgaWFtLlJvbGUoY29udGV4dCwgXCJsYW1iZGFXTG9nc0JsYW1lckV4ZWNSb2xlXCIgKyBuYW1lLCB7XG4gICAgICAgIHJvbGVOYW1lOiBcImxhbWJkYVdMb2dzQmxhbWVyRXhlY1JvbGVcIiArIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChcImxhbWJkYS5hbWF6b25hd3MuY29tXCIpLFxuICAgICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgICAgIGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcInNlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGVcIiksXG4gICAgICAgIF1cbiAgICB9KTtcblxuICAgIC8vIG1hbnVhbGx5IGFkZCBub2RlLW1vZHVsZXNcbiAgICBjb25zdCBsYW06IGxhbWJkYS5Ob2RlanNGdW5jdGlvbiA9IG5ldyBsYW1iZGEuTm9kZWpzRnVuY3Rpb24oY29udGV4dCwgbmFtZSwge1xuICAgICAgICBtZW1vcnlTaXplOiA1MTIsXG4gICAgICAgIGhhbmRsZXI6ICdsYW1iZGFIYW5kbGVyJyxcbiAgICAgICAgZW50cnk6IGNvZGVwYXRoLFxuICAgICAgICBidW5kbGluZzoge1xuICAgICAgICAgICAgbm9kZU1vZHVsZXM6IFsnZ3JhcGhxbC1yZXF1ZXN0JywgJ2dyYXBocWwnXSxcbiAgICAgICAgfSxcbiAgICAgICAgcm9sZTogbGFtYmRhRXhlY1JvbGUsXG4gICAgICAgIGVudmlyb25tZW50OiB7fVxuICAgIH0pO1xuICAgIHJldHVybiBbbGFtYmRhRXhlY1JvbGUsIGxhbV07XG59XG5cbmV4cG9ydCBjbGFzcyBXTG9nc0JsYW1lckluZnJhU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgICAgICBjb25zdCBbbGFtYmRhRXhlY1JvbGVIYW5kbGVSZXBvcnRzLCBsYW1iZGFIYW5kbGVSZXBvcnRzXSA9IGNyZWF0ZUxhbWJkYSh0aGlzLCBcIlJlcG9ydHNIYW5kbGVyXCIsIFwiLi9jb2RlL2J1aWxkL3NyYy9nZWFyL2luZGV4LmpzXCIpO1xuICAgICAgICAvKipcbiAgICAgICAgICogUzNcbiAgICAgICAgICogTWljcm9sYW5jZSBGcm9udGVuZFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgYmxhbWVyRnJvbnRlbmQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdXTG9nc0JsYW1lckZyb250ZW5kQnVja2V0Jywge1xuICAgICAgICAgICAgYnVja2V0TmFtZTogJ3dsb2dzYmxhbWVyLWZyb250ZW5kJyxcbiAgICAgICAgICAgIHdlYnNpdGVJbmRleERvY3VtZW50OiAnaW5kZXguaHRtbCcsXG4gICAgICAgICAgICBlbmNyeXB0aW9uOiBzMy5CdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXG4gICAgICAgICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFQSSBHYXRld2F5XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ3cuUmVzdEFwaSh0aGlzLCAnd2xvZ3MtYmxhbWVyLWFwaScsIHtcbiAgICAgICAgICAgIGZhaWxPbldhcm5pbmdzOiB0cnVlLFxuICAgICAgICAgICAgZGVwbG95OiB0cnVlLFxuICAgICAgICAgICAgZGVmYXVsdENvcnNQcmVmbGlnaHRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlndy5Db3JzLkFMTF9NRVRIT0RTLFxuICAgICAgICAgICAgICAgIGFsbG93T3JpZ2luczogYXBpZ3cuQ29ycy5BTExfT1JJR0lOUyxcbiAgICAgICAgICAgICAgICBhbGxvd0hlYWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgJyonXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGVwbG95bWVudCA9IG5ldyBhcGlndy5EZXBsb3ltZW50KHRoaXMsICdldGMnLCB7YXBpOiBhcGl9KTtcblxuICAgICAgICBjb25zdCBbZGV2U3RhZ2VdID0gWydkZXYnXS5tYXAoaXRlbSA9PiBuZXcgYXBpZ3cuU3RhZ2UodGhpcywgYCR7aXRlbX1fc3RhZ2VgLCB7XG4gICAgICAgICAgICBkZXBsb3ltZW50OiBkZXBsb3ltZW50LFxuICAgICAgICAgICAgc3RhZ2VOYW1lOiBpdGVtXG4gICAgICAgIH0pKTtcblxuICAgICAgICBhcGkuZGVwbG95bWVudFN0YWdlID0gZGV2U3RhZ2VcbiAgICAgICAgY29uc3QgcmVwb3J0c0hhbmRsZXJSZXNvdXJjZSA9IGNyZWF0ZUFwaUd3TGFtYmRhSW50ZWdyYXRpb24oYXBpLCBsYW1iZGFIYW5kbGVSZXBvcnRzIGFzIGxhbWJkYS5Ob2RlanNGdW5jdGlvbiwgXCJSRVBPUlRTXCIpO1xuXG5cbiAgICAgICAgKGxhbWJkYUhhbmRsZVJlcG9ydHMgYXMgbGFtYmRhLk5vZGVqc0Z1bmN0aW9uKS5ncmFudEludm9rZShuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2FwaWdhdGV3YXkuYW1hem9uYXdzLmNvbScpKTtcblxuICAgICAgICBjb25zdCBzM19vcmlnaW4gPSBuZXcgb3JpZ2lucy5TM09yaWdpbihibGFtZXJGcm9udGVuZCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsb3VkRnJvbnRcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGFwaV9vcmlnaW4gPSBuZXcgb3JpZ2lucy5IdHRwT3JpZ2luKGAke2FwaS5yZXN0QXBpSWR9LmV4ZWN1dGUtYXBpLiR7dGhpcy5yZWdpb259LmFtYXpvbmF3cy5jb21gKTtcblxuICAgICAgICBjb25zdCBkaXN0ID0gbmV3IGNsb3VkZnJvbnQuRGlzdHJpYnV0aW9uKHRoaXMsICdCbGFtZXJGRScsIHtcbiAgICAgICAgICAgIGRlZmF1bHRCZWhhdmlvcjoge1xuICAgICAgICAgICAgICAgIG9yaWdpbjogczNfb3JpZ2luLFxuICAgICAgICAgICAgICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBjbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuICAgICAgICAgICAgICAgIGNvbXByZXNzOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxCZWhhdmlvcnM6IHtcbiAgICAgICAgICAgICAgICAnYmFja2VuZCc6IHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiBhcGlfb3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkTWV0aG9kczogY2xvdWRmcm9udC5BbGxvd2VkTWV0aG9kcy5BTExPV19BTEwsXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlUG9saWN5OiBDYWNoZVBvbGljeS5DQUNISU5HX0RJU0FCTEVEXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=