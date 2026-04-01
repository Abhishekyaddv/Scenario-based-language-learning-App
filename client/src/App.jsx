import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage'
import AboutMePage from './pages/AboutMePage'
import AboutProjectPage from './pages/AboutProjectPage'
import Onboarding from "./pages/Onboarding";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Journey from "./pages/Journey";
import Lessons from "./pages/Lessons";
import ScenarioPage from "./pages/ScenarioPage";

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<AuthPage initialMode="register" />} />
      <Route path="/login" element={<AuthPage initialMode="login" />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/about-project" element={<AboutProjectPage />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/lessons/:chapterId" element={<Lessons />} />
      <Route path="/scenario" element={<ScenarioPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
