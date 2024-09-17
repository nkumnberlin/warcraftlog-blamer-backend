    export interface Gem {
        id: number;
        itemLevel: number;
        icon: string;
    }

    export interface Gear {
        id: number;
        quality: number;
        icon: string;
        itemLevel: number;
        permanentEnchant: number;
        gems: Gem[];
        setID?: number;
    }

    export interface IAura {
        source: number;
        ability: number;
        stacks: number;
        icon: string;
        name: string;
    }

    export interface Talent {
        id: number;
        icon: string;
    }

    export interface IEventData {
        timestamp: number;
        sameSource: boolean;
        type: string;
        fight: number;
        sourceID: number;
        gear: Gear[];
        auras: IAura[];
        expansion: string;
        faction: number;
        specID: number;
        strength: number;
        agility: number;
        stamina: number;
        intellect: number;
        spirit: number;
        dodge: number;
        parry: number;
        block: number;
        armor: number;
        critMelee: number;
        critRanged: number;
        critSpell: number;
        hasteMelee: number;
        hasteRanged: number;
        hasteSpell: number;
        hitMelee: number;
        hitRanged: number;
        hitSpell: number;
        expertise: number;
        resilienceCritTaken: number;
        resilienceDamageTaken: number;
        talents: Talent[];
        pvpTalents: any[];
        customPowerSet: any[];
        secondaryCustomPowerSet: any[];
        tertiaryCustomPowerSet: any[];
        targetID?: number;
        abilityGameID?: number;
        hitType?: number;
        amount?: number;
        mitigated?: number;
        unmitigatedAmount?: number;
        stack?: number;
        resourceChange?: number;
        resourceChangeType?: number;
        otherResourceChange?: number;
        maxResourceAmount?: number;
        waste?: number;
        melee?: boolean;
        overheal?: number;
        tick?: boolean;
        targetMarker?: number;
        sourceInstance?: number;
        targetInstance?: number;
        resisted?: number;
        sourceMarker?: number;
        overkill?: number;
        blocked?: number;
        abilityName?: string;
    }

    export interface Events {
        data: IEventData[];
    }

    export interface Report {
        code: string;
        events: Events;
    }

    export interface ReportData {
        report: Report;
    }

    export interface IData {
        reportData: ReportData;
    }

    export interface IListAbilitiesResponse {
        data: IData;
    }


