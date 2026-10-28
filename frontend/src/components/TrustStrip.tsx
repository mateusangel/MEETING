import React from 'react';
import { Award, HeartHandshake, Sparkles, BookOpen } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '72 Edições',
      label: 'Tradição e excelência ministerial',
      description: 'Uma história contínua de vidas e casamentos transformados pela fé.',
    },
    {
      icon: HeartHandshake,
      value: '+2.000',
      label: 'Casais e lares edificados',
      description: 'Famílias inteiras restauradas que dão testemunho de amor renovado.',
    },
    {
      icon: Sparkles,
      value: '48 Horas',
      label: 'Imersão presencial completa',
      description: 'Hospedagem, alimentação de excelência e ministrações exclusivas.',
    },
    {
      icon: BookOpen,
      value: '100% Bíblico',
      label: 'Fundamentado nas Escrituras',
      description: 'Princípios práticos e profundos ensinados com amor pastoral.',
    },
  ];

  return (
    <section className="border-y border-white/10 bg-[#0A0D14]/80 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0F141F]/60 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#E5C07B]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mt-0.5">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
