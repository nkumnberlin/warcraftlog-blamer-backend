import graphQLClient from "../../client/gqlClient";
import {LIST_FIGHT} from "../../client/queries";
import {IBossFight} from "./interfaces";

const listBossFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    return graphQLClient.request(LIST_FIGHT, {
        code: code,
        fightIds: [fight],
        encounterID: encounterID
    });
};

export default listBossFight;
