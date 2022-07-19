import {ICheckedPlayerDetails, IPlayerDetails, IRoleDetails} from "../interfaces";
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
        const player: ICheckedPlayerDetails = {
            name: name,
            id: id,
            guid: guid,
            type: type,
            server: server,
            icon: icon,
            minItemLevel: minItemLevel,
            maxItemLevel: maxItemLevel,
            hasIssues: false,
            specs
        };
        // returnt enchantSummary / gemSummary gear:IGear error: string note:string
        const gearSummary = checkGearIssues(combatantInfo.gear, player);
        // todo, if there is an issue, set a flag to playersummary
        return {
            player,
            gearSummary,
        };
    });
}

const CheckGear = ({tanks, healers, dps}: IRoleDetails) => {
    // const debug = healers.find((t) => t.name === 'Kusha');
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
