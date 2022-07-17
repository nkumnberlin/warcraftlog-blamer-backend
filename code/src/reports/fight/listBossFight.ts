import {IBossFight} from "../../interfaces";
import graphQLClient from "../../client/gqlClient";
import {LIST_FIGHT} from "../../queries";

const listBossFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    return graphQLClient.request(LIST_FIGHT, {
        code: code,
        fightIds: [fight],
        encounterID: encounterID
    });
};

export default listBossFight;
