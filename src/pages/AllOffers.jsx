import React, { useState, useEffect } from "react";
import Protector from "../components/Protector";
import Layout from "../components/Layout";
import OffersTable from "../components/offer/OffersTable";
import Section from "../components/Section";
import { getAllOffers } from "../appwrite/database";
import Loading from "../components/common/Loading";

const AllOffers = () => {
  const sampleData = [
    {
      creatorId: "001",
      requestId: "1101",
      offerTitle: "Sample Offer 1",
      offerPrice: 150.0,
      estDelivery: "02-04-2025",
      offerMsg: "This is a sample offer 1",
      condition: "New",
      importCountry: "USA",
      offerImageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
    {
      creatorId: "002",
      requestId: "1102",
      offerTitle: "Sample Offer 2",
      offerPrice: 500.0,
      estDelivery: "02-04-2025",
      offerMsg: "This is a sample offer 2",
      condition: "New",
      importCountry: "China",
      offerImageUrl:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    },
  ];

  const sampleTravellers = [
    {
      id: "001",
      name: "Hart Hagerty",
      imageUrl: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: "002",
      name: "Brice Swyre",
      imageUrl: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      id: "003",
      name: "Yancy Tear",
      imageUrl: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    },
  ];

  const [offerData, setOfferData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOffers = async () => {
    try {
      const response = await getAllOffers();
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
    fetchAllOffers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const refresh = () => {
    fetchAllOffers();
  };

  return (
    <Protector>
      <Layout>
        <Section bgColor="base-200">
          <h2 className="text-2xl font-bold w-full text-center my-3">
            All Offers
          </h2>
          <div className="w-full">
            <OffersTable offerData={offerData} refresh={refresh} />
          </div>
        </Section>
      </Layout>
    </Protector>
  );
};

export default AllOffers;
