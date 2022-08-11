import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import featureHandler from './features/featureHandler';
import {Actions} from "./interfaces";

const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const queryParam = event.queryStringParameters;
    const {action: queryAction} = event.queryStringParameters;

    console.log('DEBUG: queryParams ', event.queryStringParameters);

    const action = queryAction as Actions;
    let statusCode = 200;

    const response = await featureHandler(action, queryParam).catch((error) => {
            statusCode = 404;
            return {
                message: error.message,
                stack: error.stack
            };
        }
    );
    console.log('DEBUG: BODY', response);

    return {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        statusCode,
        body: JSON.stringify(response)
    };
};

exports.handler = lambdaHandler;
export {lambdaHandler};



