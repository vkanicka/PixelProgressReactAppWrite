import { Account,  Client, Databases } from 'appwrite';

export const client = new Client();

export const VITE_APPWRITE_API_ENDPOINT = import.meta.env.VITE_APPWRITE_API_ENDPOINT
export const VITE_APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
export const VITE_APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
export const VITE_APPWRITE_GOALS_ID = import.meta.env.VITE_APPWRITE_GOALS_ID
export const VITE_APPWRITE_STATUSES_ID = import.meta.env.VITE_APPWRITE_STATUSES_ID

client
    .setEndpoint(VITE_APPWRITE_API_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from 'appwrite';
