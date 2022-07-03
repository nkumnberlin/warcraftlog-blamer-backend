import listBoss from './boss/listBoss';
import listFight from "./fight/listFight";

interface IQueryVars  {
    code?: string,
    fight?: string,
    encounterID?: string
}


async function reportHandler(action: string, queryVars: IQueryVars ){
    console.log('action ', action);
    switch (action) {
        case 'boss':  {
            const {code} = queryVars;
            return await listBoss(code);
        }
        case 'fight': {
            const {code, fight, encounterID} = queryVars;
            return await listFight({code, fight: parseInt(fight), encounterID: parseInt(encounterID)});
        }
        default: throw new Error(`Error with Action ${action}, query: ${JSON.stringify(queryVars)}`);
    }
}

export default reportHandler;
