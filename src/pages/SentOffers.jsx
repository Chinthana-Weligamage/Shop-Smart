import React, { useState, useEffect, use } from "react";
import Protector from "../components/Protector";
import Layout from "../components/Layout";
import OffersTable from "../components/offer/OffersTable";
import Section from "../components/Section";
import { getSentOffers } from "../appwrite/database";
import Loading from "../components/common/Loading";
import { getCurrentLoggedinUser } from "../appwrite/auth";

import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const SentOffers = () => {
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
    try {
      const response = await getSentOffers(currentUser.$id);
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

  const action = (offer) => {
    return (
      <div className="flex flex-row gap-2 items-center justify-center">
        <button className="btn btn-xs btn-circle" title="Edit Offer">
          <FaEdit />
        </button>
        <button className="btn btn-xs btn-circle" title="delete Offer">
          <FaTrashAlt />
        </button>
      </div>
    );
  };

  return (
    <Protector>
      <Layout>
        <Section bgColor="base-200">
          <h2 className="text-2xl font-bold w-full text-center my-3">
            Sent Offers
          </h2>
          <div className="w-full p-5">
            <OffersTable
              offerData={offerData}
              refresh={refresh}
              action={action}
            />
          </div>
        </Section>
      </Layout>
    </Protector>
  );
};

export default SentOffers;
