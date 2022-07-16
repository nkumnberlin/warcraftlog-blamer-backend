import graphQLClient from '../../client/gqlClient';
import {LIST_EQUIPMENT_OF_PLAYER} from "../../queries";
import {IListEquipOfPlayer} from "../../interfaces";


const ListEquipOfPlayer = async ({name, serverRegion, encounterID, serverSlug}: IListEquipOfPlayer) => {
    const data = await graphQLClient.request(LIST_EQUIPMENT_OF_PLAYER, {
        serverSlug: serverSlug,
        serverRegion: serverRegion,
        name: name,
        encounterId: encounterID,

    }).catch((e) => console.log('error ', e));
    return data.reportData.report.playerDetails;
};

export default ListEquipOfPlayer;
