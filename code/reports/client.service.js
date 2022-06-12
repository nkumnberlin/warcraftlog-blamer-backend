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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGllbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsK0NBQStDO0FBQy9DLDZDQUE2QztBQUM3QyxFQUFFO0FBQ0Ysc0RBQXNEO0FBQ3RELFlBQVk7QUFDWix5REFBeUQ7QUFDekQsb0JBQW9CO0FBQ3BCLDJDQUEyQztBQUMzQyxRQUFRO0FBQ1IsS0FBSztBQUNMLEVBQUU7QUFDRixFQUFFO0FBQ0YsMkRBQTJEO0FBQzNELGdFQUFnRTtBQUNoRSxrQ0FBa0M7QUFDbEMsbURBQW1EO0FBQ25ELFFBQVE7QUFDUixxQkFBcUI7QUFDckIsS0FBSztBQUNMLEVBQUU7QUFDRixFQUFFO0FBQ0YsMEZBQTBGO0FBQzFGLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsYUFBYTtBQUNiLGlDQUFpQztBQUNqQyxLQUFLO0FBQ0wsRUFBRTtBQUNGLDhDQUE4QztBQUM5QyxZQUFZO0FBQ1oscURBQXFEO0FBQ3JELG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsUUFBUTtBQUNSLEtBQUs7QUFDTCxFQUFFO0FBQ0YsZ0NBQWdDO0FBQ2hDLHNCQUFzQjtBQUN0QixJQUFJO0FBQ0osRUFBRTtBQUNGLHVFQUF1RTtBQUN2RSxZQUFZO0FBQ1osMkNBQTJDO0FBQzNDLDJEQUEyRDtBQUMzRCxvQkFBb0I7QUFDcEIsMENBQTBDO0FBQzFDLFFBQVE7QUFDUixLQUFLO0FBQ0wsRUFBRTtBQUNGLDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLHdCQUF3QjtBQUN4QixJQUFJO0FBQ0osRUFBRTtBQUNGLGtEQUFrRDtBQUNsRCwyREFBMkQ7QUFDM0QsNERBQTREO0FBQzVELDhEQUE4RDtBQUM5RCx5RUFBeUU7QUFDekUsd0RBQXdEO0FBQ3hELGtDQUFrQztBQUNsQyxnREFBZ0Q7QUFDaEQsUUFBUTtBQUNSLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUiw0QkFBNEI7QUFDNUIsOEJBQThCO0FBQzlCLDJDQUEyQztBQUMzQyxLQUFLO0FBQ0wsRUFBRTtBQUNGLEVBQUU7QUFDRixnRUFBZ0U7QUFDaEUsMkdBQTJHO0FBQzNHLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQge2dldFJlcG9zaXRvcnl9IGZyb20gXCJ0eXBlb3JtXCI7XG4vLyBpbXBvcnQge0NsaWVudH0gZnJvbSBcIi4vaGVscGVyL2RiL2VudGl0aWVzXCI7XG4vLyBpbXBvcnQge1VzZXJ9IGZyb20gXCIuL2hlbHBlci9tb2RlbHMvVXNlclwiO1xuLy9cbi8vIGV4cG9ydCBjb25zdCBjcmVhdGVDbGllbnQgPSBhc3luYyAodXNlcjogVXNlcikgPT4ge1xuLy8gICAgIHRyeSB7XG4vLyAgICAgICAgIHJldHVybiBhd2FpdCBnZXRSZXBvc2l0b3J5KENsaWVudCkuc2F2ZSh1c2VyKTtcbi8vICAgICB9IGNhdGNoIChlKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgY2xpZW50JywgZSk7XG4vLyAgICAgfVxuLy8gfTtcbi8vXG4vL1xuLy8gZXhwb3J0IGNvbnN0IHF1ZXJ5Q2xpZW50V2l0aElkID0gYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbi8vICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRSZXBvc2l0b3J5KENsaWVudCkuZmluZE9uZSh7aWR9KTtcbi8vICAgICBpZiAoY2xpZW50ID09PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgbmV3IEVycm9yKCdjYW5ub3QgZmluZCBjbGllbnQgd2l0aCBpZCcpO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gY2xpZW50O1xuLy8gfTtcbi8vXG4vL1xuLy8gZXhwb3J0IGNvbnN0IHF1ZXJ5UmVsYXRlZEZpZWxkc09mQ2xpZW50SWQgPSBhc3luYyAoaWQ6IHN0cmluZywgcmVsYXRpb246IHN0cmluZ1tdKSA9PiB7XG4vLyAgICAgY29uc3QgY2xpZW50UmVwb3NpdG9yeSA9IGdldFJlcG9zaXRvcnkoQ2xpZW50KTtcbi8vICAgICByZXR1cm4gYXdhaXQgY2xpZW50UmVwb3NpdG9yeS5maW5kT25lKHtcbi8vICAgICAgICAgaWRcbi8vICAgICB9LCB7cmVsYXRpb25zOiByZWxhdGlvbn0pO1xuLy8gfTtcbi8vXG4vLyBleHBvcnQgY29uc3QgcXVlcnlBbGxDbGllbnQgPSBhc3luYyAoKSA9PiB7XG4vLyAgICAgdHJ5IHtcbi8vICAgICAgICAgcmV0dXJuIGF3YWl0IGdldFJlcG9zaXRvcnkoQ2xpZW50KS5maW5kKCk7XG4vLyAgICAgfSBjYXRjaCAoZSkge1xuLy8gICAgICAgICByZXR1cm4gZTtcbi8vICAgICB9XG4vLyB9O1xuLy9cbi8vIGludGVyZmFjZSBVcGRhdGVDbGllbnRQcm9wcyB7XG4vLyAgICAgY2xpZW50OiBDbGllbnQ7XG4vLyB9XG4vL1xuLy8gZXhwb3J0IGNvbnN0IHVwZGF0ZUNsaWVudCA9IGFzeW5jICh7Y2xpZW50fTogVXBkYXRlQ2xpZW50UHJvcHMpID0+IHtcbi8vICAgICB0cnkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlOiAnLCBjbGllbnQpO1xuLy8gICAgICAgICByZXR1cm4gYXdhaXQgZ2V0UmVwb3NpdG9yeShDbGllbnQpLnNhdmUoY2xpZW50KTtcbi8vICAgICB9IGNhdGNoIChlKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVDbGllbnQnLCBlKTtcbi8vICAgICB9XG4vLyB9O1xuLy9cbi8vIGludGVyZmFjZSBVcGRhdGVKaXJhVG9rZW4ge1xuLy8gICAgIHRva2VuOiBzdHJpbmcsXG4vLyAgICAgc2VjcmV0OiBzdHJpbmcsXG4vLyAgICAgY2xpZW50SWQ6IHN0cmluZyxcbi8vIH1cbi8vXG4vLyBleHBvcnQgY29uc3QgdXBkYXRlSmlyYVRva2VuT2ZDbGllbnQgPSBhc3luYyAoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjcmV0LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRJZCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OiBVcGRhdGVKaXJhVG9rZW4pID0+IHtcbi8vICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBxdWVyeUNsaWVudFdpdGhJZChjbGllbnRJZCk7XG4vLyAgICAgaWYgKGNsaWVudCA9PT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICAgIHRocm93ICBuZXcgRXJyb3IoJ0NMSUVOVCBVTkRFRklORUQnKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKGNsaWVudC50b2tlbiA9PT0gdG9rZW4pIHtcbi8vICAgICAgICAgY2xpZW50LnNlY3JldCA9IHNlY3JldDtcbi8vICAgICAgICAgcmV0dXJuIHVwZGF0ZUNsaWVudCh7Y2xpZW50fSk7XG4vLyAgICAgfVxuLy8gICAgIGNsaWVudC50b2tlbiA9IHRva2VuO1xuLy8gICAgIGNsaWVudC5zZWNyZXQgPSBzZWNyZXQ7XG4vLyAgICAgcmV0dXJuIGF3YWl0IHVwZGF0ZUNsaWVudCh7Y2xpZW50fSk7XG4vLyB9O1xuLy9cbi8vXG4vLyBleHBvcnQgY29uc3QgZ2V0Q2xpZW50UHJvZmlsZSA9IGFzeW5jIChjbGllbnRJZDogc3RyaW5nKSA9PiB7XG4vLyAgICAgcmV0dXJuIGF3YWl0IHF1ZXJ5UmVsYXRlZEZpZWxkc09mQ2xpZW50SWQoY2xpZW50SWQsIFsncmVsYXRlZEpvYicsICdyZWxhdGVkSm9iLmFwcGxpY2F0aW9uU3RhdHVzJ10pO1xuLy8gfTtcbiJdfQ==