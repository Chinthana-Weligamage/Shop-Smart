import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { getCurrentLoggedinUser } from "../appwrite/auth";

const Layout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrentLoggedinUser();
        if (response?.$id) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={isAuthenticated} />
      {isAuthenticated && <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
