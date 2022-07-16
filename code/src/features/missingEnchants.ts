import {IListEquipOfPlayer} from "../interfaces";
import ListEquipOfPlayer from "../reports/player/listEquipOfPlayer";

const missingEnchants = async ({name, serverRegion, encounterID, serverSlug}: IListEquipOfPlayer) => {
    const {data} = await ListEquipOfPlayer({
        serverSlug, name, serverRegion, encounterID
    });
    console.log(data);

    return data;

};

export default missingEnchants;
