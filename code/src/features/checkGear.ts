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
                         combatantInfo,
                         specs
                     }) => {
        const player = {
            name: name,
            id: id,
            guid: guid,
            type: type,
            server: server,
            icon: icon,
            minItemLevel: minItemLevel,
            maxItemLevel: maxItemLevel,
            specs
        };
        // returnt enchantSummary / gemSummary gear:IGear error: string note:string
        const enchantSummary = checkEnchants(combatantInfo.gear);
        const gemSummary = checkGems(combatantInfo.gear);
        return {
            player,
            enchantSummary,
            gemSummary
        };
    });
}

const CheckGear = ({tanks, healers, dps}: IRoleDetails) => {
    const checkedHealers = checkForIssues(healers);
    const checkedTanks = checkForIssues(tanks);
    const checkedDps = checkForIssues(dps);


    return {
        healer: checkedHealers,
        tanks: checkedTanks,
        dps: checkedDps
    };
};

export default CheckGear;
