import {LIST_ENEMIES_TO_FIGHT} from "../../client/queries";
import graphQLClient from "../../client/gqlClient";

const listEnemies = async (code: string) => {
    const data = await graphQLClient.request(LIST_ENEMIES_TO_FIGHT, {code});
    return data.reportData.report.masterData.actors;
};


export default listEnemies;
