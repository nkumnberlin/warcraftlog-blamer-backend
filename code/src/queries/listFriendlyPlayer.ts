import {gql} from "graphql-request";

const LIST_FRIENDLY_PLAYER = gql`
    query getReportPlayerDetails(
        $code: String,
        $encounterId: Int,
        $fightIds: [Int],
        $startTime: Float,
        $endTime: Float
    ) {
        reportData {
            report(code: $code) {
                code
                guild{
                    server{
                        name
                        slug
                        region{
                            compactName
                        }
                    }
                }
                playerDetails(
                    startTime: $startTime,
                    endTime: $endTime,
                    encounterID: $encounterId,
                    fightIDs: $fightIds,
                )
            }
        }
    }`;
export {LIST_FRIENDLY_PLAYER};
