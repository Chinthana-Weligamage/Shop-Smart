import React, { useState, useEffect, use } from "react";
import Protector from "../components/Protector";
import Layout from "../components/Layout";
import OrderTable from "../components/order/OrderTable";
import Section from "../components/Section";
import { getReceivedOffers, updateOfferStatus } from "../appwrite/database";
import Loading from "../components/common/Loading";
import { getCurrentLoggedinUser } from "../appwrite/auth";
import Swal from "sweetalert2";

import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const MyOrders = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [offerData, setOfferData] = useState([]);
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
      fetchOffers(currentUser);
    }
  }, [currentUser]);

  const fetchOffers = async () => {
    if (!currentUser) return;
    try {
      const response = await getReceivedOffers(currentUser?.$id);
      setOfferData(response);
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
    fetchOffers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const refresh = () => {
    fetchOffers();
  };
  const handleAcceptOffer = async (offer) => {
    const result = await Swal.fire({
      title: "Do you want to Accept this offer?",
      text: `You will be charged $${offer.offerPrice} and a service fee of 5% by accepting this offer.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    });

    if (result.isConfirmed) {
      try {
        await updateOfferStatus(offer.$id, "Accepted");
        Swal.fire("Accepted!", "The offer has been accepted.", "success");
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to accept the offer.",
          "error"
        );
      }
    }
  };

  const handleDeclineOffer = async (offer) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to decline this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
    });

    if (result.isConfirmed) {
      try {
        await updateOfferStatus(offer.$id, "Declined");
        Swal.fire("Declined!", "The offer has been declined.", "success");
        refresh();
      } catch (error) {
        Swal.fire(
          "Error!",
          error.message || "Failed to decline the offer.",
          "error"
        );
      }
    }
  };

  const action = (offer) => {
    if (offer.offerStatus === "Accepted") {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="text-error text-xs">
            No action available for accepted offers.
          </span>
        </div>
      );
    } else if (offer.offerStatus === "Declined") {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="text-error text-xs">
            No action available for declined offers.
          </span>
        </div>
      );
    } else if (offer.offerStatus === "Pending") {
      return (
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            className="btn btn-sm btn-success flex flex-row gap-1 items-center justify-center text-white"
            title="Accept Offer"
            onClick={() => handleAcceptOffer(offer)}
          >
            <FaCircleCheck /> Accept
          </button>
          <button
            className="btn btn-sm btn-error flex flex-row gap-1 items-center justify-center text-white"
            title="Accept Offer"
            onClick={() => handleDeclineOffer(offer)}
          >
            <MdCancel /> Decline
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
            Received Offers
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
