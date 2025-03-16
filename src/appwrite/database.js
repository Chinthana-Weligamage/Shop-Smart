import { client, account, ID, Databases } from "./config";

const databases = new Databases(client);

const DATABASE_ID = "67d6a409000b5b31f3cc";
const REQUEST_COLLECTION_ID = "67d6a434000159c76b26";

export function createProductRequest(data) {
  const promise = databases.createDocument(
    DATABASE_ID,
    REQUEST_COLLECTION_ID,
    ID.unique(),
    data
  );

  return promise.then(
    function (response) {
      return response; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function getAllProductRequests() {
  const promise = databases.listDocuments(DATABASE_ID, REQUEST_COLLECTION_ID);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}
