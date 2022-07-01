import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lambdaHandler = require('../src/reports/index.ts');
import {eventData }  from './ressources/mock';

describe('RunLambda', ()=> {

    it('should run the lambda', async ()=> {

        const response = await lambdaHandler.handler(eventData);
        console.log('123', response);
    });
});
