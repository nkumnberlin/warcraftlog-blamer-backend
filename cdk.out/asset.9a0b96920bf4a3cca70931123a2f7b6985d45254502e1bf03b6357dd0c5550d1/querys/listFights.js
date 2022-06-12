"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const LIST_FIGHTS = graphql_request_1.gql `
  query LIST_FIGHTS
{
    reportData {
        report (code: "13D8TJHa24KAwRXj"){
            endTime
            startTime 
            guild {
                name
                id
            }
            fights {
                # encounterID !== 0 > boss. Encounter ID fetchen
                    startTime
                    endTime
                    encounterID  
                    id
                    bossPercentage
                    encounterID
                    name
                    difficulty
                    size
                    fightPercentage
                    lastPhase
                    lastPhaseIsIntermission
                    kill
                    averageItemLevel
                    completeRaid
                }
        }
    }
}`;
exports.default = LIST_FIGHTS;
