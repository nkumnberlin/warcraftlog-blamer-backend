import graphQLClient from '../../client/gqlClient';
import LIST_FRIENDLY_PLAYER from "../../queries/listFriendlyPlayer";


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
    // const dps = playerDetails.data.playerDetails.dps.map(async (player: any)=> await graphQLClient.request(LIST_EQUIPMENT_OF_PLAYER, {
    //     encounterID: encounterID,
    //     $serverSlug: guild.server.slug,
    //     $serverRegion: guild.server.region.compactName,
    //     $name: player.name
    // }));
    const {data: playerData} = playerDetails;
    return {
        guild,
        playerData
    };
};

export default ListPlayersToFight;
