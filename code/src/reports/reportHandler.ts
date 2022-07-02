import listBossFight from './boss/listBossFight';

interface IQueryVars {
    code?: string;
}

const ReportType = {
    boss: 'boss',
    report: 'report'
};

function checkIfReportTypeExist(reportType: string) {
    return reportType in ReportType;
}


async function reportHandler(reportType: string, queryVars: IQueryVars ){
    if(!checkIfReportTypeExist(reportType)) throw new Error('Not a Valid Type');
    console.log('param ', reportType);
    switch (reportType) {
        case 'boss':  {
            const {code} = queryVars;
            return await listBossFight(code);
        }
        default: throw new Error('Report does not exist');
    }
}

export default reportHandler;
