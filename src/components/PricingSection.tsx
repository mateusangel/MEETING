import React from 'react';
import { WHAT_IS_INCLUDED } from '../data/eventData';
import { Check, Sparkles, ArrowRight, ShieldCheck, LockKeyhole } from 'lucide-react';

interface PricingSectionProps {
  onOpenForm: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenForm }) => {
  return (
    <section id="investimento" className="py-20 lg:py-28 bg-[#07090E] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            O Que a Sua Vaga Garante
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-6">
            O Maior Presente Que Vocês Podem Dar Para a Sua Família
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Transparência e excelência: tudo o que você e seu cônjuge precisam para viver dois dias
            inesquecíveis já está contemplado no pacote do casal.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#141A28] to-[#0D111A] border-2 border-[#D4AF37]/40 p-7 sm:p-10 shadow-2xl overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#C59F49] to-[#E5C07B] text-black text-xs font-extrabold tracking-wider uppercase py-1.5 px-6 rounded-bl-2xl shadow-md">
              1º Lote Exclusivo
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
              {/* Left block without price */}
              <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                <span className="text-xs font-semibold text-[#E5C07B] uppercase tracking-widest block mb-1">
                  Pacote Completo
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                  Vaga para o Casal
                </div>
                <div className="text-xs text-slate-300 font-medium mt-2">
                  Facilidade de Pagamento
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Parcelado em até 12x no cartão
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center md:justify-start gap-2 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Vagas Limitadas por Lote</span>
                </div>
              </div>

              {/* Right explanation */}
              <div className="md:col-span-7">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E5C07B]" />
                  Experiência All-Inclusive no Casarão
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sem custos adicionais durante o evento. Sua inscrição inclui hospedagem em suíte
                  privativa no Casarão Terra Santa, alimentação completa, o Jantar Romântico de Gala e
                  todas as ministrações da equipe pastoral.
                </p>
              </div>
            </div>

            {/* Inclusions Checklist */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider mb-4">
                Tudo o que está incluído na vaga do casal:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {WHAT_IS_INCLUDED.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step info before release */}
            <div className="bg-[#090C12] border border-[#D4AF37]/30 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#E5C07B] flex items-center justify-center shrink-0 mt-0.5">
                <LockKeyhole className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold mb-0.5">
                  Liberação Imediata do Link de Pagamento:
                </strong>
                <span className="text-slate-300">
                  Preencha a ficha de inscrição abaixo com as informações do casal. Assim que concluir o
                  envio, o link oficial para efetuar o pagamento via PagBank (à vista ou em até 12x) será
                  liberado automaticamente na tela.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div>
              <button
                onClick={onOpenForm}
                className="w-full py-4 px-6 text-sm sm:text-base font-extrabold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-xl transition-all shadow-xl shadow-[#C59F49]/25 hover:shadow-2xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Preencher Inscrição Para Liberar o Pagamento</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
