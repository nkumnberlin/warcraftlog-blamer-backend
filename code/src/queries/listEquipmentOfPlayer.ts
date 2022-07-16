import {gql} from "graphql-request";

const LIST_EQUIPMENT_OF_PLAYER = gql`
    query LIST_EQUIPMENT_OF_PLAYER(
        $encounterId: Int!,
    ) {
        characterData {
            character(
                serverSlug: "venoxis",
                name: "Balzác",
                serverRegion: "EU"
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


export {LIST_EQUIPMENT_OF_PLAYER};
