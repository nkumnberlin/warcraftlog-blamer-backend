import graphQLClient from '../../client/gqlClient';
import {LIST_FRIENDLY_PLAYER} from "../../queries/listFriendlyPlayer";


interface IListPlayersToFight {
    code?: string,
    fight?: number,
    encounterID?: number,
    startTime: number,
    endTime: number
}

const ListPlayersToFight = async ({code, fight, encounterID, startTime, endTime}: IListPlayersToFight) => {
    const data = await graphQLClient.request(LIST_FRIENDLY_PLAYER, {
        code: code,
        encounterID: encounterID,
        fightIds: [fight],
        startTime,
        endTime
    });
    const {guild, playerDetails} = data.reportData.report;

    const {data: playerData} = playerDetails;
    return {
        guild,
        playerData
    };
};

export default ListPlayersToFight;
