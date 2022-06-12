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
const lambda = __importStar(require("@aws-cdk/aws-lambda"));
const s3 = __importStar(require("@aws-cdk/aws-s3"));
const apigw = __importStar(require("@aws-cdk/aws-apigateway"));
const path = __importStar(require("path"));
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
    const lam = new lambda.Function(context, name, {
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 512,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, codepath)),
        role: lambdaExecRole,
        environment: {}
    });
    return [lambdaExecRole, lam];
};
class WLogsBlamerInfraStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const [lambdaExecRoleHandleReports, lambdaHandleReports] = createLambda(this, "ReportsHandler", "../code/build/reports");
        /**
         * S3
         * Microlance Frontend
         */
        const blamerFrontend = new s3.Bucket(this, 'WLogsBlamerFrontendBucket', {
            bucketName: 'WLogsBlamer-frontend',
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
        const userHandlerResource = createApiGwLambdaIntegration(api, lambdaHandleReports, "USER");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid0xvZ3NCbGFtZXJJbmZyYVN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid0xvZ3NCbGFtZXJJbmZyYVN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFDO0FBQ3JDLHNEQUF3QztBQUN4QyxvRUFBc0Q7QUFDdEQsNERBQW9EO0FBQ3BELHlFQUEyRDtBQUMzRCw0REFBOEM7QUFDOUMsb0RBQXNDO0FBQ3RDLCtEQUFpRDtBQUVqRCwyQ0FBNkI7QUFFN0I7Ozs7Ozs7OztHQVNHO0FBRUgsNkJBQTZCO0FBQzdCLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsTUFBdUIsRUFBRSxPQUFlLEVBQUUsRUFBRTtJQUM1RixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxRQUFRLENBQUMsU0FBUyxDQUNkLE1BQU0sRUFDTixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUF5QixFQUFFO1FBQ25ELG1CQUFtQixFQUFFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhO1FBQzVELGVBQWUsRUFBRSxLQUFLO0tBQ3pCLENBQUMsQ0FDTCxDQUFDO0lBQ0YsUUFBUSxDQUFDLFNBQVMsQ0FDZCxLQUFLLEVBQ0wsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBeUIsRUFBRTtRQUNuRCxtQkFBbUIsRUFBRSxLQUFLLENBQUMsbUJBQW1CLENBQUMsYUFBYTtRQUM1RCxlQUFlLEVBQUUsS0FBSztLQUN6QixDQUFDLENBQ0wsQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBa0IsRUFBRSxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3hFLE1BQU0sY0FBYyxHQUFhLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVB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QUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLGdCQUFnQixDQUFDLENBQUM7UUFFdkcsTUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdkQsZUFBZSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixvQkFBb0IsRUFBRSxVQUFVLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2dCQUN2RSxRQUFRLEVBQUUsS0FBSzthQUNsQjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixTQUFTLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUI7b0JBQ3ZFLFFBQVEsRUFBRSxLQUFLO29CQUNmLGNBQWMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLFNBQVM7b0JBQ25ELFdBQVcsRUFBRSw0QkFBVyxDQUFDLGdCQUFnQjtpQkFDNUM7YUFDSjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWpFRCxzREFpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSBcIkBhd3MtY2RrL2F3cy1pYW1cIjtcbmltcG9ydCAqIGFzIGNsb3VkZnJvbnQgZnJvbSBcIkBhd3MtY2RrL2F3cy1jbG91ZGZyb250XCI7XG5pbXBvcnQge0NhY2hlUG9saWN5fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCAqIGFzIG9yaWdpbnMgZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQtb3JpZ2lucyc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIHMzIGZyb20gXCJAYXdzLWNkay9hd3MtczNcIjtcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHtSZXN0QXBpfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbi8qKlxuICogQXBwOlxuICogUzNcbiAqIENGXG4gKlxuICogTGFtYmRhc1xuICogQVBJIEdhdGV3YXlcbiAqIHBvc3RncmVzXG4gKlxuICovXG5cbi8vIGFkZCBpbnRlZ3JhdGlvblJlc3BvbnNlISEhXG5jb25zdCBjcmVhdGVBcGlHd0xhbWJkYUludGVncmF0aW9uID0gKGFwaTogUmVzdEFwaSwgbGFtYmRhOiBsYW1iZGEuRnVuY3Rpb24sIHJlc1BhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHJlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UocmVzUGF0aCk7XG4gICAgcmVzb3VyY2UuYWRkTWV0aG9kKFxuICAgICAgICAnUE9TVCcsXG4gICAgICAgIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGEgYXMgbGFtYmRhLkZ1bmN0aW9uLCB7XG4gICAgICAgICAgICBwYXNzdGhyb3VnaEJlaGF2aW9yOiBhcGlndy5QYXNzdGhyb3VnaEJlaGF2aW9yLldIRU5fTk9fTUFUQ0gsXG4gICAgICAgICAgICBhbGxvd1Rlc3RJbnZva2U6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJlc291cmNlLmFkZE1ldGhvZChcbiAgICAgICAgJ0dFVCcsXG4gICAgICAgIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGEgYXMgbGFtYmRhLkZ1bmN0aW9uLCB7XG4gICAgICAgICAgICBwYXNzdGhyb3VnaEJlaGF2aW9yOiBhcGlndy5QYXNzdGhyb3VnaEJlaGF2aW9yLldIRU5fTk9fTUFUQ0gsXG4gICAgICAgICAgICBhbGxvd1Rlc3RJbnZva2U6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiByZXNvdXJjZTtcbn1cblxuY29uc3QgY3JlYXRlTGFtYmRhID0gKGNvbnRleHQ6IGNkay5TdGFjaywgbmFtZTogc3RyaW5nLCBjb2RlcGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbGFtYmRhRXhlY1JvbGU6IGlhbS5Sb2xlID0gbmV3IGlhbS5Sb2xlKGNvbnRleHQsIFwibGFtYmRhV0xvZ3NCbGFtZXJFeGVjUm9sZVwiICsgbmFtZSwge1xuICAgICAgICByb2xlTmFtZTogXCJsYW1iZGFXTG9nc0JsYW1lckV4ZWNSb2xlXCIgKyBuYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoXCJsYW1iZGEuYW1hem9uYXdzLmNvbVwiKSxcbiAgICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlXCIpLFxuICAgICAgICBdXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW06IGxhbWJkYS5GdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24oY29udGV4dCwgbmFtZSwge1xuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgbWVtb3J5U2l6ZTogNTEyLFxuICAgICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCBjb2RlcGF0aCkpLFxuICAgICAgICByb2xlOiBsYW1iZGFFeGVjUm9sZSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHt9XG4gICAgfSk7XG4gICAgcmV0dXJuIFtsYW1iZGFFeGVjUm9sZSwgbGFtXTtcbn1cblxuZXhwb3J0IGNsYXNzIFdMb2dzQmxhbWVySW5mcmFTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgICAgIGNvbnN0IFtsYW1iZGFFeGVjUm9sZUhhbmRsZVJlcG9ydHMsIGxhbWJkYUhhbmRsZVJlcG9ydHNdID0gY3JlYXRlTGFtYmRhKHRoaXMsIFwiUmVwb3J0c0hhbmRsZXJcIiwgXCIuLi9jb2RlL2J1aWxkL3JlcG9ydHNcIik7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTM1xuICAgICAgICAgKiBNaWNyb2xhbmNlIEZyb250ZW5kXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBibGFtZXJGcm9udGVuZCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1dMb2dzQmxhbWVyRnJvbnRlbmRCdWNrZXQnLCB7XG4gICAgICAgICAgICBidWNrZXROYW1lOiAnV0xvZ3NCbGFtZXItZnJvbnRlbmQnLFxuICAgICAgICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcbiAgICAgICAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcbiAgICAgICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQVBJIEdhdGV3YXlcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsICd3bG9ncy1ibGFtZXItYXBpJywge1xuICAgICAgICAgICAgZmFpbE9uV2FybmluZ3M6IHRydWUsXG4gICAgICAgICAgICBkZXBsb3k6IHRydWUsXG4gICAgICAgICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlMsXG4gICAgICAgICAgICAgICAgYWxsb3dIZWFkZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgICcqJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkZXBsb3ltZW50ID0gbmV3IGFwaWd3LkRlcGxveW1lbnQodGhpcywgJ2V0YycsIHthcGk6IGFwaX0pO1xuXG4gICAgICAgIGNvbnN0IFtkZXZTdGFnZV0gPSBbJ2RldiddLm1hcChpdGVtID0+IG5ldyBhcGlndy5TdGFnZSh0aGlzLCBgJHtpdGVtfV9zdGFnZWAsIHtcbiAgICAgICAgICAgIGRlcGxveW1lbnQ6IGRlcGxveW1lbnQsXG4gICAgICAgICAgICBzdGFnZU5hbWU6IGl0ZW1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGFwaS5kZXBsb3ltZW50U3RhZ2UgPSBkZXZTdGFnZVxuICAgICAgICBjb25zdCB1c2VySGFuZGxlclJlc291cmNlID0gY3JlYXRlQXBpR3dMYW1iZGFJbnRlZ3JhdGlvbihhcGksIGxhbWJkYUhhbmRsZVJlcG9ydHMgYXMgbGFtYmRhLkZ1bmN0aW9uLCBcIlVTRVJcIik7XG5cblxuICAgICAgICAobGFtYmRhSGFuZGxlUmVwb3J0cyBhcyBsYW1iZGEuRnVuY3Rpb24pLmdyYW50SW52b2tlKG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tJykpO1xuXG4gICAgICAgIGNvbnN0IHMzX29yaWdpbiA9IG5ldyBvcmlnaW5zLlMzT3JpZ2luKGJsYW1lckZyb250ZW5kKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2xvdWRGcm9udFxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgYXBpX29yaWdpbiA9IG5ldyBvcmlnaW5zLkh0dHBPcmlnaW4oYCR7YXBpLnJlc3RBcGlJZH0uZXhlY3V0ZS1hcGkuJHt0aGlzLnJlZ2lvbn0uYW1hem9uYXdzLmNvbWApO1xuXG4gICAgICAgIGNvbnN0IGRpc3QgPSBuZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgJ0JsYW1lckZFJywge1xuICAgICAgICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBzM19vcmlnaW4sXG4gICAgICAgICAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IGNsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXG4gICAgICAgICAgICAgICAgY29tcHJlc3M6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkaXRpb25hbEJlaGF2aW9yczoge1xuICAgICAgICAgICAgICAgICdiYWNrZW5kJzoge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW46IGFwaV9vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBjbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxuICAgICAgICAgICAgICAgICAgICBjb21wcmVzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRNZXRob2RzOiBjbG91ZGZyb250LkFsbG93ZWRNZXRob2RzLkFMTE9XX0FMTCxcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVQb2xpY3k6IENhY2hlUG9saWN5LkNBQ0hJTkdfRElTQUJMRURcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==