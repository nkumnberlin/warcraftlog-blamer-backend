"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LIST_FIGHTS = `
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
