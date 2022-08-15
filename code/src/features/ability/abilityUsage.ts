import {IEventData, ISortAbilities} from "./interfaces";

interface AbilityIcons {
    icon: string,
    name: string,
    type: string,
    gameID: number,
}

interface IAbilityUsage extends ISortAbilities{
    tmpAbilityIcons: AbilityIcons[]
}

function assignIconsToAbility(abilitiesWithIcon: AbilityIcons[], tmpAbilityIcons: AbilityIcons[], event: IEventData) {
    const hasAbility = abilitiesWithIcon.find((tmpAbility)=> tmpAbility?.gameID === event.abilityGameID);
    if(hasAbility === undefined){
        return tmpAbilityIcons.find((tmpAbility) => tmpAbility.gameID === event.abilityGameID);
    }
}


function abilityUsage({wLogEvents, sourceID, tmpAbilityIcons}: IAbilityUsage) {
    let abilitiesOfPlayer: any = {};
    const abilitiesWithIcon: AbilityIcons[] = [];
    wLogEvents.data.forEach((event) => {
        if (event.type === 'removebuffstack' ||
            event.type === 'refreshbuff' ||
            event.type === 'begincast' ||
            event.type === 'applybuffstack' ||
            event.type === 'applydebuffstack' ||
            event.type === 'removebuff' ||
            event.type === 'refreshdebuff' ||
            event.type === 'absorbed' ||
            event.type === 'extraattacks' ||
            event.type === 'applydebuff' ||
            event.type === 'applybuff' ||
            event.type === 'destroy' ||
            event.type === 'removedebuff'
        ) return;
        // if targetID is Player, return
        if (event.type === 'combatantinfo') {
            const {auras} = event;
            return abilitiesOfPlayer = {
                ...abilitiesOfPlayer,
                auras
            };
        }
        if (event.tick) return;

        if (event.type in abilitiesOfPlayer) {
            const ability = assignIconsToAbility(abilitiesWithIcon, tmpAbilityIcons, event);
            if(ability !== undefined) abilitiesWithIcon.push(ability);
            if (event.abilityGameID in abilitiesOfPlayer[event.type]) {

                return abilitiesOfPlayer = {
                    ...abilitiesOfPlayer,
                    [event.type]: {
                        ...abilitiesOfPlayer[event.type],
                        [event.abilityGameID]: [
                            ...abilitiesOfPlayer[event.type][event.abilityGameID],
                            event
                        ]
                    }
                };
            }
            return abilitiesOfPlayer = {
                ...abilitiesOfPlayer,
                [event.type]: {
                    ...abilitiesOfPlayer[event.type],
                    [event.abilityGameID]: [
                        event
                    ]
                }
            };
        }


        if (abilitiesOfPlayer[event.type] && event.abilityGameID in abilitiesOfPlayer[event.type]) {
            return abilitiesOfPlayer = {
                ...abilitiesOfPlayer,
                [event.type]: {
                    [event.abilityGameID]: [
                        ...abilitiesOfPlayer[event.type][event.abilityGameID],
                        event
                    ]
                }
            };
        }
        return abilitiesOfPlayer = {
            ...abilitiesOfPlayer,
            [event.type]: {
                [event.abilityGameID]: [
                    event
                ]
            }
        };
    });

    return {
        abilitiesWithIcon,
        abilitiesOfPlayer
    };
}

export default abilityUsage;
