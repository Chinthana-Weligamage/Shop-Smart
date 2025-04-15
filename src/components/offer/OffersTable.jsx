import React from "react";

const OffersTable = ({ offerData, travellerData, refresh }) => {
  console.log(offerData);
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
            <th>Traveler</th>
            <th className="text-center">Offer Details</th>
            <th className="text-center">Offer Price</th>
            <th className="text-center">Condition</th>
            <th className="text-center">From</th>
            <th className="text-center">Est. Delivery</th>
            <th className="text-center">Status</th>
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
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {offer.offerTitle}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {offer.offerMsg.length > 50
                    ? `${offer.offerMsg.substring(0, 47)}...`
                    : offer.offerMsg}{" "}
                  asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasd
                </span>
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
              <th className="text-right">
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default OffersTable;
