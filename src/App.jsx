import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NewRequest from "./pages/NewRequest";
import AllRequests from "./pages/AllRequests";
import Instructions from "./pages/Instructions";
import Support from "./pages/Support";
import Fallback from "./pages/Fallback";

function App() {
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
