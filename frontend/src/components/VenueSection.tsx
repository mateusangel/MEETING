import React from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { MapPin, Trees, Sun, Navigation, CheckCircle } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const highlights = [
    'Refúgio privativo e tranquilo, totalmente cercado pela natureza',
    'Suítes confortáveis preparadas especialmente para acolher os casais',
    'Salão climatizado para ministrações com estrutura multimídia de ponta',
    'Áreas externas arborizadas ideais para caminhadas e conversas a dois',
    'Gastronomia acolhedora servida em espaço amplo e ventilado',
    'Localização estratégica em Itaboraí, a curta distância de São Gonçalo e Niterói',
  ];

  return (
    <section id="local" className="py-20 lg:py-28 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Venue Description */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5" />
              O Local do Encontro
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-6">
              {EVENT_DETAILS.venueName} <span className="gold-gradient-text">em Itaboraí / RJ</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6 font-light">
              Escolhido a dedo pelo Ministério Famílias Integradas, o Casarão Terra Santa oferece
              o equilíbrio perfeito entre paz, beleza natural e conforto para que você e seu
              cônjuge vivenciem dias de profunda comunhão e renovação.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#E5C07B] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Casarão+Terra+Santa+Itaboraí+RJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-white/15 hover:border-[#D4AF37]/40 rounded-xl transition-all"
              >
                <Navigation className="w-4 h-4 text-[#E5C07B]" />
                <span>Ver Rota no Google Maps</span>
              </a>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#E5C07B]" />
                <span>Estrutura completa com segurança e estacionamento</span>
              </div>
            </div>
          </div>

          {/* Right Column: Venue Image Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                <picture>
                  <source srcSet="/assets/opt/DSCF5987.webp" type="image/webp" />
                  <img
                    src="/assets/opt/DSCF5987.jpg"
                    alt="Ambiente natural e verde no Casarão Terra Santa"
                    className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Área Verde e Jardins</span>
                </div>
              </div>

              <div className="bg-[#10141E] border border-white/10 rounded-2xl p-5 text-center">
                <Trees className="w-8 h-8 text-[#E5C07B] mx-auto mb-2" />
                <div className="text-base font-bold text-white font-mono">Ar Puro & Paz</div>
                <div className="text-xs text-slate-400 mt-1">
                  Desconecte-se da rotina urbana
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="bg-[#10141E] border border-[#D4AF37]/30 rounded-2xl p-5 text-center">
                <div className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider mb-1">
                  Dias Confirmados
                </div>
                <div className="text-lg font-extrabold text-white font-display">
                  01 e 02 de Maio
                </div>
                <div className="text-xs text-slate-400 mt-1">2027 · Final de semana</div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                <picture>
                  <source srcSet="/assets/opt/DSCF5948.webp" type="image/webp" />
                  <img
                    src="/assets/opt/DSCF5948.jpg"
                    alt="Instalações e acomodações do evento"
                    className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-semibold text-white">Acomodações e Conforto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
