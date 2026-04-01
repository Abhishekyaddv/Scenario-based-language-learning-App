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
import ScenarioSession from "./pages/ScenarioSession"
import { PrivateRoute, OnboardedRoute } from "./components/PrivateRoute";

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>

      {/* ── Public routes ── */}
      <Route path="/"               element={<LandingPage />} />
      <Route path="/register"       element={<AuthPage initialMode="register" />} />
      <Route path="/login"          element={<AuthPage initialMode="login" />} />
      <Route path="/about-me"       element={<AboutMePage />} />
      <Route path="/about-project"  element={<AboutProjectPage />} />

      {/* ── Auth required (onboarding not required) ── */}
      <Route path="/onboarding" element={
        <PrivateRoute><Onboarding /></PrivateRoute>
      } />

      {/* ── Auth + onboarding required ── */}
      <Route path="/journey" element={
        <OnboardedRoute><Journey /></OnboardedRoute>
      } />
      <Route path="/lessons/:chapterId" element={
        <OnboardedRoute><Lessons /></OnboardedRoute>
      } />
      <Route path="/scenario" element={
        <OnboardedRoute><ScenarioPage /></OnboardedRoute>
      } />
      <Route path="/scenario/session" element={
        <OnboardedRoute><ScenarioSession /></OnboardedRoute>
      } />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
