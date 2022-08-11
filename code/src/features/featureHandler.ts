import listBoss from './boss/listBoss';
import {Actions, IQueryVars} from "../interfaces";
import listFight from "./fight/listFight";
import listFightWithGearCheck from "./fight/listFightWithGearCheck";
import {listParseToFight} from "./fight/listParseToFight";
import listAbilities from "./ability/listAbilities";


async function featureHandler(action: Actions, queryVars: IQueryVars) {
    console.log('DEBUG: action ', action);
    switch (action) {
        case 'BOSS': {
            const {code} = queryVars;
            return await listBoss(code);
        }
        case 'FIGHT': {
            const {code, fight, encounterID, startTime, endTime} = queryVars;
            return await listFight({
                code, fight: parseInt(fight), encounterID: parseInt(encounterID),
                startTime: parseInt(startTime), endTime: parseInt(endTime)
            });
        }
        case "LIST_PARSE_TO_FIGHT":{
            const {code, encounterID, parseType} = queryVars;
            return await listParseToFight({
                code, encounterID: parseInt(encounterID), parseType: parseType
            });
        }

        case 'FEATURE_GEAR_ISSUES': {
            const {code, fight, encounterID, startTime, endTime} = queryVars;
            return await listFightWithGearCheck({
                code, fight: parseInt(fight), encounterID: parseInt(encounterID),
                startTime: parseInt(startTime), endTime: parseInt(endTime)
            });
        }
        case 'FEATURE_ABILITY_ISSUES': {
            const {code, fight, encounterID, startTime, endTime, sourceID} = queryVars;
            return await listAbilities({
                code, fight: parseInt(fight), encounterID: parseInt(encounterID),
                startTime: parseInt(startTime), endTime: parseInt(endTime), sourceID: parseInt(sourceID)
            });
        }
        default:
            throw new Error(`Error with Action ${action}, query: ${JSON.stringify(queryVars)}`);
    }
}

export default featureHandler;
