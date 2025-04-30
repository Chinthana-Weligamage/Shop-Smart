import { client, Storage, ID } from "./config";

const storage = new Storage(client);

const PROJECT_ID = "67e789c5003d998e4b65";
const BUCKET_ID = "681106ce00199dd8f319";

export function uploadImage(imageFile) {
  const promise = storage.createFile(BUCKET_ID, ID.unique(), imageFile);

  return promise.then(
    function (response) {
      return `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${response.$id}/view?project=${PROJECT_ID}`; // Success
    },
    function (error) {
      return error; // Failure
    }
  );
}
