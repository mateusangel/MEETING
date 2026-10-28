import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutEvent } from './components/AboutEvent';
import { ExperienceHighlights } from './components/ExperienceHighlights';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { PricingSection } from './components/PricingSection';
import { RegistrationForm } from './components/RegistrationForm';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { AdminReceiptsModal } from './components/AdminReceiptsModal';

export default function App() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const scrollToRegistration = () => {
    const el = document.getElementById('inscricao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-body selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Top Header */}
      <Header
        onOpenForm={scrollToRegistration}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenForm={scrollToRegistration}
          onOpenVideo={() => setVideoModalOpen(true)}
        />

        {/* Proof / Trust Strip */}
        <TrustStrip />

        {/* About Event / Purpose ("O Casamento é Como Uma Viagem...") */}
        <AboutEvent onOpenForm={scrollToRegistration} />

        {/* Experience Highlights (Gala Dinner, Worship, Vows) */}
        <ExperienceHighlights onOpenForm={scrollToRegistration} />

        {/* Venue Section (Casarão Terra Santa em Itaboraí) */}
        <VenueSection />

        {/* Real Event Photo Gallery */}
        <GallerySection />

        {/* Pricing / Investment & What is Included */}
        <PricingSection onOpenForm={scrollToRegistration} />

        {/* Full Google Forms Integrated Registration */}
        <RegistrationForm />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Final Call to Action */}
        <FinalCTA onOpenForm={scrollToRegistration} />
      </main>

      {/* Official Footer */}
      <Footer />

      {/* Video Aftermovie Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Admin Registrations & CSV Export Modal */}
      <AdminReceiptsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
