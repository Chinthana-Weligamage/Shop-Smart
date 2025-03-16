import React, { useEffect, useState } from "react";
import { getCurrentLoggedinUser } from "../appwrite/auth";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import Loading from "./common/Loading";

const Protector = ({ children }) => {
  const userToken = useSelector((state) => state.user.userToken);
  const [currentLoggedinUser, setCurrentLoggedinUser] = useState(
    userToken || {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrentLoggedinUser();
        if (response?.$id) {
          setCurrentLoggedinUser(response);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      Swal.fire({
        title: "You are not logged in!",
        text: "You must be logged in to continue Shopping Smart.",
        icon: "info",
      }).then(() => {
        window.location.hash = "#login"; // Opens #login section
      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  console.log("Access Granted. User ID:", currentLoggedinUser.$id);
  return children;
};

export default Protector;
