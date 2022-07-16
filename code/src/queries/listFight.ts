import {gql} from "graphql-request";
import {generalData} from "./generalData";

const LIST_FIGHT = gql`
    query LIST_FIGHT(
        $code: String!,
        $encounterId: Int,
        $fightIds: [Int],
    ) {
        reportData {
            report(code: $code) {
                ${generalData}
                fights(
                    encounterID: $encounterId,
                    fightIDs: $fightIds,
                ) {
                    id
                    encounterID
                    name
                    difficulty
                    size
                    startTime
                    endTime
                    fightPercentage
                    bossPercentage
                    lastPhase
                    lastPhaseIsIntermission
                    kill
                    averageItemLevel
                    wipeCalledTime
                    completeRaid
                    gameZone {
                        id
                        name
                    }
                    friendlyPlayers
                    bossPercentage
                }
            }
        }
    }`;


export {LIST_FIGHT};
