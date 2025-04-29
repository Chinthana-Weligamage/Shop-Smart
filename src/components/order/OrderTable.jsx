import React from "react";

const OrderTable = ({ orderData, action, refresh }) => {
  const statusColor = {
    "In Progress": "btn-secondary",
    Delivered: "btn-warning",
    Received: "btn-warning",
    Completed: "btn-success",
    Canceled: "btn-error",
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
            <th>Order Details</th>
            <th className="text-center">Order Value</th>
            <th className="text-center">Est. Delivery</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.$id}>
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
                        src={order.orderImageUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{order.orderTitle}</div>
                    <div className="text-sm opacity-50">
                      {order.orderMsg.length > 50
                        ? `${order.orderMsg.substring(0, 47)}...`
                        : order.orderMsg}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">{order.orderValue} USD</td>
              <td className="text-center">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(order.estDelivery))}
              </td>
              <td className="text-center">
                <button
                  className={`btn btn-xs ${statusColor[order.orderStatus]}`}
                >
                  {order.orderStatus}
                </button>
              </td>

              <td>{action(order)}</td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default OrderTable;
