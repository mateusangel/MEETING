import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenForm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O Encontro', href: '#sobre' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'O Local', href: '#local' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Benefícios', href: '#investimento' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  return (
    <>
      {/* Top urgency ticker banner */}
      <div className="bg-[#131722] border-b border-[#D4AF37]/20 text-xs py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-300">
          <span className="font-semibold text-[#E5C07B] tracking-wide">
            {EVENT_DETAILS.edition} ENCONTRO DE CASAIS
          </span>
          <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span>01 e 02 de Maio de 2027</span>
          <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-emerald-400 font-medium">1º Lote Aberto com Vagas Limitadas</span>
          <button
            onClick={onOpenForm}
            className="text-[#E5C07B] hover:text-white underline underline-offset-2 font-medium cursor-pointer ml-1 inline-flex items-center gap-1"
          >
            Garantir vaga <ArrowRight className="w-3 h-3 inline" />
          </button>
        </div>
      </div>

      {/* Main Header complying with Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07090E]/95 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40 py-3'
            : 'bg-[#07090E]/70 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Official Logo */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
          >
            <img
              src="/assets/INVA-logo-nova_branca.png"
              alt="Logo Igreja Nova Vida Alcântara"
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#E5C07B] transition-colors leading-tight">
                Famílias Integradas
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Igreja Nova Vida de Alcântara
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#E5C07B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenForm}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-lg transition-all duration-200 shadow-md shadow-[#C59F49]/20 hover:shadow-lg hover:shadow-[#C59F49]/30 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Inscreva-se Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1117] border-b border-white/10 px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#E5C07B] hover:bg-white/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenForm();
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] rounded-lg shadow-md cursor-pointer"
                >
                  Garantir Vaga no Encontro
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
