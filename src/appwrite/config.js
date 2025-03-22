import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67de50e50027d9bb7e9f");

export const account = new Account(client);
export { ID } from "appwrite";
export { Storage } from "appwrite";
export { Databases } from "appwrite";
