import React from "react";
import { landingStyle } from "../components/landing/LandingStyles";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import LanguageMarquee from "../components/landing/LanguageMarquee";
import FeaturesSection from "../components/landing/FeaturesSection";
import ScenariosSection from "../components/landing/ScenariosSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import StatsSection from "../components/landing/StatsSection";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

export default function LingoAILanding() {
  return (
    <>
      <style>{landingStyle}</style>
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <LandingNavbar />
        <HeroSection />
        <LanguageMarquee />
        <FeaturesSection />
        <ScenariosSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
        <LandingFooter />
      </div>
    </>
  );
}
