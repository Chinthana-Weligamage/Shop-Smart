import React, { useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import RequestCard from "../components/request/RequestCard";

const AllRequests = () => {
  const [activeRequests, setActiveRequests] = useState(
    [...Array(20).keys()].map((i) => i + 1)
  );
  return (
    <Layout>
      <Section>
        <h2 className="text-2xl font-bold w-full text-center">All Requests</h2>
        <div className="grid grid-cols-4 gap-8 p-16">
          {activeRequests.map((request, index) => (
            <RequestCard key={index} request={request} />
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default AllRequests;
