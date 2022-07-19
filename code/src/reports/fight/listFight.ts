import {IBossFight} from "../../interfaces";
import listPlayerDetails from "../player/listPlayerDetails";
import listBossFight from "./listBossFight";
import checkGear from "../../features/checkGear";


const listFight = async ({code, fight, encounterID}: IBossFight) => {
    // List Details of Fight which is necessary to display linked Players
    const {reportData} = await listBossFight({code, fight, encounterID});
    const singleReport = reportData.report;

    // additional Events need to be fetched in the future
    
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

    return {
        singleReport,
        guild,
        player: {
            info: playerDetails,
            gear: gearCheck,
        },
    };
};

export default listFight;
