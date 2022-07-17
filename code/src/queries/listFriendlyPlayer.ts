import {gql} from "graphql-request";

const LIST_PLAYER_DETAILS = gql`
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
                table(startTime: $startTime,
                    endTime: $endTime, fightIDs: $fightIds, encounterID: $encounterId)
            }
        }
    }`;
export {LIST_PLAYER_DETAILS};
