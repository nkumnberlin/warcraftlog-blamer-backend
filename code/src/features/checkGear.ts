import {IPlayerDetails, IRoleDetails} from "../interfaces";
import checkGearIssues from "./checkGearIssues";

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
        const gearSummary = checkGearIssues(combatantInfo.gear);
        return {
            player,
            gearSummary,
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
