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
    } catch (e) {
        return Error(`ERROR: ${e}`);
    }
};
