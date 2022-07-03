import graphQLClient from '../../client/gqlClient';
import LIST_BOSS from "../../queries/listBoss";

const listBoss = async (code: string) => {
    const data = await graphQLClient.request(LIST_BOSS, {code});
    const singleReport = data.reportData.report;
    const onlyBossFights = singleReport.fights.filter(
        (fight: { difficulty: number; }) => fight.difficulty !== null,
    );
    // list of unique BossIDs
    const uniqueEncounter = [...new Set(onlyBossFights.map((boss: { encounterID: string }) => boss.encounterID))];
    // unordered map of trys and kills to specific boss
    const summarizeBosses = uniqueEncounter.map((id) => onlyBossFights.filter((bossFight: { encounterID: string }) => id === bossFight.encounterID));
    const bossData = summarizeBosses.map((bosses)=> {
        const kill = bosses.find((boss: {kill: boolean})=> boss.kill);
        const infos = bosses[0];
        const trys = bosses.filter((boss: {kill: boolean})=> boss.kill === false);
        return {
            kill,
            trys,
            infos
        };
        }
    );
    return {
        singleReport,
        bossData
    };
};

export default listBoss;
