import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import History from "./pages/History";
import ChatButton from "./components/ChatButton";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ChatButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:category" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;