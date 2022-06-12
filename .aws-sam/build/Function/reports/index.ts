import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
    console.log('USER INDEX PARAMS', event);
    // return {
    //     statusCode: 301,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         Location: 'https://google.com'
    //
    //     },
    // };
    const headers = event.headers;
    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
                headers: headers
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }

    return response;
};
