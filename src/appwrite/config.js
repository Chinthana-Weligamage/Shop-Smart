import { Client, Account, Query } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e789c5003d998e4b65");

export const account = new Account(client);
export { ID } from "appwrite";
export { Storage } from "appwrite";
export { Databases } from "appwrite";
export { Query } from "appwrite";
