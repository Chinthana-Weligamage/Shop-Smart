import React from "react";
import Layout from "../components/Layout";
import Protector from "../components/Protector";
import NewOrderForm from "../components/order/NewOrderForm";

const NewOrder = () => {
  return (
    <Protector>
      <Layout>
        <NewOrderForm />
      </Layout>
    </Protector>
  );
};

export default NewOrder;
