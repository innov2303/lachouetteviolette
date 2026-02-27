import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AvailabilityBanner from "@/components/layout/AvailabilityBanner";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Project from "@/components/sections/Project";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AvailabilityBanner />
      <main>
        <Hero />
        <Gallery />
        <Team />
        <Project />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
