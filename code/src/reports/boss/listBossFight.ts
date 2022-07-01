import LIST_FIGHTS from '../../queries/listFights';
import graphQLClient from '../../client/gqlClient';

const listBossFight = async (code: string) => {
    return await graphQLClient.request(LIST_FIGHTS, {code});
};

export default listBossFight;
