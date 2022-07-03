import {gql} from "graphql-request";

const LIST_EQUIPMENT_OF_PLAYER = gql`
    query LIST_EQUIPMENT_OF_PLAYER(
        $encounterId: Int!,
        $serverSlug: String,
        $serverRegion: String,
        $name: String
    ) {
        characterData {
            character(
                serverSlug: $serverSlug,
                name: $name,
                serverRegion: $serverRegion
            ) {
                id
                name
                encounterRankings(
                    encounterID: $encounterId,
                    includeCombatantInfo: true,
                )
            }
        }
    }`;


export default LIST_EQUIPMENT_OF_PLAYER;
