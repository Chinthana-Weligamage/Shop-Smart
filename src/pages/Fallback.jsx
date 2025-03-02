import React from "react";
import Layout from "../components/Layout";

const Fallback = () => {
  return (
    <Layout>
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mt-40 m-5">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <button
          className="btn btn-primary mt-10"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home Page
        </button>
      </div>
    </Layout>
  );
};

export default Fallback;
