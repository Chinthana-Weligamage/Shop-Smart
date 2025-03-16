import React, { use, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentLoggedinUser } from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/userSlice";

const Protector = ({ children, roles = ["anyone"] }) => {
  const [currentLoggedinUser, setCurrentLoggedinUser] = useState(
    useSelector((state) => state.user.user) || {}
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLoggedinUser();
      if (response?.$id) {
        setCurrentLoggedinUser(response);
      }
      setIsLoading(false);
    })();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLoggedinUser) {
      dispatch(setToken(currentLoggedinUser));
    }
  }, [currentLoggedinUser, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (roles.includes("anyone")) {
    return children;
  }

  if (!currentLoggedinUser) {
    return <Navigate to="#login" />;
  }

  const userRoles = currentLoggedinUser.roles || [];
  const hasAccess = roles.some((role) => userRoles.includes(role));

  if (!hasAccess) {
    return <p>Access Denied. You do not have the required permissions.</p>;
  }

  return children;
};

export default Protector;
