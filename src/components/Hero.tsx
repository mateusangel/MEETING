import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { Calendar, MapPin, Sparkles, Play, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenForm: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm, onOpenVideo }) => {
  // Target event date: 2027-05-01 08:00
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(EVENT_DETAILS.datesISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Urgency Progress Bar (Cloning Reference Style) */}
        <div className="max-w-2xl mx-auto mb-8 bg-[#10141D] border border-[#D4AF37]/30 rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E5C07B]" />
              Inscrições Abertas · 1º Lote
            </span>
            <span className="text-[#E5C07B] font-mono tabular-nums">90% das vagas preenchidas</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-[#C59F49] via-[#E5C07B] to-[#F3E5AB] h-full rounded-full transition-all duration-1000 shadow-sm shadow-[#D4AF37]/50"
              style={{ width: '90%' }}
            />
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 mt-2">
            Garanta sua estadia no Casarão Terra Santa antes da virada de lote.
          </p>
        </div>

        {/* Two-column Hero Split (1440px desktop balanced) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Ministry Wordmark & Heraldic Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <img
                src="/assets/Brasao-familia-blank.png"
                alt="Brasão Famílias Integradas"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E5C07B]">
                {EVENT_DETAILS.edition} Encontro de Casais · {EVENT_DETAILS.contact.church}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white leading-[1.15] tracking-tight font-display text-balance mb-5">
              O Casamento é uma Aliança Eterna: Dois Dias Para{' '}
              <span className="gold-gradient-text">Renovar Seu Amor</span> e Fortalecer Sua Família.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-light">
              Uma pausa necessária para o casal se desconectar do barulho e se reconectar com Deus e
              um com o outro. Ministrações inspiradoras, jantar romântico exclusivo e momentos de
              comunhão inesquecíveis no aconchegante Casarão Terra Santa.
            </p>

            {/* Event Key Facts Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="bg-[#10141D] border border-white/10 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#E5C07B]" />
                  <span>Data Confirmada</span>
                </div>
                <div className="text-sm font-semibold text-white">01 e 02 de Maio de 2027</div>
              </div>

              <div className="bg-[#10141D] border border-white/10 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C07B]" />
                  <span>Localização</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">Casarão Terra Santa</div>
                <div className="text-[11px] text-slate-400">Itaboraí / RJ</div>
              </div>

              <div className="bg-[#10141D] border border-[#D4AF37]/30 rounded-xl p-3.5">
                <div className="flex items-center gap-2 text-xs text-[#E5C07B] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5C07B]" />
                  <span>1º Lote Casal</span>
                </div>
                <div className="text-base font-bold text-white font-mono tabular-nums">
                  R$ 990,00
                </div>
                <div className="text-[11px] text-slate-400">Até 12x no cartão</div>
              </div>
            </div>

            {/* CTA Action Block */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={onOpenForm}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-xl transition-all duration-200 shadow-xl shadow-[#C59F49]/25 hover:shadow-2xl hover:shadow-[#C59F49]/40 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Garantir Vaga do Casal</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/15 hover:border-white/30 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center group-hover:bg-[#D4AF37]/30 transition-colors">
                  <Play className="w-3.5 h-3.5 text-[#E5C07B] fill-current ml-0.5" />
                </div>
                <span>Assistir Aftermovie</span>
              </button>
            </div>

            {/* Trust Quote */}
            <p className="text-xs text-slate-400 italic">
              {EVENT_DETAILS.bibleVerse.text} —{' '}
              <span className="text-[#E5C07B] font-semibold">
                {EVENT_DETAILS.bibleVerse.reference}
              </span>
            </p>
          </div>

          {/* Right Column: Hero Visual & Countdown */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Visual Frame */}
            <div className="relative w-full max-w-md lg:max-w-none group">
              {/* Outer decorative golden border frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#C59F49]/40 via-transparent to-[#E5C07B]/40 rounded-2xl blur-sm transition-all duration-500 group-hover:blur-md" />

              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0D1117] shadow-2xl">
                <picture>
                  <source srcSet="/assets/opt/31052025-WAG_8925.webp" type="image/webp" />
                  <img
                    src="/assets/opt/31052025-WAG_8925.jpg"
                    alt="Casal participando do Encontro de Casais INVA"
                    className="w-full h-[380px] sm:h-[420px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </picture>

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Overlaid Event Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Edição Especial 2027
                  </span>
                </div>

                {/* Play Button Overlay */}
                <button
                  onClick={onOpenVideo}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-[#C59F49] text-white hover:text-black border border-white/30 hover:border-transparent flex items-center justify-center backdrop-blur-sm transition-all duration-300 transform group-hover:scale-110 shadow-2xl cursor-pointer"
                  aria-label="Assistir ao vídeo do encontro"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>

                {/* Bottom Overlay Card info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-left">
                  <div className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-0.5">
                    Casarão Terra Santa · Itaboraí
                  </div>
                  <div className="text-sm font-bold text-white">
                    Uma imersão completa para celebrar o amor da sua vida
                  </div>
                </div>
              </div>
            </div>

            {/* Tabular Countdown Timer */}
            <div className="w-full max-w-md lg:max-w-none mt-6 bg-[#0E121A] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]" />
                Tempo Restante Para o Encontro
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C07B]" />
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#141A24] border border-white/5 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Dias
                  </div>
                </div>

                <div className="bg-[#141A24] border border-white/5 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Horas
                  </div>
                </div>

                <div className="bg-[#141A24] border border-white/5 rounded-xl py-2 px-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Minutos
                  </div>
                </div>

                <div className="bg-[#141A24] border border-[#D4AF37]/30 rounded-xl py-2 px-1 bg-gradient-to-b from-[#141A24] to-[#1E170A]">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#E5C07B] font-mono tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-[#E5C07B] uppercase tracking-wider mt-0.5">
                    Segundos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
