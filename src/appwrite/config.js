import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67d50b8900342bed940b");

export const account = new Account(client);
export { ID } from "appwrite";
