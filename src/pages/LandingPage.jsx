import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/landingPage/Hero";
import LatestRequest from "../components/landingPage/ViewLatestRequest";

const LandingPage = () => {
  return (
    <Layout>
      <Hero />
      <LatestRequest />
    </Layout>
  );
};

export default LandingPage;
