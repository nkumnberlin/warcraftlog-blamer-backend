    export interface Guild {
        id?: number;
        name: string;
        faction?: number;
    }

    export interface Report2 {
        code: string;
        startTime: any;
        fightID: number;
    }

    export interface Rank {
        lockedIn: boolean;
        rankPercent: number;
        historicalPercent: number;
        todayPercent: number;
        rankTotalParses: number;
        historicalTotalParses: number;
        todayTotalParses: number;
        guild: Guild;
        report: Report2;
        duration: number;
        startTime: any;
        amount: number;
        bracketData: number;
        spec: string;
        bestSpec: string;
        class: number;
        faction: number;
    }

    export interface EncounterRankings {
        bestAmount: number;
        medianPerformance: number;
        averagePerformance: number;
        totalKills: number;
        fastestKill: number;
        difficulty: number;
        metric: string;
        partition: number;
        zone: number;
        ranks: Rank[];
    }

    export interface RankedCharacter {
        name: string;
        id: number;
        encounterRankings: EncounterRankings;
    }

    export interface Report {
        rankedCharacters: RankedCharacter[];
    }

    export interface ReportData {
        report: Report;
    }

    export interface IParseResponse {
        reportData: ReportData;
    }



