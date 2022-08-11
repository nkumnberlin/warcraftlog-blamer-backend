import graphQLClient from '../../client/gqlClient';
import {LIST_PLAYER_DETAILS} from "../../client/queries/listFriendlyPlayer";


interface IListPlayersToFight {
    code?: string,
    fight?: number,
    encounterID?: number,
    startTime: number,
    endTime: number
}

const listPlayerDetails = async ({code, fight, encounterID, startTime, endTime}: IListPlayersToFight) => {
    const {reportData} = await graphQLClient.request(LIST_PLAYER_DETAILS, {
        code: code,
        encounterID: encounterID,
        fightIds: [fight],
        startTime,
        endTime
    });

    const {report} = reportData;
    const {guild, table} = report;
    const {playerDetails, damageDone, healingDone, deathEvents, damageTaken} = table.data;
    return {
        guild,
        playerDetails,
        damageDone,
        healingDone,
        deathEvents,
        damageTaken
    };
};

export default listPlayerDetails;
