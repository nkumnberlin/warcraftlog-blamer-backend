import {ICheckedPlayerDetails, IPlayerDetails, IRoleDetails} from "../../interfaces";
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
        const gearSummary = checkGearIssues(combatantInfo.gear);
        const find = gearSummary.find((gear) => (!gear.metaEnchant?.error.includes('Enchanting') && gear.metaEnchant !== null) || gear.metaGem !== null);
        player.hasIssues = find !== undefined;
        // todo, if there is an issue, set a flag to playersummary
        return {
            ...player,
            gearSummary,
        };
    });
}

const CheckGear = ({tanks, healers, dps}: IRoleDetails) => {
    const checkedHealers = checkForIssues(healers);
    const checkedTanks = checkForIssues(tanks);
    const checkedDps = checkForIssues(dps);
    // const debug = checkedDps.find((t) => t.name === 'Dégèr');
    // console.log(debug);
    return {
        healers: checkedHealers,
        tanks: checkedTanks,
        dps: checkedDps
    };
};

export default CheckGear;
