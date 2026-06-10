"use client";

import { useState } from "react";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Cases from "@/components/sections/Cases";
import Portafolio from "@/components/sections/Portafolio";
import Framework from "@/components/sections/Framework";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import LeadFormModal from "@/components/modals/LeadFormModal";

export default function LandingClient() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const openLeadForm = () => setShowLeadForm(true);
  const closeLeadForm = () => setShowLeadForm(false);

  return (
    <div className="min-h-screen bg-white text-ink-600 selection:bg-primary/10 font-sans antialiased">
      <Nav onLeadClick={openLeadForm} />
      <Hero onLeadClick={openLeadForm} />
      <Cases onLeadClick={openLeadForm} />
      <Portafolio onLeadClick={openLeadForm} />
      <Framework onLeadClick={openLeadForm} />
      <FAQ />
      <Footer onLeadClick={openLeadForm} />

      <LeadFormModal isOpen={showLeadForm} onClose={closeLeadForm} />
    </div>
  );
}
