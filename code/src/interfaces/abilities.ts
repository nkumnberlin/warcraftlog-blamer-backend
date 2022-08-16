export interface AbilitiesWithIcon {
    gameID: number;
    icon: string;
    name: string;
    type: string;
}

export interface Aura {
    source: number;
    ability: number;
    stacks: number;
    icon: string;
    name: string;
}

export interface ClassResource {
    amount: number;
    max: number;
    type: number;
}

export interface Ability {
    timestamp: number;
    type: string;
    sourceID: number;
    targetID: number;
    abilityGameID: number;
    fight: number;
    resourceActor: number;
    classResources: ClassResource[];
    hitPoints: number;
    maxHitPoints: number;
    attackPower: number;
    spellPower: number;
    armor: number;
    x: number;
    y: number;
    facing: number;
    mapID: number;
    itemLevel: number;
    sameSource: boolean;
}

export interface TypesOfAbilities {
    abilityNumber: Ability[];
}

export interface Auras {
    auras: Aura[];
}

export interface AbilitiesOfPlayer {
    cast: TypesOfAbilities;
    damage: TypesOfAbilities;
    resourcechange: TypesOfAbilities;
    heal: TypesOfAbilities;
}

export interface AurasAndAbilitiesOfPlayer extends AbilitiesOfPlayer, Auras {
    name: string;
}
