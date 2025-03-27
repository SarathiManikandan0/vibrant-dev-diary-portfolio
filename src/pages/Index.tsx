
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Social } from "../components/Social";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Freelancing } from "../components/Freelancing";
import { Services } from "../components/Services";
import { Team } from "../components/Team";
import { Reviews } from "../components/Reviews";

const Index = () => {
  useEffect(() => {
    // Scroll to section if hash is present in URL
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Team />
        <Reviews />
        <Freelancing />
        <Social />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
