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
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
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
    const body = JSON.parse(event.body);
    const headers = event.headers;
    try {
        return {
            statusCode: 200,
            body: JSON.stringify(headers),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
    catch (e) {
        return Error(`ERROR: ${e}`);
    }
});
