import {gql} from 'graphql-request';
const LIST_BOSS = gql`
  query LIST_BOSS($code: String)
{
    reportData {
        report (code: $code){
            endTime
            startTime
            zone {
                name
            }
            guild {
                name
                id
                faction {
                    name
                }
            }
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

export default LIST_BOSS;
