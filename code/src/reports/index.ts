import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import reportHandler from './reportHandler';
import {Actions} from "../interfaces";

const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // console.log(event);
    const queryParam = event.queryStringParameters;
    const {action: queryAction} = event.queryStringParameters;

    console.log('aa ', event.queryStringParameters);
    const action = queryAction as Actions;
    let statusCode = 200;

    const response = await reportHandler(action, queryParam).catch((error) => {
            statusCode = 404;
            return {
                message: error.message,
                stack: error.stack
            };
        }
    );

    console.log('BODY', response);

    return {
        statusCode,
        body: JSON.stringify(response)
    };
};

exports.handler = lambdaHandler;
export {lambdaHandler};



