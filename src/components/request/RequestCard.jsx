import React from "react";
import RequestModal from "./RequestModal";

const requestCard = ({ request }) => {
  return (
    <div className="card bg-base-200 w-full shadow-md relative">
      <figure>
        <img
          src={request.imageUrl}
          alt="Product"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold w-full flex gap-2 justify-between align-top">
          {request.productName?.length > 50
            ? request.productName.substring(0, 47) + "..."
            : request.productName}
        </h2>
        <div className="badge badge-accent absolute top-2 right-2 text-xs">
          From: {request.importCountry || "Any Country"}
        </div>

        <div className=" P-2">
          <table className="w-full border-0">
            <tbody>
              <tr className="border-0">
                <td className="border-0 pl-2">Condition:</td>
                <td className="border-0 ">
                  <span className="font-bold">
                    {request.condition || "Any Condition"}
                  </span>
                </td>
              </tr>
              <tr className="border-0">
                <td className="border-0 pl-2">Price Range:</td>
                <td className="border-0 ">
                  <span className="font-bold">
                    {request.minPrice} - {request.maxPrice} USD
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card-actions justify-between mt-4">
          <RequestModal request={request} />
        </div>
      </div>
    </div>
  );
};

export default requestCard;
