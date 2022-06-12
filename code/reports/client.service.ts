// import {getRepository} from "typeorm";
// import {Client} from "./helper/db/entities";
// import {User} from "./helper/models/User";
//
// export const createClient = async (user: User) => {
//     try {
//         return await getRepository(Client).save(user);
//     } catch (e) {
//         console.log('create client', e);
//     }
// };
//
//
// export const queryClientWithId = async (id: string) => {
//     const client = await getRepository(Client).findOne({id});
//     if (client === undefined) {
//         new Error('cannot find client with id');
//     }
//     return client;
// };
//
//
// export const queryRelatedFieldsOfClientId = async (id: string, relation: string[]) => {
//     const clientRepository = getRepository(Client);
//     return await clientRepository.findOne({
//         id
//     }, {relations: relation});
// };
//
// export const queryAllClient = async () => {
//     try {
//         return await getRepository(Client).find();
//     } catch (e) {
//         return e;
//     }
// };
//
// interface UpdateClientProps {
//     client: Client;
// }
//
// export const updateClient = async ({client}: UpdateClientProps) => {
//     try {
//         console.log('update: ', client);
//         return await getRepository(Client).save(client);
//     } catch (e) {
//         console.log('updateClient', e);
//     }
// };
//
// interface UpdateJiraToken {
//     token: string,
//     secret: string,
//     clientId: string,
// }
//
// export const updateJiraTokenOfClient = async ({
//                                                   token,
//                                                   secret,
//                                                   clientId,
//                                               }: UpdateJiraToken) => {
//     const client = await queryClientWithId(clientId);
//     if (client === undefined) {
//         throw  new Error('CLIENT UNDEFINED');
//     }
//     if (client.token === token) {
//         client.secret = secret;
//         return updateClient({client});
//     }
//     client.token = token;
//     client.secret = secret;
//     return await updateClient({client});
// };
//
//
// export const getClientProfile = async (clientId: string) => {
//     return await queryRelatedFieldsOfClientId(clientId, ['relatedJob', 'relatedJob.applicationStatus']);
// };
