import {APIGatewayProxyEvent} from 'aws-lambda';
import {Actions, IQueryVars} from "../../src/interfaces";

const eventData: APIGatewayProxyEvent = {
    resource: '/REPORTS',
    path: '/REPORTS',
    httpMethod: 'GET',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjgwNDRjYy0wMTNlLTRiYjgtOGMwNC1hZDhjN2EzMTY2OTciLCJqdGkiOiJhODg4ZTAyYWYwZjZhYmJiNWM3M2E2NzhmZmU1OGFjNTNhY2U4NmVkYWNmNWIxNjJkMTgyZTY5ZjBkODJiNmU4ZGNkOGM0MzhjNmJjNjEzZSIsImlhdCI6MTY1NDk1OTIwMC43ODc1MjIsIm5iZiI6MTY1NDk1OTIwMC43ODc1MjYsImV4cCI6MTY4NjA2MzIwMC43NzY2OTIsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.pY8JpfdtCRYlGydjflEPAyh-egXRSEz854XiUzwEDDJWZICRGPSxrf38KPfA5F_cg4zo5V19PNZctPToPDT2o9F6hG1Irw5e4gQ2Djvdbusop32LIRCHALXlFJkVC7xo364Ues7AVu_tyScw7VUV7YTA_hcKivJAkJ5T3G2ZEIW4MzkI5KaFSAICm9CovIswfQ_EsGBF9hR769b92FjL3GZtQslcmFpND8U63lFL-qkff4TKgW_UcuVJT-jHF_lf5M2rWfK1U71CoPRWN1dOOPQ9hKVZDLyZoEagFrxD2l1FKgsX-kGzCz5Hq4_FFwF7aADOq5xX6S7WHgPaCI3YnJEhfe-wOnrAiV6hKMoP_Y8edH6y9mwshw6yhRdRrZR2CPKvhcL6dinngl44Lc_b98R1bV2wOfFjl9lsoYkEpzY5UGNP0CRKNbWUNF2KuqT9_wwByGyXEehALfO6AYHfP7wnwuv6Yrt3Zb6unuoqMW9sWpir9e_vdtIrPlpTdTuyIm35slFtnVIWINVoiMyJ3Zsgub2RWHrh5dwPB_MPKzTKe4wzeiVKAL47v4I1IttyGbBRLefV01wx0diqUIPUFVEZJe1Y5_VSm40VrKzj1o-ETFrQiHp9ty_o5jwL0GgO8Cp_5kQyCyTiYxMuy6qCZKsdMrmeRxys2bOVxLuWbBI',
        'Cache-Control': 'no-cache',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-Country': 'DE',
        Host: 'gjxwutyih7.execute-api.eu-central-1.amazonaws.com',
        'Postman-Token': '3f7da474-0c3c-424a-9195-728485366219',
        'User-Agent': 'PostmanRuntime/7.29.0',
        Via: '1.1 960b0b60c4f1507c51c75d8f9ab0dc90.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'YlMPBf_EtuXPzoJQoVrJn2SmcKcqZ2BFzSg9aOM6FPoSsvCmkIdWtg==',
        'X-Amzn-Trace-Id': 'Root=1-62bdfe87-41a2490e34f249dd6245d7a3',
        'X-Forwarded-For': '94.222.116.231, 70.132.42.92',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
        Accept: ['*/*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        Authorization: [
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NjgwNDRjYy0wMTNlLTRiYjgtOGMwNC1hZDhjN2EzMTY2OTciLCJqdGkiOiJhODg4ZTAyYWYwZjZhYmJiNWM3M2E2NzhmZmU1OGFjNTNhY2U4NmVkYWNmNWIxNjJkMTgyZTY5ZjBkODJiNmU4ZGNkOGM0MzhjNmJjNjEzZSIsImlhdCI6MTY1NDk1OTIwMC43ODc1MjIsIm5iZiI6MTY1NDk1OTIwMC43ODc1MjYsImV4cCI6MTY4NjA2MzIwMC43NzY2OTIsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.pY8JpfdtCRYlGydjflEPAyh-egXRSEz854XiUzwEDDJWZICRGPSxrf38KPfA5F_cg4zo5V19PNZctPToPDT2o9F6hG1Irw5e4gQ2Djvdbusop32LIRCHALXlFJkVC7xo364Ues7AVu_tyScw7VUV7YTA_hcKivJAkJ5T3G2ZEIW4MzkI5KaFSAICm9CovIswfQ_EsGBF9hR769b92FjL3GZtQslcmFpND8U63lFL-qkff4TKgW_UcuVJT-jHF_lf5M2rWfK1U71CoPRWN1dOOPQ9hKVZDLyZoEagFrxD2l1FKgsX-kGzCz5Hq4_FFwF7aADOq5xX6S7WHgPaCI3YnJEhfe-wOnrAiV6hKMoP_Y8edH6y9mwshw6yhRdRrZR2CPKvhcL6dinngl44Lc_b98R1bV2wOfFjl9lsoYkEpzY5UGNP0CRKNbWUNF2KuqT9_wwByGyXEehALfO6AYHfP7wnwuv6Yrt3Zb6unuoqMW9sWpir9e_vdtIrPlpTdTuyIm35slFtnVIWINVoiMyJ3Zsgub2RWHrh5dwPB_MPKzTKe4wzeiVKAL47v4I1IttyGbBRLefV01wx0diqUIPUFVEZJe1Y5_VSm40VrKzj1o-ETFrQiHp9ty_o5jwL0GgO8Cp_5kQyCyTiYxMuy6qCZKsdMrmeRxys2bOVxLuWbBI'
        ],
        'Cache-Control': ['no-cache'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-Country': ['DE'],
        Host: ['gjxwutyih7.execute-api.eu-central-1.amazonaws.com'],
        'Postman-Token': ['3f7da474-0c3c-424a-9195-728485366219'],
        'User-Agent': ['PostmanRuntime/7.29.0'],
        Via: [
            '1.1 960b0b60c4f1507c51c75d8f9ab0dc90.cloudfront.net (CloudFront)'
        ],
        'X-Amz-Cf-Id': ['YlMPBf_EtuXPzoJQoVrJn2SmcKcqZ2BFzSg9aOM6FPoSsvCmkIdWtg=='],
        'X-Amzn-Trace-Id': ['Root=1-62bdfe87-41a2490e34f249dd6245d7a3'],
        'X-Forwarded-For': ['94.222.116.231, 70.132.42.92'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https']
    },
    queryStringParameters: {},
    multiValueQueryStringParameters: {id: ['13D8TJHa24KAwRXj']},
    pathParameters: null,
    stageVariables: null,
    requestContext: {
        resourceId: 'fjdmu5',
        resourcePath: '/REPORTS',
        httpMethod: 'GET',
        authorizer: [''],
        extendedRequestId: 'UjS1PHAtliAFcrw=',
        requestTime: '30/Jun/2022:19:50:31 +0000',
        path: '/prod/REPORTS',
        accountId: '117152870695',
        protocol: 'HTTP/1.1',
        stage: 'prod',
        domainPrefix: 'gjxwutyih7',
        requestTimeEpoch: 1656618631744,
        requestId: '122af9e1-bde2-498e-92cb-3a48ffea3535',
        identity: {
            apiKey: ' ', apiKeyId: '', clientCert: {
                serialNumber: 'b', clientCertPem: '', issuerDN: '', subjectDN: '', validity: {
                    notAfter: 'string',
                    notBefore: 'string'
                }
            },
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '94.222.116.231',
            principalOrgId: null,
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'PostmanRuntime/7.29.0',
            user: null
        },
        domainName: 'gjxwutyih7.execute-api.eu-central-1.amazonaws.com',
        apiId: 'gjxwutyih7'
    },
    body: null,
    isBase64Encoded: false
};


export function MockFactory(action: Actions, {code, fight, encounterID, serverSlug, serverRegion, name}: IQueryVars) {
    if (action === 'BOSS') {
        eventData.queryStringParameters = {
            code: code,
            action: action
        };
    }
    if (action === 'FIGHT') {
        eventData.queryStringParameters = {
            code: code,
            action: action,
            fight: fight,
            encounterID: encounterID
        };
    }
    if (action === 'FEATURE-ENCHANTS') {
        eventData.queryStringParameters = {
            serverSlug: serverSlug,
            serverRegion,
            name,
            encounterID: encounterID,
            action
        };
    }
    return eventData;
}

