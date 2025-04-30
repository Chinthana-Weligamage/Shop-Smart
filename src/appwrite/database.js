import { client, account, ID, Databases, Query } from "./config";

const databases = new Databases(client);

const DATABASE_ID = "67e789d60004075caeb8";
const REQUEST_COLLECTION_ID = "67e789f5000c862e0b49";
const OFFER_COLLECTION_ID = "67e7a9a7000fba931c4f";
const ORDER_COLLECTION_ID = "67e7c1fd002528d5b216";

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

export function getCreatorIdByRequestId(requestId) {
  const promise = databases.listDocuments(DATABASE_ID, REQUEST_COLLECTION_ID, [
    Query.select(["creatorId"]),
    Query.equal("$id", [requestId]),
  ]);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function createOffer(data) {
  const promise = databases.createDocument(
    DATABASE_ID,
    OFFER_COLLECTION_ID,
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

export function getAllOffers() {
  const promise = databases.listDocuments(DATABASE_ID, OFFER_COLLECTION_ID);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function getSentOffers(creatorId) {
  const promise = databases.listDocuments(DATABASE_ID, OFFER_COLLECTION_ID, [
    Query.equal("creatorId", [creatorId]),
  ]);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function getReceivedOffers(receiverId) {
  const promise = databases.listDocuments(DATABASE_ID, OFFER_COLLECTION_ID, [
    Query.equal("receiverId", [receiverId]),
  ]);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function updateOfferStatus(offerId, status) {
  const promise = databases.updateDocument(
    DATABASE_ID,
    OFFER_COLLECTION_ID,
    offerId,
    {
      offerStatus: status,
    }
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
export function getCreatorIdByOfferId(offerId) {
  const promise = databases.getDocument(
    DATABASE_ID,
    OFFER_COLLECTION_ID,
    offerId
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
export async function createOrder(data) {
  try {
    // Step 1: Create the Order
    const response = await databases.createDocument(
      DATABASE_ID,
      ORDER_COLLECTION_ID,
      ID.unique(),
      data
    );
    console.log("Order created successfully:", response);

    // Step 2: Update the Offer Status
    const offerId = response.offers.$id;
    if (!offerId) {
      throw new Error("Offer ID is missing from order data.");
    }

    await databases.updateDocument(DATABASE_ID, OFFER_COLLECTION_ID, offerId, {
      offerStatus: "Order Created",
    });

    // Step 3: Return the order creation response
    return response;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
}

export function getAllOrders() {
  const promise = databases.listDocuments(DATABASE_ID, ORDER_COLLECTION_ID);

  return promise.then(
    function (response) {
      return response.documents; // Success
    },
    function (error) {
      throw error; // Failure
    }
  );
}

export function updateOrderStatus(orderId, status) {
  const promise = databases.updateDocument(
    DATABASE_ID,
    ORDER_COLLECTION_ID,
    orderId,
    {
      orderStatus: status,
    }
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
