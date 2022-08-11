import {ISortAbilities} from "./interfaces";

function abilityUsage({wLogEvents, sourceID}: ISortAbilities) {
    let abilitiesOfPlayer: any = {};
    wLogEvents.data.forEach((event) => {
        if(event.type === 'removebuffstack' ||
            event.type === 'refreshbuff' ||
            event.type === 'applybuffstack' ||
            event.type === 'removebuff' ||
            event.type === 'applydebuff' ||
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

        event.sameSource = sourceID === event.targetID;

        if (event.type in abilitiesOfPlayer) {
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

    return abilitiesOfPlayer;
}

export default abilityUsage;
