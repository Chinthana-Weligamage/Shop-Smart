import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/landingPage/Hero";
import LatestRequest from "../components/landingPage/ViewLatestRequest";
import ProductSuggest from "../components/landingPage/ProductSuggest";

const LandingPage = () => {
  return (
    <Layout>
      <Hero />
      <ProductSuggest />
      {/* <LatestRequest /> */}
    </Layout>
  );
};

export default LandingPage;
