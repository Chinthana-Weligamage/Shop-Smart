import React, { useState, useEffect, use } from "react";
import Protector from "../components/Protector";
import Layout from "../components/Layout";
import OrderTable from "../components/order/OrderTable";
import Section from "../components/Section";
import { getAllOrders } from "../appwrite/database";
import Loading from "../components/common/Loading";
import { getCurrentLoggedinUser } from "../appwrite/auth";
import Swal from "sweetalert2";
import { updateOrderStatus } from "../appwrite/database";

import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const MyOrders = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const response = await getCurrentLoggedinUser();
      setCurrentUser(response);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchOrders(currentUser);
    }
  }, [currentUser]);

  const fetchOrders = async () => {
    if (!currentUser) return;

    try {
      const response = await getAllOrders(currentUser?.$id);
      const filteredOrders = response.filter(
        (order) =>
          order.creatorId === currentUser.$id ||
          order.receiverId === currentUser.$id
      );
      setOrderData(filteredOrders);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const refresh = () => {
    fetchOrders();
  };

  const handleOrderReceived = async (order) => {
    const result = await Swal.fire({
      title: "Do you Received this order?",
      text: "This order will be marked as received and Payment will be released to the traveller.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Received!",
    });

    if (result.isConfirmed) {
      try {
        const nextStatus =
          order.orderStatus === "Delivered" ? "Completed" : "Received";
        await updateOrderStatus(order.$id, nextStatus);
        Swal.fire(
          "Marked as Received!",
          "The order has been received.",
          "success"
        );
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to update the order. Please try again.",
          "error"
        );
      }
    }
  };

  const handleOrderNotReceived = async (order) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Not received the order even after 14 days from estimated delivery date, request a refund",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel my order Refund!",
    });

    if (result.isConfirmed) {
      try {
        await updateOrderStatus(order.$id, "Canceled");
        Swal.fire(
          "Canceled!",
          "The order has been Canceled. Refund process has been initiated.",
          "success"
        );
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to cancel the order.",
          "error"
        );
      }
    }
  };

  const handleOrderDelivered = async (order) => {
    const result = await Swal.fire({
      title: "Do you Delivered this order?",
      text: "This order will be marked as delivered.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Delivered!",
    });

    if (result.isConfirmed) {
      try {
        const nextStatus =
          order.orderStatus === "Received" ? "Completed" : "Delivered";
        await updateOrderStatus(order.$id, nextStatus);
        Swal.fire(
          "Marked as Delivered!",
          "The order has been delivered.",
          "success"
        );
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to update the order. Please try again.",
          "error"
        );
      }
    }
  };

  const handleOrderCancel = async (order) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be canceled and payment will be refunded to the buyer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel this order!",
    });

    if (result.isConfirmed) {
      try {
        await updateOrderStatus(order.$id, "Canceled");
        Swal.fire(
          "Canceled!",
          "The order has been Canceled. Refund process has been initiated.",
          "success"
        );
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to cancel the order.",
          "error"
        );
      }
    }
  };

  const action = (order) => {
    if (
      order.orderStatus === "In Progress" ||
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Received"
    ) {
      if (order.creatorId === currentUser.$id) {
        if (order.orderStatus === "Delivered") {
          return (
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="text-error text-xs">
                Waiting for the other party to update the order status
              </span>
            </div>
          );
        } else {
          return (
            <div className="flex flex-row gap-2 items-center justify-center">
              <button
                className="btn btn-sm btn-success flex flex-row gap-1 items-center justify-center text-white"
                title="Mark as Order Delivered"
                onClick={() => handleOrderDelivered(order)}
              >
                <FaCircleCheck /> Mark as Delivered
              </button>
              <button
                className="btn btn-sm btn-error flex flex-row gap-1 items-center justify-center text-white"
                title="Cancel Order"
                onClick={() => handleOrderCancel(order)}
              >
                <MdCancel /> Cancel Order
              </button>
            </div>
          );
        }
      } else if (order.receiverId === currentUser.$id) {
        if (order.orderStatus === "Received") {
          return (
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="text-error text-xs">
                Waiting for the other party to update the order status
              </span>
            </div>
          );
        } else {
          return (
            <div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <button
                  className="btn btn-sm btn-success flex flex-row gap-1 items-center justify-center text-white w-2/3"
                  title="Mark as Order Received"
                  onClick={() => handleOrderReceived(order)}
                >
                  <FaCircleCheck /> Order Received
                </button>
                <button
                  className="btn btn-sm btn-error flex flex-row gap-1 items-center justify-center text-white w-1/3"
                  title="If you have not received the order, request a refund"
                  onClick={() => handleOrderNotReceived(order)}
                  disabled={
                    new Date(order.estDelivery) >
                    new Date(new Date().setDate(new Date().getDate() - 14))
                  }
                >
                  <MdCancel /> Request Refund
                </button>
              </div>
              <div className="text-error text-xs">
                Not received the order even after 14 days from estimated
                delivery date, request a refund
              </div>
            </div>
          );
        }
      }
    } else if (order.orderStatus === "Pending") {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            className="btn btn-sm btn-success flex flex-row gap-1 items-center justify-center text-white"
            title="Accept Offer"
            onClick={() => handleAcceptOffer(order)}
          >
            <FaCircleCheck /> Accept
          </button>
          <button
            className="btn btn-sm btn-error flex flex-row gap-1 items-center justify-center text-white"
            title="Accept Offer"
            onClick={() => handleDeclineOffer(order)}
          >
            <MdCancel /> Decline
          </button>
        </div>
      );
      // } else if (
      //   order.orderStatus === "Delivered" ||
      //   order.orderStatus === "Received"
      // ) {
      //   return (
      //     <div className="flex flex-row gap-2 items-center justify-center">
      //       <span className="text-error text-xs">
      //         Waiting for the other party to update the order status
      //       </span>
      //     </div>
      //   );
    } else if (
      order.orderStatus === "Completed" ||
      order.orderStatus === "Canceled"
    ) {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            className="btn btn-xs btn-circle"
            title="Delete Order"
            onClick={() => console.log("Work in progress")}
          >
            <FaTrashAlt />
          </button>
        </div>
      );
    }
  };

  return (
    <Protector>
      <Layout>
        <Section bgColor="base-200">
          <h2 className="text-2xl font-bold w-full text-center my-3">
            My Orders
          </h2>
          <div className="w-full p-5">
            <OrderTable
              orderData={orderData}
              refresh={refresh}
              action={action}
            />
          </div>
        </Section>
      </Layout>
    </Protector>
  );
};

export default MyOrders;
