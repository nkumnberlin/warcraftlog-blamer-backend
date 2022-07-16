import {gql} from 'graphql-request';
import {generalData} from "./generalData";

const LIST_BOSS = gql`
    query LIST_BOSS($code: String)
    {
        reportData {
            report (code: $code){
                ${generalData}
                fights {
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

export {LIST_BOSS};
