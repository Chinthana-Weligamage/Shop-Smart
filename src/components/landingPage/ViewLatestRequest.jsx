import React, { useState } from "react";
import Section from "../Section";
import RequestCard from "../request/RequestCard";

const LatestRequest = () => {
  const [activeRequests, setActiveRequests] = useState(
    [...Array(8).keys()].map((i) => i + 1)
  );
  return (
    <Section>
      <h2 className="text-2xl font-bold w-full text-center">Latest Requests</h2>
      <div className="grid grid-cols-4 gap-8 p-16">
        {activeRequests.map((request, index) => (
          <RequestCard key={index} request={request} />
        ))}
      </div>
    </Section>
  );
};

export default LatestRequest;
