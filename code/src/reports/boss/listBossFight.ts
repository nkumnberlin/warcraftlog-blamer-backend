import LIST_BOSS_FIGHT from '../../queries/listFights';
import graphQLClient from '../../client/gqlClient';

const listBossFight = async (code: string) => {
    const {data} =  await graphQLClient.request(LIST_BOSS_FIGHT, {code});
    const singleReport = data.reportData.report;
    const onlyBossFights = singleReport.data.reportData.report.fights.filter(
        (fight: { difficulty: number; }) => fight.difficulty !== null,
    );


    return {
        singleReport,
        onlyBossFights
    };
};

export default listBossFight;
