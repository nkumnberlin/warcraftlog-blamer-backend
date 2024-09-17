import {gql} from 'graphql-request';

export const LIST_ALL_ABILITIES_TO_FIGHT = gql`
    query listAbilities(
        $code: String!
    ) {
        reportData{
            report(code: $code) {
                masterData{
                    abilities{
                        gameID
                        icon
                        name
                        type
                    }
                }
            }
        }
    }
`;
