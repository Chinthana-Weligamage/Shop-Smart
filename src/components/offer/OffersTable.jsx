import React from "react";
import ImageBox from "../common/ImageBox";
ImageBox;

const OffersTable = ({ offerData, action, refresh }) => {
  const statusColor = {
    Pending: "btn-warning",
    Accepted: "btn-success",
    Declined: "btn-error",
  };

  return (
    <div className="overflow-x-auto bg-white p-3 rounded-xl shadow-sm">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center max-w-fit px-1">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Offer Details</th>
            <th className="text-center">Offer Price</th>
            <th className="text-center">Condition</th>
            <th className="text-center">From</th>
            <th className="text-center">Est. Delivery</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {offerData.map((offer) => (
            <tr key={offer.$id}>
              <th className="text-center max-w-fit px-1">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <ImageBox imageSrc={offer.offerImageUrl}>
                        <img
                          src={offer.offerImageUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </ImageBox>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{offer.offerTitle}</div>
                    <div className="text-sm opacity-50">
                      {offer.offerMsg.length > 50
                        ? `${offer.offerMsg.substring(0, 47)}...`
                        : offer.offerMsg}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">{offer.offerPrice} USD</td>
              <td className="text-center">{offer.condition}</td>
              <td className="text-center">{offer.importCountry}</td>
              <td className="text-center">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(offer.estDelivery))}
              </td>
              <td className="text-center">
                <button
                  className={`btn btn-xs ${statusColor[offer.offerStatus]}`}
                >
                  {offer.offerStatus}
                </button>
              </td>

              <td>{action(offer)}</td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default OffersTable;
