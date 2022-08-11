import {Events, IAura, IEventData} from "./IAbilities";

export interface ISortAbilities {
    wLogEvents: Events,
    sourceID: number,
}

export interface IAbilitiesOfPlayer  {[key: string]: (IAura | IEventData)[]}
