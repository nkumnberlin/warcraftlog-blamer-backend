import {handleReports} from "./handleReports";

function Error(e: string) {
    return {
        statusCode: 404,
        body: e,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };
}

exports.handler = async (event: any) => {
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
    const headers = event.header;

    try {
        const result = await handleReports(body, headers);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (e) {
        return Error(`ERROR: ${e}`);
    }
};
