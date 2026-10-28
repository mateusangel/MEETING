import React from 'react';
import { Utensils, Flame, Sparkles, Bed, HeartHandshake, FileText } from 'lucide-react';

interface ExperienceHighlightsProps {
  onOpenForm: () => void;
}

export const ExperienceHighlights: React.FC<ExperienceHighlightsProps> = ({ onOpenForm }) => {
  const experiences = [
    {
      icon: Utensils,
      title: 'Jantar Romântico de Gala',
      description:
        'Uma noite memorável com música ao vivo, ambientação à luz de velas e um cardápio refinado para você se conectar com o seu par.',
      tag: 'Momento Especial',
    },
    {
      icon: Flame,
      title: 'Ministrações de Alto Impacto',
      description:
        'Palavras ungidas e direcionadas aos desafios reais que os casais enfrentam nos tempos modernos, gerando clareza e autoridade espiritual.',
      tag: 'Edificação Espiritual',
    },
    {
      icon: Bed,
      title: 'Hospedagem Confortável Inclusa',
      description:
        'Suítes acolhedoras no Casarão Terra Santa, proporcionando descanso e privacidade para o casal renovar as energias.',
      tag: 'Conforto & Paz',
    },
    {
      icon: HeartHandshake,
      title: 'Dinâmicas e Oração Pastoral',
      description:
        'Momentos direcionados para diálogo, quebra de rotina e imposição de mãos de pastores comprometidos com a saúde do seu lar.',
      tag: 'Cuidado Pastoral',
    },
    {
      icon: Sparkles,
      title: 'Gastronomia Completa',
      description:
        'Café da manhã colonial, almoço com sabor caseiro de alto padrão e coffee breaks planejados com excelência durante todo o retiro.',
      tag: 'Tudo Incluso',
    },
    {
      icon: FileText,
      title: 'Kit Exclusivo do Casal',
      description:
        'Materiais impressos de acompanhamento, brindes personalizados e recordações para levar para casa e continuar aplicando no dia a dia.',
      tag: 'Material de Apoio',
    },
  ];

  return (
    <section id="experiencia" className="py-20 lg:py-28 bg-[#090C12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
            A Experiência Completa
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-6">
            Dois Dias Que Ficarão Gravados Para Sempre no Seu Casamento
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Cuidamos de tudo para que a única preocupação do casal seja viver cada segundo dessa
            imersão de restauração, descanso e celebração do amor.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="bg-[#0F1420] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C07B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                      {exp.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C07B] transition-colors mb-2.5">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real photo feature banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <picture>
            <source srcSet="/assets/opt/31052025-WAG_8974.webp" type="image/webp" />
            <img
              src="/assets/opt/31052025-WAG_8974.jpg"
              alt="Jantar de Gala no Encontro de Casais"
              className="w-full h-80 sm:h-96 md:h-[450px] object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-center">
            <div className="max-w-xl p-6 sm:p-10 lg:p-12 text-left">
              <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-widest bg-black/60 px-3 py-1 rounded-md border border-[#D4AF37]/30 inline-block mb-3">
                Noite dos Namorados
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display mb-4 leading-tight">
                Um Jantar Inesquecível Preparado com Todo o Amor e Requinte
              </h3>
              <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed">
                Você e seu cônjuge vivendo um momento íntimo que renova a cumplicidade e o romantismo,
                criando memórias que vocês guardarão para sempre.
              </p>
              <button
                onClick={onOpenForm}
                className="px-6 py-3.5 text-sm font-bold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-xl transition-all shadow-lg shadow-[#D4AF37]/20 active:scale-95 cursor-pointer"
              >
                Garantir Nossas Vagas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
