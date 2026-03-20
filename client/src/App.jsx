import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage'
import AboutMePage from './pages/AboutMePage'
import AboutProjectPage from './pages/AboutProjectPage'
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Journey from "./pages/Journey";

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/about-project" element={<AboutProjectPage />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/journey" element={<Journey />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
