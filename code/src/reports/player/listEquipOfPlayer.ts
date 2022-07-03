import graphQLClient from '../../client/gqlClient';
import LIST_FRIENDLY_PLAYER from "../../queries/listFriendlyPlayer";


interface IListEquipOfPlayer {
    code?: string,
    fight?: number,
    encounterID?: number,
    startTime: number,
    endTime: number
}

const ListEquipOfPlayer = async ({code, fight, encounterID, startTime, endTime}: IListEquipOfPlayer) => {
    const data = await graphQLClient.request(LIST_FRIENDLY_PLAYER, {
        code: code,
        encounterID: encounterID,
        fightIds: [fight],
        startTime,
        endTime
    });
    return data.reportData.report.playerDetails;
};

export default ListEquipOfPlayer;
