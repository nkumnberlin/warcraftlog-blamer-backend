import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import LIST_FIGHTS from "./querys/listFights";
import { GraphQLClient} from 'graphql-request';


const GRAPHQL_ENDPOINT = process.env.WLOG_URL || '';
const GRAPHQL_BEARER = process.env.WLOG_BEARER || '';

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>  => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${GRAPHQL_BEARER}`
        },
    });


    console.log('BEARER: ', GRAPHQL_BEARER);
    console.log('ENDPOINT: ', GRAPHQL_ENDPOINT);


    let response;
    let statusCode = 200;
    let body = {};

    try {
        response  = await graphQLClient.request(LIST_FIGHTS);
        console.log('RESPONSE', response);
        body = await response.json();
        console.log('BODY', body);
    } catch (error) {
        statusCode = 400;
        body = {
            errors: [
                {
                    status: response.status,
                    message: error.message,
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





// const headers = event.headers;
// let response: APIGatewayProxyResult;
// try {
//     response = {
//         statusCode: 200,
//         body: JSON.stringify({
//             message: 'hello world',
//             headers: headers
//         }),
//     };
// } catch (err) {
//     console.log(err);
//     response = {
//         statusCode: 500,
//         body: JSON.stringify({
//             message: 'some error happened',
//         }),
//     };
// }
//
// return response;
