import {IPlayerDetails, IRoleDetails} from "../interfaces";
import checkEnchants from "./checkEnchants";
import checkGems from "./checkGems";

function checkForIssues(role: IPlayerDetails[]) {
    return role.map(({
                         name,
                         id,
                         guid,
                         type,
                         server,
                         icon,
                         maxItemLevel,
                         minItemLevel,
                         combatantInfo
                     }) => {
        const playerObj = {
            name: name,
            id: id,
            guid: guid,
            type: type,
            server: server,
            icon: icon,
            minItemLevel: minItemLevel,
            maxItemLevel: maxItemLevel,
            stats: combatantInfo.stats
        };
        const hasEnchantIssues = checkEnchants(combatantInfo.gear);
        const hasGemIssues = checkGems(combatantInfo.gear);
        return {
            playerObj,
            hasEnchantIssues,
            hasGemIssues
        };
    });
}

const CheckGear = ({tanks, healers, dps}: IRoleDetails) => {
    const checkedHealers = checkForIssues(healers);
    const checkedTanks = checkForIssues(tanks);
    console.log(checkedHealers)
    const checkedDps = checkForIssues(dps);


    return {
        healer: checkedHealers,
        tanks: checkedTanks,
        dps: checkedDps
    };
};

export default CheckGear;
