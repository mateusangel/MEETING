import React from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenForm: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenForm }) => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#07090E] via-[#0E131F] to-[#07090E] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-6 text-[#E5C07B] shadow-xl">
          <Heart className="w-7 h-7 fill-current" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight text-balance leading-tight mb-6">
          Invista no Seu Relacionamento, Fortaleça Sua Família e Viva Esse Momento Especial na Presença de Deus.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          As vagas do 1º Lote no Casarão Terra Santa são estritamente limitadas para garantir o
          conforto e a excelência que o seu casal merece. Não deixe para a última hora.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={onOpenForm}
            className="w-full sm:w-auto px-9 py-4 text-base font-extrabold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-xl transition-all shadow-xl shadow-[#C59F49]/30 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Garantir Minha Vaga no 1º Lote</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <div className="text-xs text-slate-400">
          {EVENT_DETAILS.edition} Encontro de Casais · {EVENT_DETAILS.datesText} · Casarão Terra Santa
        </div>
      </div>
    </section>
  );
};
