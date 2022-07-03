import {gql} from "graphql-request";

const LIST_FIGHT = gql`
    query LIST_FIGHT(
        $code: String!,
        $encounterId: Int,
        $fightIds: [Int],
    ) {
        reportData {
            report(code: $code) {
                endTime
                startTime
                guild {
                    name
                    id
                    faction {
                        name
                    }
                }
                code
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


export default LIST_FIGHT;
