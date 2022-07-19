interface IRoleDetails {
    healers: IPlayerDetails[],
    dps: IPlayerDetails[],
    tanks: IPlayerDetails[]
}

interface IPlayerDetails {
    name: string,
    id: number,
    guid: number,
    type: string,
    server: string,
    icon: string,
    specs: [string],
    minItemLevel: number,
    maxItemLevel: number,
    combatantInfo: ICombatantInfo
}

interface ICombatantInfo {
    stats: IStats,
    gear: IGear[]
}

export interface IGemMeta {
    note: string,
}

export interface IGearMeta {
    error: string
}


export interface ICheckGem extends IUpdatedGear {
    metaGem: IGearMeta
}

interface IUpdatedGear {
    id: number,
    slot: number,
    quality: number,
    icon: string,
    name: string,
    itemLevel: number,
    permanentEnchant: number,
    permanentEnchantName: string,
    gems?: ICheckGemQuality[],
    setID: number,
}

export interface ICheckGemQuality extends IGems {
    metaGem?: IGemMeta
}


interface IGear {
    id: number,
    slot: number,
    quality: number,
    icon: string,
    name: string,
    itemLevel: number,
    permanentEnchant: number,
    permanentEnchantName: string,
    gems?: IGems[],
    setID: number,
}


interface IGems {
    id: number,
    itemLevel: number,
    icon: string,
}

interface IStats {
    Hit: {
        min: number,
        max: number
    },
    Intellect: {
        min: number,
        max: number
    },
    Agility: {
        min: number,
        max: number
    },
    Crit: {
        min: number,
        max: number
    },
    ItemLevel: {
        min: number,
        max: number
    },
    Spirit: {
        min: number,
        max: number
    },
    Strength: {
        min: number,
        max: number
    },
    Stamina: {
        min: number,
        max: number
    },
    Expertise: {
        min: number,
        max: number
    },
    Haste: {
        min: number,
        max: number
    },
}

export {IPlayerDetails, IRoleDetails, IGear, IStats, IGems, ICombatantInfo};
