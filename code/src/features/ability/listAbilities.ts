import {IBossFight} from "../fight/interfaces";
import graphQLClient from "../../client/gqlClient";
import {LIST_EVENT_TO_FIGHT} from "../../client/queries/listEventToFight";
import {IData} from "./interfaces";
import abilityUsage from "./abilityUsage";
import {LIST_ALL_ABILITIES_TO_FIGHT} from "../../client/queries/listAllAbilitiesOfFight";
import {AbilityNumber, IAbility, TargetOfAbility, AbilitiesOfPlayer} from "../../interfaces/AbilityResponse";

interface IListAbilities extends IBossFight {
    sourceID: number
}

const listAbilities = async ({code, fight, encounterID, endTime, startTime, sourceID}: IListAbilities) => {
    const {reportData}: IData = await graphQLClient.request(LIST_EVENT_TO_FIGHT, {
        code: code,
        encounterID: encounterID,
        fightIds: [fight],
        startTime,
        endTime,
        sourceID
    });
    const {reportData: reportDataAbilities} = await graphQLClient.request(LIST_ALL_ABILITIES_TO_FIGHT, {
        code
    });
    const {events: wLogEvents} = reportData.report;

    const tmpAbilityIcons = reportDataAbilities.report.masterData.abilities;

    const {abilitiesOfPlayer, abilitiesWithIcon} =  abilityUsage({
         wLogEvents,
         sourceID,
         tmpAbilityIcons
     });

    function combineAbilities(abilitiesOfPlayer: AbilitiesOfPlayer) {
        if ('cast' in abilitiesOfPlayer && 'resourcechange' in abilitiesOfPlayer) {
            //  cast and resourcechange may have same keys.
            const { resourcechange, cast, ...rest } = abilitiesOfPlayer;
            return {
                ...rest,
                abilities: {
                    ...resourcechange,
                    ...cast,
                },
            };
        }
        return abilitiesOfPlayer;
    }
    const {auras, ...rest} = abilitiesOfPlayer;
    const combinedAbilities = combineAbilities(rest) as AbilitiesOfPlayer;

    const buffs: { [abilityId: string]: IAbility[]; }[] = [];
    let abilities: {[abilityId: string] : IAbility[]} = {};
    Object.keys(combinedAbilities).forEach((type)=>{
    Object.keys(combinedAbilities[type as keyof AbilitiesOfPlayer])
        .forEach((abilityKey) => {
            Object
                .keys(combinedAbilities[type as keyof AbilitiesOfPlayer][abilityKey as keyof AbilityNumber])
                .forEach((target) => {
                    if (target === '-1') {
                        buffs.push(
                            {
                                [abilityKey]:
                                    combinedAbilities[type as
                                        keyof AbilitiesOfPlayer][abilityKey as
                                        keyof AbilityNumber][target as
                                        keyof TargetOfAbility],
                            },
                        );
                    }
                    // if (target !== '-1') {
                    //     abilities = {
                    //         ...abilities,
                    //         [target]: {
                    //             ...abilities[target],
                    //             [abilityKey]: combinedAbilities[type as
                    //                 keyof AbilitiesOfPlayer][abilityKey as
                    //                 keyof AbilityNumber][target as
                    //                 keyof TargetOfAbility],
                    //         },
                    //     };
                    // }
                    if (target !== '-1') {
                        abilities = {
                            ...abilities,
                                [abilityKey]: combinedAbilities[type as
                                    keyof AbilitiesOfPlayer][abilityKey as
                                    keyof AbilityNumber][target as
                                    keyof TargetOfAbility],
                        };
                    }
                });
        });
    });

return {
    auras,
    buffs,
    abilities,
    abilitiesWithIcon
};

};

export default listAbilities;
