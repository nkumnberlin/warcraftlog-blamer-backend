import {gql} from "graphql-request";

export const LIST_PARSE_TO_FIGHT = gql`
    query getParse(
        $code: String,
        $encounterID: Int,
        $metric: CharacterRankingMetricType
    ) {
        reportData {
            report(code: $code) {
                rankedCharacters{
                    name
                    id
                    encounterRankings(encounterID: $encounterID, metric: $metric, timeframe: Historical)
                }
            }
        }
    }    
`;

