import {IBossFight} from "./interfaces";
import listPlayerDetails from "../player/listPlayerDetails";
import checkGear from "../gear/checkGear";

const listFightWithGearCheck = async ({code, fight, encounterID, endTime, startTime}: IBossFight) => {
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
    const gear = checkGear(playerDetails);
    return {
        guild,
        player: {
            ...gear,
        },
    };
};

export default listFightWithGearCheck;
