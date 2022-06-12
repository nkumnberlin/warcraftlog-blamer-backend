"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listFights_1 = __importDefault(require("./querys/listFights"));
const graphql_request_1 = require("graphql-request");
const GRAPHQL_ENDPOINT = process.env.WLOG_URL || '';
const GRAPHQL_BEARER = process.env.WLOG_BEARER || '';
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const graphQLClient = new graphql_request_1.GraphQLClient('https://account-name.stepzen.net/    folder-name/api-name/__graphql', {
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
        response = yield graphQLClient.request(listFights_1.default);
        console.log('RESPONSE', response);
        body = yield response.json();
        console.log('BODY', body);
    }
    catch (error) {
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
});
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
