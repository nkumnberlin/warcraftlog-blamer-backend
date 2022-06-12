import {gql} from 'graphql-request';
const LIST_FIGHTS = gql`
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

export default LIST_FIGHTS;
