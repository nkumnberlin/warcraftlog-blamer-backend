import { GraphQLClient} from 'graphql-request';


const GRAPHQL_ENDPOINT = process.env.WLOG_URL || '';
const GRAPHQL_BEARER = process.env.WLOG_BEARER || '';
const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
        Authorization: `${GRAPHQL_BEARER}`
    },
});

export default graphQLClient;



