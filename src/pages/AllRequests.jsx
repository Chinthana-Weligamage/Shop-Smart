import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import RequestCard from "../components/request/RequestCard";
import { getAllProductRequests } from "../appwrite/database";
import Loading from "../components/common/Loading";
import Swal from "sweetalert2";

const AllRequests = () => {
  const [allProductRequests, setAllProductRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllProductRequests();
        setAllProductRequests(response);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Swal.fire({
          title: "Error!",
          text: error.message || "An unexpected error occurred.",
          icon: "error",
        });
      }
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Section>
        <h2 className="text-2xl font-bold w-full text-center">All Requests</h2>
        {allProductRequests?.length > 0 ? (
          <div className="grid grid-cols-4 gap-8 p-16">
            {allProductRequests.map((request, index) => (
              <RequestCard key={index} request={request} />
            ))}
          </div>
        ) : (
          <h3 className="p-16 w-full text-center">No requests found</h3>
        )}
      </Section>
    </Layout>
  );
};

export default AllRequests;
