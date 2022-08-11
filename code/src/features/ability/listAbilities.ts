import {IBossFight} from "../fight/interfaces";
import graphQLClient from "../../client/gqlClient";
import {LIST_ABILITIES} from "../../client/queries/listAbilites";
import {IData} from "./interfaces";
import abilityUsage from "./abilityUsage";

interface IListAbilities extends IBossFight {
    sourceID: number
}

const listAbilities = async ({code, fight, encounterID, endTime, startTime, sourceID}: IListAbilities) => {
    const {reportData}: IData = await graphQLClient.request(LIST_ABILITIES, {
        code: code,
        encounterID: encounterID,
        fightIds: [fight],
        startTime,
        endTime,
        sourceID
    });
    const {events: wLogEvents} = reportData.report;

    const debug = abilityUsage({
        wLogEvents,
        sourceID
    });

    console.log(debug);
    return debug;
};

export default listAbilities;
