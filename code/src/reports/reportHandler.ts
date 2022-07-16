import listBoss from './boss/listBoss';
import listFight from "./fight/listFight";
import {Actions, IQueryVars} from "../interfaces";
import missingEnchants from "../features/missingEnchants";


async function reportHandler(action: Actions, queryVars: IQueryVars) {
    console.log('action ', action);
    switch (action) {
        case 'BOSS': {
            const {code} = queryVars;
            return await listBoss(code);
        }
        case 'FIGHT': {
            const {code, fight, encounterID} = queryVars;
            return await listFight({code, fight: parseInt(fight), encounterID: parseInt(encounterID)});
        }
        case 'FEATURE-ENCHANTS': {
            const {serverSlug, name, serverRegion, encounterID} = queryVars;
            return await missingEnchants({
                serverSlug, name, serverRegion, encounterID: parseInt(encounterID)
            });
        }
        default:
            throw new Error(`Error with Action ${action}, query: ${JSON.stringify(queryVars)}`);
    }
}

export default reportHandler;
