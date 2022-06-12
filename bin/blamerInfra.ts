#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WLogsBlamerInfraStack } from '../lib/wLogsBlamerInfraStack';

const app = new cdk.App();
new WLogsBlamerInfraStack(app, 'wLogsStack', {
});
