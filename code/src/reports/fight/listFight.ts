import {IBossFight} from "../../interfaces";
import listPlayerDetails from "../player/listPlayerDetails";
import listBossFight from "./listBossFight";


const listFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    const {reportData} = await listBossFight({code, fight, encounterID});
    const singleReport = reportData.report;
    const playerDetails = await listPlayerDetails({
        code,
        fight,
        encounterID,
        endTime: singleReport.fights.at(0).endTime,
        startTime: singleReport.fights.at(0).startTime
    });


    return {
        singleReport
    };
};

export default listFight;
