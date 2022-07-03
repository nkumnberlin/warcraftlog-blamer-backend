import graphQLClient from '../../client/gqlClient';
import LIST_BOSS from "../../queries/listBoss";

const listBoss = async (code: string) => {
    const data =  await graphQLClient.request(LIST_BOSS, {code});
    const singleReport = data.reportData.report;
    const onlyBossFights = singleReport.fights.filter(
        (fight: { difficulty: number; }) => fight.difficulty !== null,
    );

    return {
        singleReport,
        onlyBossFights
    };
};

export default listBoss;
