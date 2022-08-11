import {IListParseToFight, IParseResponse, IReport} from "./interfaces";
import graphQLClient from "../../client/gqlClient";
import {LIST_PARSE_TO_FIGHT} from "../../client/queries";

function accessCurrentRanking(currentReport: IReport, code: string) {
    return currentReport.rankedCharacters.map(({name, encounterRankings}) => {
        const ranking = encounterRankings.ranks.find((rank) => rank.report.code === code);
        return {
            [name]: ranking.rankPercent
        };
    });
}

export async function listParseToFight({code, encounterID, parseType}: IListParseToFight) {
    const {reportData}: IParseResponse = await graphQLClient.request(LIST_PARSE_TO_FIGHT, {
        code,
        encounterID,
        metric: parseType
    });
    const ranking = accessCurrentRanking(reportData.report, code);
    return ranking.reduce((prev: any, curr: { name: number }) => ({
            [parseType]: {
                ...prev[parseType],
                ...curr
            },
    }),{});
}
