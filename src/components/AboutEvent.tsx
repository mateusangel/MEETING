import React from 'react';
import { Heart, Compass, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface AboutEventProps {
  onOpenForm: () => void;
}

export const AboutEvent: React.FC<AboutEventProps> = ({ onOpenForm }) => {
  const pillars = [
    {
      number: '01',
      title: 'Renovação da Aliança Conjugal',
      description:
        'Relembre os votos, olhe nos olhos do seu cônjuge e firme novamente o compromisso sagrado diante do altar do Senhor, com unção e propósito.',
      icon: Heart,
    },
    {
      number: '02',
      title: 'Tempo Exclusivo Sem a Correria da Rotina',
      description:
        'Longe das cobranças do trabalho, do telefone e das obrigações do dia a dia, vocês terão 48 horas inteiramente dedicadas um ao outro.',
      icon: Compass,
    },
    {
      number: '03',
      title: 'Cura Emocional e Quebra de Barreiras',
      description:
        'Ambiente seguro e acolhedor para desarmar mágoas, praticar o perdão genuíno e sarar feridas que foram acumuladas com o tempo.',
      icon: ShieldAlert,
    },
    {
      number: '04',
      title: 'Princípios Bíblicos Práticos para o Lar',
      description:
        'Ensinamentos fundamentados nas Escrituras que trazem direcionamento claro sobre convivência, finanças, criação dos filhos e intimidade.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 relative overflow-hidden bg-[#07090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
            Propósito & Ministério
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance leading-tight mb-6">
            O Casamento é Como Uma Viagem... Toda Rota Precisa de Uma Parada Estratégica.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Ao longo dos anos, o Ministério Famílias Integradas da Igreja Nova Vida de Alcântara
            tem sido um instrumento de Deus para alcançar famílias por um amor sobrenatural.
            Este encontro não é apenas um evento: é um divisor de águas na história do seu casamento.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-12">
          {/* Main Visual Narrative Card */}
          <div className="lg:col-span-5 bg-[#0F1420] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="relative h-64 sm:h-72 overflow-hidden">
              <picture>
                <source srcSet="/assets/opt/31052025-WAG_9395.webp" type="image/webp" />
                <img
                  src="/assets/opt/31052025-WAG_9395.jpg"
                  alt="Casais orando e renovando votos no Encontro"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-[#E5C07B] tracking-wide uppercase">
                  Atmosfera Sobrenatural
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Momentos de Oração e Restauração a Dois
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow">
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                “Por isso, deixa o homem pai e mãe e se une à sua mulher, tornando-se os dois uma só carne.”
                (Gênesis 2:24). Nossa equipe pastoral prepara cada detalhe em oração para que vocês
                vivenciem o sobrenatural de Deus.
              </p>
              <button
                onClick={onOpenForm}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5C07B] hover:text-white group-hover:translate-x-1 transition-all"
              >
                <span>Inscrever meu casal neste encontro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Pillars Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-[#0F1420]/80 border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-slate-600 group-hover:text-[#E5C07B] transition-colors font-mono">
                        {pillar.number}.
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C07B] group-hover:bg-[#D4AF37]/20 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#E5C07B] transition-colors mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight quote banner */}
        <div className="bg-gradient-to-r from-[#141A26] via-[#1A2234] to-[#141A26] border border-[#D4AF37]/25 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-2xl">
          <p className="text-base sm:text-xl text-slate-200 font-medium italic mb-4 leading-relaxed font-display">
            “Não espere uma crise para cuidar do seu casamento. O maior investimento que você pode fazer
            pela sua família é a solidez e a saúde do seu relacionamento conjugal.”
          </p>
          <div className="text-xs font-semibold text-[#E5C07B] tracking-wider uppercase">
            Coordenação Geral do Ministério Famílias Integradas · INVA
          </div>
        </div>
      </div>
    </section>
  );
};
