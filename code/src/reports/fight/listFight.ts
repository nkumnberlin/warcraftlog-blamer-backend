import {IBossFight} from "../../interfaces";
import listPlayerDetails from "../player/listPlayerDetails";
import listBossFight from "./listBossFight";
import checkGear from "../../features/checkGear";


const listFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    const {reportData} = await listBossFight({code, fight, encounterID});
    const singleReport = reportData.report;
    console.log(singleReport.fights.at(0).startTime);
    console.log(singleReport.fights.at(0).endTime);

    const {
        guild,
        playerDetails,
        damageDone,
        healingDone,
        deathEvents,
        damageTaken
    } = await listPlayerDetails({
        code,
        fight,
        encounterID,
        endTime: singleReport.fights.at(0).endTime,
        startTime: singleReport.fights.at(0).startTime
    });
    console.log(playerDetails);
    const missingEnchants = checkGear(playerDetails);
    return {
        singleReport,
        guild,
        playerDetails
    };
};

export default listFight;
