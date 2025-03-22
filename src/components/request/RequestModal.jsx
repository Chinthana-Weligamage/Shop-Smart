import React from "react";

const RequestModal = ({ request }) => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-secondary btn-block"
        onClick={() => document.getElementById(`${request.$id}`).showModal()}
      >
        View Request
      </button>
      <dialog id={request.$id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg my-2">{request.productName}</h3>
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1/2">
              <figure>
                <img
                  src={request.imageUrl}
                  alt="Product"
                  className="w-full max-h-60 object-cover rounded-lg"
                />
              </figure>
            </div>
            <div className="flex-1/2">
              <table className="w-full border-0">
                <tbody>
                  <tr className="border-0">
                    <td className="border-0">Condition:</td>
                    <td className="border-0 ">
                      <span className="font-bold">
                        {request.condition || "Any Condition"}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td className="border-0">From:</td>
                    <td className="border-0 ">
                      <span className="font-bold">
                        {request.importCountry || "Any Country"}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-0">
                    <td className="border-0">Price Range:</td>
                    <td className="border-0 ">
                      <span className="font-bold">
                        {request.minPrice} - {request.maxPrice} USD
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="py-4">{request.description}</p>
            </div>
          </div>
          <div className="card-actions justify-between mt-4">
            <button
              onClick={() => {
                document.getElementById(`${request.$id}`).close();
                window.location.href = `/new-offer/${request.$id}`;
              }}
              className="btn btn-primary btn-block"
            >
              Create Offer
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default RequestModal;
