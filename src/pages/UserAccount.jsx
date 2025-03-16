import React from "react";
import Protector from "../components/Protector";
import Layout from "../components/Layout";

const UserAccount = () => {
  return (
    <Protector>
      <Layout>
        <div>Account</div>
      </Layout>
    </Protector>
  );
};

export default UserAccount;
