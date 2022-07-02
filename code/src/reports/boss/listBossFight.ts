import graphQLClient from '../../client/gqlClient';
import LIST_BOSS_FIGHT from "../../queries/listBossFight";

const listBossFight = async (code: string) => {
    const data =  await graphQLClient.request(LIST_BOSS_FIGHT, {code});
    console.log(data);
    const singleReport = data.reportData.report;
    const onlyBossFights = singleReport.fights.filter(
        (fight: { difficulty: number; }) => fight.difficulty !== null,
    );


    return {
        singleReport,
        onlyBossFights
    };
};

export default listBossFight;
