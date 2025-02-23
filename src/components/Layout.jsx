import React from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
