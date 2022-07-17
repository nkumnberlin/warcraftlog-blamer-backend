import {IBossFight} from "../../interfaces";
import listPlayerDetails from "../player/listPlayerDetails";
import listBossFight from "./listBossFight";
import checkGear from "../../features/checkGear";


const listFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    const {reportData} = await listBossFight({code, fight, encounterID});
    const singleReport = reportData.report;

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
        endTime: singleReport.fights[0].endTime,
        startTime: singleReport.fights[0].startTime
    });
    const gearCheck = checkGear(playerDetails);
    const events = {
        damageDone,
        healingDone,
        deathEvents,
        damageTaken
    };
    return {
        singleReport,
        guild,
        player: {
            info: playerDetails,
            gear: gearCheck,
            events
        },
    };
};

export default listFight;
