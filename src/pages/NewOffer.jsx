import React from "react";
import Layout from "../components/Layout";
import NewOfferForm from "../components/offer/NewOfferForm";
import Protector from "../components/Protector";

const NewOffer = () => {
  return (
    <Protector>
      <Layout>
        <NewOfferForm />
      </Layout>
    </Protector>
  );
};

export default NewOffer;
