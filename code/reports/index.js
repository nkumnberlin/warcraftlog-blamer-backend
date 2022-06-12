"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleReports_1 = require("./handleReports");
function Error(e) {
    return {
        statusCode: 404,
        body: e,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };
}
exports.handler = async (event) => {
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
        const result = await (0, handleReports_1.handleReports)(body, headers);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
    catch (e) {
        return Error(`ERROR: ${e}`);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUE4QztBQUU5QyxTQUFTLEtBQUssQ0FBQyxDQUFTO0lBQ3BCLE9BQU87UUFDSCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxDQUFDO1FBQ1AsT0FBTyxFQUFFO1lBQ0wsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyw2QkFBNkIsRUFBRSxHQUFHO1NBQ3JDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLDhDQUE4QztJQUM5Qyw4Q0FBOEM7SUFDOUMseUNBQXlDO0lBQ3pDLEVBQUU7SUFDRixTQUFTO0lBQ1QsS0FBSztJQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSTtRQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSw2QkFBYSxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDNUIsT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7YUFDckM7U0FDSixDQUFDO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMvQjtBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aGFuZGxlUmVwb3J0c30gZnJvbSBcIi4vaGFuZGxlUmVwb3J0c1wiO1xuXG5mdW5jdGlvbiBFcnJvcihlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDQsXG4gICAgICAgIGJvZHk6IGUsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55KSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1VTRVIgSU5ERVggUEFSQU1TJywgZXZlbnQpO1xuICAgIC8vIHJldHVybiB7XG4gICAgLy8gICAgIHN0YXR1c0NvZGU6IDMwMSxcbiAgICAvLyAgICAgaGVhZGVyczoge1xuICAgIC8vICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAvLyAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgLy8gICAgICAgICBMb2NhdGlvbjogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAgICAvL1xuICAgIC8vICAgICB9LFxuICAgIC8vIH07XG4gICAgY29uc3QgYm9keSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSk7XG4gICAgY29uc3QgaGVhZGVycyA9IGV2ZW50LmhlYWRlcjtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhhbmRsZVJlcG9ydHMoYm9keSwgaGVhZGVycyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gRXJyb3IoYEVSUk9SOiAke2V9YCk7XG4gICAgfVxufTtcbiJdfQ==