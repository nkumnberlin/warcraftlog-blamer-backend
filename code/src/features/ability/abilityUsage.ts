import {IEventData, ISortAbilities} from "./interfaces";

interface AbilityIcons {
    icon: string,
    name: string,
    type: string,
    gameID: number,
}

interface IAbilityUsage extends ISortAbilities {
    tmpAbilityIcons: AbilityIcons[]
}

function assignIconsToAbility(abilitiesWithIcon: AbilityIcons[], tmpAbilityIcons: AbilityIcons[], event: IEventData) {
    const hasAbility = abilitiesWithIcon.find((tmpAbility) => tmpAbility?.gameID === event.abilityGameID);
    if (hasAbility === undefined) {
        return tmpAbilityIcons.find((tmpAbility) => tmpAbility.gameID === event.abilityGameID);
    }
}


function abilityUsage({wLogEvents, sourceID, tmpAbilityIcons}: IAbilityUsage) {
    let abilitiesOfPlayer: any = {};
    const abilitiesWithIcon: AbilityIcons[] = [];
    wLogEvents.data.forEach((event) => {
        if (event.type === 'removebuffstack' ||
            event.type === 'refreshbuff' ||
            event.type === 'removedebuffstack' ||
            event.type === 'begincast' ||
            event.type === 'applybuffstack' ||
            event.type === 'applydebuffstack' ||
            event.type === 'removebuff' ||
            event.type === 'refreshdebuff' ||
            event.type === 'absorbed' ||
            event.type === 'dispel' ||
            event.type === 'extraattacks' ||
            event.type === 'summon' ||
            event.type === 'damage' ||
            event.type === 'drain' ||
            event.type === 'heal' ||
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
        event.sameSource = event.sourceID === event.targetID;

        if (event.tick) return;
        if (event.type === 'cast' && event.abilityGameID === 1) return;
        // if (event.type === 'cast' && !event.sameSource && event.targetID !== -1) return;
        // if (event.type === 'damage') {
        //     if (event.targetID === sourceID) {
        //         event.type = 'damagetaken';
        //     }
        //     if (event.targetID !== sourceID) {
        //         event.type = 'damagedone';
        //     }
        // }

        const ability = assignIconsToAbility(abilitiesWithIcon, tmpAbilityIcons, event);
        if (ability !== undefined) abilitiesWithIcon.push(ability);

        if (event.type in abilitiesOfPlayer) {
            if (event.abilityGameID in abilitiesOfPlayer[event.type] && event.targetID in abilitiesOfPlayer[event.type][event.abilityGameID]) {
                return abilitiesOfPlayer = {
                    ...abilitiesOfPlayer,
                    [event.type]: {
                        ...abilitiesOfPlayer[event.type],
                        [event.abilityGameID]: {
                            ...abilitiesOfPlayer[event.type][event.abilityGameID],
                            [event.targetID]: [
                                ...abilitiesOfPlayer[event.type][event.abilityGameID][event.targetID],
                                event
                            ]
                        }
                    }
                };
            }
            return abilitiesOfPlayer = {
                ...abilitiesOfPlayer,
                [event.type]: {
                    ...abilitiesOfPlayer[event.type],
                    [event.abilityGameID]: {
                        ...abilitiesOfPlayer[event.type][event.abilityGameID],
                        [event.targetID]: [
                            event
                        ]
                    }
                }
            };

        }

        return abilitiesOfPlayer = {
            ...abilitiesOfPlayer,
            [event.type]: {
                [event.abilityGameID]: {
                    [event.targetID]: [
                        event
                    ]
                }
            }
        };
    });


    return {
        abilitiesWithIcon,
        abilitiesOfPlayer
    };
}

export default abilityUsage;
