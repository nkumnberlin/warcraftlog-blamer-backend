import {gql} from 'graphql-request';
const LIST_BOSS_FIGHT = gql`
  query LIST_BOSS_FIGHT($code: String!)
{
    reportData {
        report (code: $code){
            endTime
            startTime
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

export default LIST_BOSS_FIGHT;
