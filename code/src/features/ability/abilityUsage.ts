import {IEventData, ISortAbilities} from "./interfaces";
//abilityGameID: 1
// amount: 229
// armor: 0
// attackPower: 0
// classResources: []
// facing: -205
// fight: 69
// hitPoints: 4218299
// hitType: 6
// itemLevel: 73
// mapID: 339
// maxHitPoints: 6070400
// mitigated: 137
// resourceActor: 2
// sameSource: false
// sourceID: 35
// spellPower: 0
// targetID: 234
// timestamp: 11136021
// type: "damage"
// unmitigatedAmount: 366
// x: -31808
// y: 70352
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
            event.type === 'removedebuffstack' ||
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
        event.sameSource = sourceID === event.targetID;
        if(event.type === 'cast' && event.abilityGameID === 1) return;
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

    // summ
    // ordered by recieved

    return {
        abilitiesWithIcon,
        abilitiesOfPlayer
    };
}

export default abilityUsage;
