import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewRequest from "./pages/NewRequest";
import AllRequests from "./pages/AllRequests";
import Instructions from "./pages/Instructions";
import Support from "./pages/Support";
import Fallback from "./pages/Fallback";
import { getCurrentLoggedinUser } from "./appwrite/auth";

function App() {
  const [currentLoggedinUser, setCurrentLoggedinUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLoggedinUser();
      if (!response.$id) {
        setCurrentLoggedinUser(null);
        return;
      }
      setCurrentLoggedinUser(response);
    })();
  }, []);

  useEffect(() => {
    if (currentLoggedinUser) {
      console.log(currentLoggedinUser);
    } else {
    }
  }, [currentLoggedinUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/new-request" element={<NewRequest />} />
        <Route path="/all-requests" element={<AllRequests />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/support" element={<Support />} />

        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
