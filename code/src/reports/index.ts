import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import reportHandler from './reportHandler';

const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // console.log(event);
    const queryParam = event.queryStringParameters;
    const {reportType} = event.queryStringParameters;

    let statusCode = 200;

    const response = await reportHandler(reportType, queryParam).catch((error) => {
            statusCode = 404;
            return {
                message: error.message,
                stack: error.stack
            };
        }
    );

    console.log('add gql');
    console.log('BODY', response);

    return {
        statusCode,
        body: JSON.stringify(response)
    };
};

exports.handler = lambdaHandler;
export {lambdaHandler};



