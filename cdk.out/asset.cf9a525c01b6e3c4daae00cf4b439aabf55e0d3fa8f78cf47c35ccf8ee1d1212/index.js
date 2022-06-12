"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const node_fetch_1 = __importStar(require("node-fetch"));
const GRAPHQL_ENDPOINT = process.env.WLOG_URL || '';
const GRAPHQL_BEARER = process.env.WLOG_BEARER || '';
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GRAPHQL_BEARER}`
        },
        body: JSON.stringify({ LIST_FIGHTS: listFights_1.default })
    };
    console.log('BEARER: ', GRAPHQL_BEARER);
    console.log('ENDPOINT: ', GRAPHQL_ENDPOINT);
    console.log('options: ', options);
    console.log('add module');
    const request = new node_fetch_1.Request(GRAPHQL_ENDPOINT, options);
    let response;
    let statusCode = 200;
    let body = {};
    try {
        response = yield node_fetch_1.default(request);
        body = yield response.json();
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
