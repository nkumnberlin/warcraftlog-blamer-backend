import {gql} from "graphql-request";

export const LIST_EVENT_TO_FIGHT = gql`
    query getAbilitiesToFight(
        $code: String!,
        $fightIds: [Int],
        $startTime: Float,
        $endTime: Float,
        $sourceID: Int
    ) {
        reportData {
            report(code: $code) {
                code
                events(fightIDs: $fightIds,  startTime: $startTime, endTime: $endTime, sourceID: $sourceID,  dataType: All, includeResources: true){
                    data
                }

            }
        }
    }
`;