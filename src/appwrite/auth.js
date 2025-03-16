import { client, account, ID } from "./config";

export function createAccountUsingEmailAndPassword(email, password, name) {
  const promise = account.create(ID.unique(), email, password, name);

  return promise.then(
    function (response) {
      return response; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function loginUsingEmailAndPassword(email, password) {
  const promise = account.createEmailPasswordSession(email, password);

  return promise.then(
    function (response) {
      return response; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function getCurrentLoggedinUser() {
  const promise = account.get();

  return promise.then(
    function (response) {
      return response; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function logoutCurrentUser() {
  return account.deleteSession("current");
}

export function updateUserPreference(key, value) {
  const promise = account.updatePrefs({ [key]: value });

  return promise.then(
    function (response) {
      return response; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function getUserPreference(key) {
  const promise = account.getPrefs();

  return promise.then(
    function (response) {
      return response[key]; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}
