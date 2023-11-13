import { Client, Account, Databases } from 'appwrite';

export const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const databases = new Databases(client);

//createGoal
// const promise = databases.createDocument(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     import.meta.env.VITE_APPWRITE_GOALS_ID,
//     ID.unique(),
//     { "name": "V" }
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });


// export const getGoals = () => {
    
//     let promise = databases.listDocuments(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_GOALS_ID,
//         // [
//         //     Query.equal('name', 'V')
//         // ]
//     );
    
//     promise.then(function (response) {
//         console.log(response?.documents.map(x=>x.name))
//     }, function (error) {
//         console.log(error);
//     });
    
    
// }

export const account = new Account(client);
export { ID } from 'appwrite';
