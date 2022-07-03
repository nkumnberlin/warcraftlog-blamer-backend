import graphQLClient from '../../client/gqlClient';
import LIST_FIGHT from "../../queries/listFight";
import ListPlayersToFight from "../player/listPlayersToFight";

interface IBossFight {
    code: string,
    fight: number,
    encounterID: number
}

const listBossFight = async ({code, fight, encounterID}: IBossFight) => {
    /**
     * List Details of Fight which is necessary to display linked Players
     */
    const data = await graphQLClient.request(LIST_FIGHT, {
        code: code,
        fightIds: [fight],
        encounterID: encounterID
    });
    const singleReport = data.reportData.report;
    /**
     * Returns a List of DPS, HEALER, TANK of Fight
     */
    const {playerDetails} = await ListPlayersToFight({
        code,
        fight,
        encounterID,
        endTime: singleReport.fights[0].endTime,
        startTime: singleReport.fights[0].startTime
    });

    return {
        singleReport,
        playerDetails
    };
};

export default listBossFight;
