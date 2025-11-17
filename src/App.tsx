import { Hero } from "./components/Hero";
import { AboutInnovation } from "./components/AboutInnovation";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { DemoRecommendation } from "./components/DemoRecommendation";
import { AIIntegration } from "./components/AIIntegration";
import { Team } from "./components/Team";
import { Impact } from "./components/Impact";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AboutInnovation />
      <Features />
      <HowItWorks />
      <DemoRecommendation />
      <AIIntegration />
      <Team />
      <Impact />
      <CallToAction />
      <Footer />
    </div>
  );
}
