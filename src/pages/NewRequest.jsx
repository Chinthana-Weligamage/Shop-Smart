import React from "react";
import Layout from "../components/Layout";
import NewRequestForm from "../components/request/NewRequestForm";
import Protector from "../components/Protector";

const NewRequest = () => {
  return (
    <Protector>
      <Layout>
        <NewRequestForm />
      </Layout>
    </Protector>
  );
};

export default NewRequest;
