import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import reportHandler from './reportHandler';

const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // console.log(event);
    // console.log('test: ', event.queryStringParameters);


    let response;
    let statusCode = 200;
    let body = {};

    try {
        response  = await reportHandler('boss', {code: '13D8TJHa24KAwRXj'});
        console.log('RESPONSE', response);
        body = response;
        console.log('BODY', body);
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: statusCode,
                    message: `${response} ___ ${error.message}`,
                    stack: error.stack
                }
            ]
        };
    }

    return {
        statusCode,
        body: JSON.stringify(body)
    };
};

exports.handler = lambdaHandler;
export {lambdaHandler};



