import {gql} from "graphql-request";

const LIST_SINGLE_ABILITY = gql`
    query LIST_SINGLE_ABILITY(
        $abilityId: Int
    ) {
        gameData {
            ability(id: $abilityId) {
                icon
                id
                name
            }
        }
    }`;
export default LIST_SINGLE_ABILITY;
