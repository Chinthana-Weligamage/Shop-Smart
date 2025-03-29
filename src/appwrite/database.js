import { client, account, ID, Databases } from "./config";

const databases = new Databases(client);

const DATABASE_ID = "67e789d60004075caeb8";
const REQUEST_COLLECTION_ID = "67e789f5000c862e0b49";

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
