import React, { useState } from 'react';
import { EVENT_DETAILS } from '../data/eventData';
import { MapPin, Phone, Mail, Shield, MessageCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-[#05060A] border-t border-white/10 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Ministry (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/INVA-logo-nova_branca.png"
                alt="Igreja Nova Vida de Alcântara"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <div className="text-sm font-bold text-white tracking-tight">
                  {EVENT_DETAILS.contact.ministry}
                </div>
                <div className="text-xs text-slate-400">
                  {EVENT_DETAILS.contact.church}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Somos um grupo de casais tementes e apaixonados por Deus e pela instituição chamada
              FAMÍLIA. Há anos realizando encontros com excelência, onde os lares são transformados
              pelo amor e pela Palavra de Deus.
            </p>

            <div className="italic text-slate-400 text-xs border-l-2 border-[#D4AF37] pl-3 py-1">
              {EVENT_DETAILS.bibleVerse.text} —{' '}
              <span className="text-[#E5C07B]">{EVENT_DETAILS.bibleVerse.reference}</span>
            </div>
          </div>

          {/* Col 2: Contatos Oficiais (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Canais Oficiais de Atendimento
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#E5C07B] shrink-0 mt-0.5" />
              <span>{EVENT_DETAILS.contact.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-[#E5C07B] shrink-0" />
              <span>Secretaria: {EVENT_DETAILS.contact.phone}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${EVENT_DETAILS.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp Oficial: {EVENT_DETAILS.contact.whatsapp}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-[#E5C07B] shrink-0" />
              <a
                href={`mailto:${EVENT_DETAILS.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {EVENT_DETAILS.contact.email}
              </a>
            </div>
          </div>

          {/* Col 3: Links & Informações Legais (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Informações & Segurança
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#sobre"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  Sobre o Encontro
                </a>
              </li>
              <li>
                <a
                  href="#investimento"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  Benefícios da Vaga
                </a>
              </li>
              <li>
                <a
                  href="#local"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  Casarão Terra Santa (Itaboraí)
                </a>
              </li>
              <li>
                <a
                  href="#inscricao"
                  className="hover:text-[#E5C07B] transition-colors"
                >
                  Ficha de Inscrição Oficial
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-slate-400 hover:text-white underline underline-offset-2 cursor-pointer flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E5C07B]" />
                  <span>Privacidade de Dados (LGPD)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Ministério Famílias Integradas · Igreja Nova Vida de Alcântara. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Edificando lares com amor e fé</span>
            <Heart className="w-3 h-3 text-red-500 fill-current ml-0.5 inline" />
          </div>
        </div>
      </div>

      {/* Privacy modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="bg-[#0F1420] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#E5C07B]" />
              Política de Privacidade e Proteção de Dados
            </h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                Os dados fornecidos no formulário de inscrição do 72º Encontro de Casais
                são coletados exclusivamente para a organização logística, cadastral, pastoral e de
                segurança do evento promovido pelo Ministério Famílias Integradas da Igreja Nova Vida de Alcântara.
              </p>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), seus dados
                não serão vendidos, alugados ou compartilhados com terceiros para fins comerciais.
              </p>
              <p>
                As informações alimentares/dietas são utilizadas para adequação do cardápio das refeições no
                Casarão Terra Santa. Os contatos de emergência e filiação servem para pronto atendimento em
                situações imprevistas.
              </p>
              <p>
                Os pagamentos realizados através da plataforma parceira PagBank ocorrem em ambiente seguro e
                criptografado pela referida instituição financeira.
              </p>
            </div>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="mt-6 w-full py-2.5 bg-[#E5C07B] text-black font-bold text-xs rounded-xl hover:bg-white transition-colors cursor-pointer"
            >
              Entendido e Fechar
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
