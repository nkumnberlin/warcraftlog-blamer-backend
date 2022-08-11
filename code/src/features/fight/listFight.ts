import {IBossFight} from "./interfaces";
import listPlayerDetails from "../player/listPlayerDetails";


const listFight = async ({code, fight, encounterID, endTime, startTime}: IBossFight) => {
    // additional Events need to be fetched in the future
    const {
        guild,
        playerDetails,
    } = await listPlayerDetails({
        code,
        fight,
        encounterID,
        endTime,
        startTime
    });

    return {
        guild,
        player: {
            ...playerDetails,
        },
    };
};

export default listFight;
