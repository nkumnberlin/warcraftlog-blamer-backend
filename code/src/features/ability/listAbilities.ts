import {IBossFight} from "../fight/interfaces";
import graphQLClient from "../../client/gqlClient";
import {LIST_EVENT_TO_FIGHT} from "../../client/queries/listEventToFight";
import {IData} from "./interfaces";
import abilityUsage from "./abilityUsage";
import {LIST_ALL_ABILITIES_TO_FIGHT} from "../../client/queries/listAllAbilitiesOfFight";
import {Ability} from "../../interfaces/abilities";

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

    const events = abilityUsage({
        wLogEvents,
        sourceID,
        tmpAbilityIcons
    });

    const {auras, ...rest} = events.abilitiesOfPlayer;



    return events;
};

// targetID:
// abilityID: dmg / heal

export function sumAbilityUsage(ability: Ability[]) {
    const x = ability.reduce((previousValue: any, currentValue: any) => {
        if (previousValue[currentValue.targetID]) {
            if (previousValue[currentValue.targetID][currentValue.abilityGameID]) {
                return ({
                    [currentValue.targetID]: {
                        ...previousValue[currentValue.targetID],
                        [currentValue.abilityGameID]: {
                            ...currentValue,
                            amountTotal: previousValue[currentValue.targetID][currentValue.abilityGameID].amount + currentValue.amount
                        }
                    }
                });
            }
            return ({
                [currentValue.targetID]: {
                    ...previousValue[currentValue.targetID],
                    [currentValue.abilityGameID]: {
                        ...currentValue,
                        amountTotal: currentValue.amount
                    }
                }
            });
        }

        //absoluter default
        return ({
            [currentValue.targetID]: {
                [currentValue.abilityGameID]: {
                    ...currentValue,
                    amountTotal: currentValue.amount
                }
            }
        });
    }, {});
}

//
export default listAbilities;
