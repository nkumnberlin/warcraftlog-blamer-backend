import {gql} from 'graphql-request';

export const LIST_ENEMIES_TO_FIGHT = gql`
    query listEnemiesToFight(
        $code: String!,
    ) {
        reportData {
            report(code: $code) {
                masterData{
                    actors (type: "NPC"){
                        name
                        id
                        gameID

                    }
                }
            }
        }
    }
    `;
