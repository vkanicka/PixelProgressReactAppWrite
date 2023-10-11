import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

export const account = new Account(client);
export { ID } from 'appwrite';
