import listBossFight from './boss/listBossFight';

interface IQueryVars {
    code?: string;
}

type ReportType = 'boss';


async function reportHandler(reportType: ReportType, queryVars: IQueryVars ){
    console.log('param ', reportType);
    switch (reportType) {
        case 'boss':  {
            const {code} = queryVars;
            return await listBossFight(code);
        }
        default: new Error('Report does not exist');
    }
}

export default reportHandler;
