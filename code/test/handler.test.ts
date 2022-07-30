import dotenv from 'dotenv';
import {MockFactory} from './ressources/mockLambdaHeader';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lambdaHandler = require('../src/reports/index.ts');

//      http://localhost:3000/aAXDYPG7MxbQ6WKV/41?encounterID=728
//      "code": "aAXDYPG7MxbQ6WKV",
//      "encounterId": 728,
//      "fightIds": [41],
//      "guildID": 487394,


describe('RunLambda', () => {

    it('should run case boss', async () => {
        const mockData = MockFactory(
            'BOSS',
            {
                code: 'NV98X24RykgfDT7x'
            });
        const response = await lambdaHandler.handler(mockData);
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body).singleReport.endTime).toEqual(1656276914423);
    });

    it('should run case fight', async () => {
        const mockData = MockFactory(
            'FIGHT',
            {
                code: 'NV98X24RykgfDT7x',
                fight: '69',
                encounterID: '609',
                startTime: '11075923',
                endTime: '11465901'
            });
        const response = await lambdaHandler.handler(mockData);
        expect(response.statusCode).toEqual(200);
    });

    it('should run case FEATURE_GEAR_ISSUES', async () => {
        const mockData = MockFactory(
            'FEATURE_GEAR_ISSUES',
            {
                code: 'NV98X24RykgfDT7x',
                fight: '69',
                encounterID: '609',
                startTime: '11075923',
                endTime: '11465901'
            });
        const response = await lambdaHandler.handler(mockData);
        expect(response.statusCode).toEqual(200);
    });
    it('should run case hps LIST_PARSE_TO_FIGHT', async () => {
        const mockData = MockFactory(
            'LIST_PARSE_TO_FIGHT',
            {
                code: 'NV98X24RykgfDT7x',
                encounterID: '609',
                parseType: 'hps'
            });
        const response = await lambdaHandler.handler(mockData);
        expect(response.statusCode).toEqual(200);
    });
    it('should run case dps LIST_PARSE_TO_FIGHT', async () => {
        const mockData = MockFactory(
            'LIST_PARSE_TO_FIGHT',
            {
                code: 'NV98X24RykgfDT7x',
                encounterID: '609',
                parseType: 'dps'
            });
        const response = await lambdaHandler.handler(mockData);
        expect(response.statusCode).toEqual(200);
    });

});
