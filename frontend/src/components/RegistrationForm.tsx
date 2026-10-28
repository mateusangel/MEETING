import React, { useState } from 'react';
import { EVENT_DETAILS, GOOGLE_FORM_ENTRIES } from '../data/eventData';
import { RegistrationFormData, StoredRegistration } from '../types';
import {
  CheckCircle2,
  AlertCircle,
  Users,
  Baby,
  Phone,
  Church,
  HeartHandshake,
  FileCheck,
  Send,
  Loader2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Share2,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

interface RegistrationFormProps {
  onSuccess?: (registration: StoredRegistration) => void;
}

const INITIAL_FORM: RegistrationFormData = {
  maridoNome: '',
  esposaNome: '',
  maridoNascimento: '',
  esposaNascimento: '',
  endereco: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: 'RJ',
  estadoCivil: 'CASADOS',
  dataCasamento: '',
  grupoDeVida: 'SIM',
  liderGVC: '',
  telefoneLiderGVC: '',

  temFilhos: 'NÃO',
  quantosFilhos: '',
  filho1: '',
  filho2: '',
  filho3: '',

  maridoCelular: '',
  esposaCelular: '',
  maridoEmail: '',
  esposaEmail: '',
  maridoRedeSocial: '',
  esposaRedeSocial: '',

  maridoProfissao: '',
  maridoMembroIgreja: 'SIM',
  maridoQualIgreja: 'Igreja Nova Vida de Alcântara',
  maridoAfastado: 'NÃO',
  maridoDieta: '',

  esposaProfissao: '',
  esposaMembroIgreja: 'SIM',
  esposaQualIgreja: 'Igreja Nova Vida de Alcântara',
  esposaAfastada: 'NÃO',
  esposaDieta: '',

  maridoPaiNome: '',
  maridoMaeNome: '',
  maridoPaisTelefones: '',

  esposaPaiNome: '',
  esposaMaeNome: '',
  esposaPaisTelefones: '',

  visitaDiaSemana: '',
  visitaHorario: '',

  comoSoube: 'IGREJA',
  amigoNome: '',
  amigoTelefone: '',

  termoAceito: true,
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<StoredRegistration | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState<boolean>(false);

  const steps = [
    { number: 1, title: 'Casal', icon: Users, short: 'Dados Básicos' },
    { number: 2, title: 'Filhos', icon: Baby, short: 'Família' },
    { number: 3, title: 'Contatos', icon: Phone, short: 'Telefones & Redes' },
    { number: 4, title: 'Igreja & Saúde', icon: Church, short: 'Profissão & Dieta' },
    { number: 5, title: 'Filiação', icon: HeartHandshake, short: 'Pais & Visita' },
    { number: 6, title: 'Confirmação', icon: FileCheck, short: 'Finalização' },
  ];

  const handleInputChange = (field: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.maridoNome.trim()) errs.maridoNome = 'Informe o nome completo do marido';
      if (!formData.esposaNome.trim()) errs.esposaNome = 'Informe o nome completo da esposa';
      if (!formData.maridoNascimento) errs.maridoNascimento = 'Informe a data de nascimento';
      if (!formData.esposaNascimento) errs.esposaNascimento = 'Informe a data de nascimento';
      if (!formData.endereco.trim()) errs.endereco = 'Informe o endereço';
      if (!formData.numero.trim()) errs.numero = 'Informe o número';
      if (!formData.bairro.trim()) errs.bairro = 'Informe o bairro';
      if (!formData.cidade.trim()) errs.cidade = 'Informe a cidade';
      if (!formData.estado.trim()) errs.estado = 'Informe o estado';
      if (!formData.dataCasamento) errs.dataCasamento = 'Informe a data do casamento';
    }

    if (step === 3) {
      if (!formData.maridoCelular.trim()) errs.maridoCelular = 'Informe o celular do marido';
      if (!formData.esposaCelular.trim()) errs.esposaCelular = 'Informe o celular da esposa';
    }

    if (step === 4) {
      if (!formData.maridoProfissao.trim()) errs.maridoProfissao = 'Informe a profissão do marido';
      if (!formData.esposaProfissao.trim()) errs.esposaProfissao = 'Informe a profissão da esposa';
      if (!formData.maridoQualIgreja.trim()) errs.maridoQualIgreja = 'Informe a igreja do marido';
      if (!formData.esposaQualIgreja.trim()) errs.esposaQualIgreja = 'Informe a igreja da esposa';
    }

    if (step === 6) {
      if (!formData.termoAceito) {
        errs.termoAceito = 'Você precisa confirmar a inscrição para prosseguir';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(6, prev + 1));
      // Scroll to top of form section smoothly
      const el = document.getElementById('inscricao');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    const el = document.getElementById('inscricao');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);

    const voucherCode = `INVA72-${Math.floor(100000 + Math.random() * 900000)}`;

    // Prepare Google Form submission payload
    const formParams = new URLSearchParams();

    // Map all fields to entry IDs
    formParams.append(GOOGLE_FORM_ENTRIES.maridoNome, formData.maridoNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.esposaNome, formData.esposaNome.toUpperCase());

    // Date entries
    if (formData.maridoNascimento) {
      formParams.append(GOOGLE_FORM_ENTRIES.maridoNascimento, formData.maridoNascimento);
      const [y, m, d] = formData.maridoNascimento.split('-');
      formParams.append(`${GOOGLE_FORM_ENTRIES.maridoNascimento}_year`, y);
      formParams.append(`${GOOGLE_FORM_ENTRIES.maridoNascimento}_month`, m);
      formParams.append(`${GOOGLE_FORM_ENTRIES.maridoNascimento}_day`, d);
    }

    if (formData.esposaNascimento) {
      formParams.append(GOOGLE_FORM_ENTRIES.esposaNascimento, formData.esposaNascimento);
      const [y, m, d] = formData.esposaNascimento.split('-');
      formParams.append(`${GOOGLE_FORM_ENTRIES.esposaNascimento}_year`, y);
      formParams.append(`${GOOGLE_FORM_ENTRIES.esposaNascimento}_month`, m);
      formParams.append(`${GOOGLE_FORM_ENTRIES.esposaNascimento}_day`, d);
    }

    formParams.append(GOOGLE_FORM_ENTRIES.endereco, formData.endereco.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.numero, formData.numero.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.bairro, formData.bairro.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.cidade, formData.cidade.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.estado, formData.estado.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.estadoCivil, formData.estadoCivil);

    if (formData.dataCasamento) {
      formParams.append(GOOGLE_FORM_ENTRIES.dataCasamento, formData.dataCasamento);
      const [y, m, d] = formData.dataCasamento.split('-');
      formParams.append(`${GOOGLE_FORM_ENTRIES.dataCasamento}_year`, y);
      formParams.append(`${GOOGLE_FORM_ENTRIES.dataCasamento}_month`, m);
      formParams.append(`${GOOGLE_FORM_ENTRIES.dataCasamento}_day`, d);
    }

    formParams.append(GOOGLE_FORM_ENTRIES.grupoDeVida, formData.grupoDeVida);
    formParams.append(GOOGLE_FORM_ENTRIES.liderGVC, formData.liderGVC.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.telefoneLiderGVC, formData.telefoneLiderGVC);

    formParams.append(GOOGLE_FORM_ENTRIES.temFilhos, formData.temFilhos);
    formParams.append(GOOGLE_FORM_ENTRIES.quantosFilhos, formData.quantosFilhos);
    formParams.append(GOOGLE_FORM_ENTRIES.filho1, formData.filho1.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.filho2, formData.filho2.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.filho3, formData.filho3.toUpperCase());

    formParams.append(GOOGLE_FORM_ENTRIES.maridoCelular, formData.maridoCelular);
    formParams.append(GOOGLE_FORM_ENTRIES.esposaCelular, formData.esposaCelular);
    formParams.append(GOOGLE_FORM_ENTRIES.maridoEmail, formData.maridoEmail);
    formParams.append(GOOGLE_FORM_ENTRIES.esposaEmail, formData.esposaEmail);
    formParams.append(GOOGLE_FORM_ENTRIES.maridoRedeSocial, formData.maridoRedeSocial);
    formParams.append(GOOGLE_FORM_ENTRIES.esposaRedeSocial, formData.esposaRedeSocial);

    formParams.append(GOOGLE_FORM_ENTRIES.maridoProfissao, formData.maridoProfissao.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.maridoMembroIgreja, formData.maridoMembroIgreja);
    formParams.append(GOOGLE_FORM_ENTRIES.maridoQualIgreja, formData.maridoQualIgreja.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.maridoAfastado, formData.maridoAfastado);
    formParams.append(GOOGLE_FORM_ENTRIES.maridoDieta, formData.maridoDieta.toUpperCase());

    formParams.append(GOOGLE_FORM_ENTRIES.esposaProfissao, formData.esposaProfissao.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.esposaMembroIgreja, formData.esposaMembroIgreja);
    formParams.append(GOOGLE_FORM_ENTRIES.esposaQualIgreja, formData.esposaQualIgreja.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.esposaAfastada, formData.esposaAfastada);
    formParams.append(GOOGLE_FORM_ENTRIES.esposaDieta, formData.esposaDieta.toUpperCase());

    formParams.append(GOOGLE_FORM_ENTRIES.maridoPaiNome, formData.maridoPaiNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.maridoMaeNome, formData.maridoMaeNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.maridoPaisTelefones, formData.maridoPaisTelefones);

    formParams.append(GOOGLE_FORM_ENTRIES.esposaPaiNome, formData.esposaPaiNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.esposaMaeNome, formData.esposaMaeNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.esposaPaisTelefones, formData.esposaPaisTelefones);

    formParams.append(GOOGLE_FORM_ENTRIES.visitaDiaSemana, formData.visitaDiaSemana.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.visitaHorario, formData.visitaHorario);

    formParams.append(GOOGLE_FORM_ENTRIES.comoSoube, formData.comoSoube);
    formParams.append(GOOGLE_FORM_ENTRIES.amigoNome, formData.amigoNome.toUpperCase());
    formParams.append(GOOGLE_FORM_ENTRIES.amigoTelefone, formData.amigoTelefone);

    formParams.append(GOOGLE_FORM_ENTRIES.finalizarInscricao, 'FINALIZAR INSCRIÇÃO');

    let syncSuccess = false;

    // 1. Submit to Fastify / Prisma / Supabase Backend API
    try {
      await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          maridoNome: formData.maridoNome,
          maridoNascimento: formData.maridoNascimento,
          maridoCelular: formData.maridoCelular,
          maridoEmail: formData.maridoEmail,
          maridoRedeSocial: formData.maridoRedeSocial,
          maridoProfissao: formData.maridoProfissao,
          maridoMembroIgreja: formData.maridoMembroIgreja === 'SIM',
          maridoQualIgreja: formData.maridoQualIgreja,
          maridoAfastado: formData.maridoAfastado === 'SIM',
          maridoDieta: formData.maridoDieta,
          maridoPaiNome: formData.maridoPaiNome,
          maridoMaeNome: formData.maridoMaeNome,
          maridoPaisTelefones: formData.maridoPaisTelefones,

          esposaNome: formData.esposaNome,
          esposaNascimento: formData.esposaNascimento,
          esposaCelular: formData.esposaCelular,
          esposaEmail: formData.esposaEmail,
          esposaRedeSocial: formData.esposaRedeSocial,
          esposaProfissao: formData.esposaProfissao,
          esposaMembroIgreja: formData.esposaMembroIgreja === 'SIM',
          esposaQualIgreja: formData.esposaQualIgreja,
          esposaAfastada: formData.esposaAfastada === 'SIM',
          esposaDieta: formData.esposaDieta,
          esposaPaiNome: formData.esposaPaiNome,
          esposaMaeNome: formData.esposaMaeNome,
          esposaPaisTelefones: formData.esposaPaisTelefones,

          endereco: formData.endereco,
          numero: formData.numero,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          estadoCivil: formData.estadoCivil,
          dataCasamento: formData.dataCasamento,
          fazParteGvc: formData.grupoDeVida === 'SIM',
          liderGvcNome: formData.liderGVC,
          liderGvcTelefone: formData.telefoneLiderGVC,

          temFilhos: formData.temFilhos === 'SIM',
          quantosFilhos: formData.quantosFilhos,
          filhosDescricao: [formData.filho1, formData.filho2, formData.filho3].filter(Boolean),

          visitaDiaSemana: formData.visitaDiaSemana,
          visitaHorario: formData.visitaHorario,

          comoSoube: formData.comoSoube,
          amigoNome: formData.amigoNome,
          amigoTelefone: formData.amigoTelefone,
        }),
      });
    } catch (apiErr) {
      console.warn('Fastify API call notice (will rely on direct form and local store):', apiErr);
    }

    try {
      // 2. Submit to Google Form response directly
      await fetch(EVENT_DETAILS.googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formParams.toString(),
      });
      syncSuccess = true;
    } catch (err) {
      console.warn('Form sync via fetch returned:', err);
    }

    // 2. Persist in Local Database / Storage
    const newRecord: StoredRegistration = {
      id: crypto.randomUUID ? crypto.randomUUID() : `reg_${Date.now()}`,
      voucherCode,
      createdAt: new Date().toISOString(),
      data: formData,
      syncedToGoogleForms: syncSuccess,
      paymentStatus: 'pending',
    };

    try {
      const existingStr = localStorage.getItem('inva_event_registrations');
      const existingList: StoredRegistration[] = existingStr ? JSON.parse(existingStr) : [];
      existingList.unshift(newRecord);
      localStorage.setItem('inva_event_registrations', JSON.stringify(existingList));
    } catch (storageErr) {
      console.error('Storage error:', storageErr);
    }

    setIsSubmitting(false);
    setSubmittedRecord(newRecord);
    if (onSuccess) onSuccess(newRecord);

    const el = document.getElementById('inscricao');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyVoucher = () => {
    if (!submittedRecord) return;
    navigator.clipboard.writeText(submittedRecord.voucherCode);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2500);
  };

  const shareOnWhatsApp = () => {
    if (!submittedRecord) return;
    const msg = `*CONFIRMAÇÃO DE INSCRIÇÃO — 72º ENCONTRO DE CASAIS INVA*%0A%0A*Código do Comprovante:* ${submittedRecord.voucherCode}%0A*Casal:* ${submittedRecord.data.maridoNome} e ${submittedRecord.data.esposaNome}%0A*Telefones:* ${submittedRecord.data.maridoCelular} / ${submittedRecord.data.esposaCelular}%0A*Data do Encontro:* 01 e 02 de Maio de 2027%0A*Local:* Casarão Terra Santa (Itaboraí/RJ)%0A%0A_Aguardamos as orientações da secretaria da Igreja Nova Vida de Alcântara._`;
    window.open(`https://wa.me/${EVENT_DETAILS.contact.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <section id="inscricao" className="py-20 lg:py-28 bg-[#07090E] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-4">
            <FileCheck className="w-3.5 h-3.5" />
            Inscrição Oficial Integrada
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight mb-4">
            Ficha de Inscrição do Casal
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Preencha todos os campos com atenção (preferencialmente em LETRAS MAIÚSCULAS).
            Ao finalizar, seus dados serão registrados diretamente no sistema oficial da igreja.
          </p>
        </div>

        {submittedRecord ? (
          /* SUCCESS SCREEN */
          <div className="bg-gradient-to-b from-[#141A28] to-[#0D111A] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                Inscrição Registrada com Sucesso!
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
                Que Alegria Ter Vocês Conosco!
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
                Os dados de <strong className="text-white">{submittedRecord.data.maridoNome}</strong> e{' '}
                <strong className="text-white">{submittedRecord.data.esposaNome}</strong> foram gravados
                com sucesso na base oficial do evento.
              </p>

              {/* Voucher Code Box */}
              <div className="bg-[#090C12] border border-[#D4AF37]/40 rounded-2xl p-5 mb-8">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  Código de Identificação da Inscrição
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#E5C07B] font-mono tracking-widest my-2 select-all">
                  {submittedRecord.voucherCode}
                </div>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <button
                    onClick={copyVoucher}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedVoucher ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVoucher ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Comprovante</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Unlocked Payment Link */}
              <div className="bg-gradient-to-r from-[#172033] to-[#121A2A] border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-7 text-left mb-8 shadow-xl shadow-[#D4AF37]/15">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C59F49] to-[#F3E5AB] text-black flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <span className="text-xl">🔓</span>
                  </div>
                  <div className="flex-grow">
                    <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider block mb-1">
                      Etapa Final Desbloqueada
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-white mb-1.5 font-display">
                      Link Oficial de Pagamento Liberado!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      Sua ficha de inscrição foi registrada com sucesso. Agora, acesse a Sacola Oficial
                      do PagBank da INVA para efetuar o pagamento da vaga do casal (com opção de
                      parcelamento em até 12x no cartão ou à vista).
                    </p>

                    <a
                      href={EVENT_DETAILS.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-extrabold text-black bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] rounded-xl transition-all shadow-xl shadow-[#C59F49]/30 active:scale-95"
                    >
                      <span>Acessar Pagamento no PagBank Agora</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={shareOnWhatsApp}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Enviar Confirmação no WhatsApp da Secretaria</span>
                </button>

                <button
                  onClick={() => {
                    setSubmittedRecord(null);
                    setCurrentStep(1);
                    setFormData(INITIAL_FORM);
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Fazer Outra Inscrição
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* MULTI-STEP INTEGRATED FORM */
          <div className="bg-[#0F1420] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Step Indicator Bar */}
            <div className="mb-10">
              <div className="grid grid-cols-6 gap-2 text-center">
                {steps.map((st) => {
                  const Icon = st.icon;
                  const isActive = currentStep === st.number;
                  const isDone = currentStep > st.number;

                  return (
                    <button
                      key={st.number}
                      type="button"
                      onClick={() => {
                        if (st.number < currentStep || validateStep(currentStep)) {
                          setCurrentStep(st.number);
                        }
                      }}
                      className="flex flex-col items-center group cursor-pointer focus-visible:outline-none"
                    >
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#C59F49] to-[#F3E5AB] text-black shadow-md shadow-[#C59F49]/40'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-500 border border-white/5'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold mt-1.5 hidden md:block ${
                          isActive ? 'text-[#E5C07B]' : isDone ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {st.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step Progress Line */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C59F49] to-[#F3E5AB] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: INFORMAÇÕES DO CASAL */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#E5C07B]" />
                      1. Informações do Casal
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Por favor, preencha os nomes em letras maiúsculas. Os campos com (*) são obrigatórios.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Nome Completo do Marido *
                      </label>
                      <input
                        type="text"
                        value={formData.maridoNome}
                        onChange={(e) => handleInputChange('maridoNome', e.target.value)}
                        placeholder="EX: JOÃO CARLOS DA SILVA"
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 ${
                          errors.maridoNome
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
                        }`}
                      />
                      {errors.maridoNome && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.maridoNome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Nome Completo da Esposa *
                      </label>
                      <input
                        type="text"
                        value={formData.esposaNome}
                        onChange={(e) => handleInputChange('esposaNome', e.target.value)}
                        placeholder="EX: MARIA APARECIDA DA SILVA"
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 ${
                          errors.esposaNome
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
                        }`}
                      />
                      {errors.esposaNome && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.esposaNome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Data de Nascimento Dele *
                      </label>
                      <input
                        type="date"
                        value={formData.maridoNascimento}
                        onChange={(e) => handleInputChange('maridoNascimento', e.target.value)}
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.maridoNascimento
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
                        }`}
                      />
                      {errors.maridoNascimento && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.maridoNascimento}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Data de Nascimento Dela *
                      </label>
                      <input
                        type="date"
                        value={formData.esposaNascimento}
                        onChange={(e) => handleInputChange('esposaNascimento', e.target.value)}
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.esposaNascimento
                            ? 'border-red-500 focus:ring-red-500/40'
                            : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30'
                        }`}
                      />
                      {errors.esposaNascimento && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.esposaNascimento}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-white/5">
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Endereço (Rua / Avenida) *
                      </label>
                      <input
                        type="text"
                        value={formData.endereco}
                        onChange={(e) => handleInputChange('endereco', e.target.value)}
                        placeholder="EX: RUA NESTOR PINTO ALVES"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                      {errors.endereco && (
                        <p className="text-xs text-red-400 mt-1">{errors.endereco}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        value={formData.numero}
                        onChange={(e) => handleInputChange('numero', e.target.value)}
                        placeholder="EX: 181 APTO 302"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                      {errors.numero && (
                        <p className="text-xs text-red-400 mt-1">{errors.numero}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Bairro *
                      </label>
                      <input
                        type="text"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange('bairro', e.target.value)}
                        placeholder="EX: ALCÂNTARA"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                      {errors.bairro && (
                        <p className="text-xs text-red-400 mt-1">{errors.bairro}</p>
                      )}
                    </div>

                    <div className="sm:col-span-5">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        placeholder="EX: SÃO GONÇALO"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                      {errors.cidade && (
                        <p className="text-xs text-red-400 mt-1">{errors.cidade}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                        placeholder="RJ"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Estado Civil & Data Casamento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-white/5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Estado Civil *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['CASADOS', 'COMPANHEIROS', 'SOLTEIROS', 'DIVORCIADOS'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleInputChange('estadoCivil', opt)}
                            className={`px-3 py-2.5 text-xs font-medium rounded-xl border text-center transition-all ${
                              formData.estadoCivil === opt
                                ? 'bg-[#E5C07B] text-black font-bold border-[#E5C07B]'
                                : 'bg-[#0A0D14] text-slate-300 border-white/10 hover:border-white/25'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Data do Casamento / União *
                      </label>
                      <input
                        type="date"
                        value={formData.dataCasamento}
                        onChange={(e) => handleInputChange('dataCasamento', e.target.value)}
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white focus:outline-none ${
                          errors.dataCasamento ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.dataCasamento && (
                        <p className="text-xs text-red-400 mt-1">{errors.dataCasamento}</p>
                      )}
                    </div>
                  </div>

                  {/* Grupo de Vida */}
                  <div className="pt-4 border-t border-white/5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Fazem parte de Grupo de Vida (GVC)? *
                    </label>
                    <div className="flex gap-4 mb-3">
                      {['SIM', 'NÃO'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                          <input
                            type="radio"
                            name="grupoDeVida"
                            checked={formData.grupoDeVida === opt}
                            onChange={() => handleInputChange('grupoDeVida', opt)}
                            className="text-[#E5C07B] focus:ring-[#E5C07B]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {formData.grupoDeVida === 'SIM' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 bg-[#0A0D14] p-4 rounded-xl border border-white/5">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Nome do Líder de GVC
                          </label>
                          <input
                            type="text"
                            value={formData.liderGVC}
                            onChange={(e) => handleInputChange('liderGVC', e.target.value)}
                            placeholder="Nome do líder"
                            className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Telefone do Líder de GVC
                          </label>
                          <input
                            type="tel"
                            value={formData.telefoneLiderGVC}
                            onChange={(e) => handleInputChange('telefoneLiderGVC', e.target.value)}
                            placeholder="(21) 99999-9999"
                            className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: INFORMAÇÕES DOS FILHOS */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Baby className="w-5 h-5 text-[#E5C07B]" />
                      2. Informações do(s) Filho(s)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Informações para o cadastro da família e arquivo ministerial.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      O Casal Tem Filhos?
                    </label>
                    <div className="flex gap-4">
                      {['SIM', 'NÃO'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                          <input
                            type="radio"
                            name="temFilhos"
                            checked={formData.temFilhos === opt}
                            onChange={() => handleInputChange('temFilhos', opt)}
                            className="text-[#E5C07B] focus:ring-[#E5C07B]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.temFilhos === 'SIM' && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Quantos Filhos?
                        </label>
                        <input
                          type="text"
                          value={formData.quantosFilhos}
                          onChange={(e) => handleInputChange('quantosFilhos', e.target.value)}
                          placeholder="Ex: 2"
                          className="w-32 px-4 py-2.5 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white"
                        />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            1) Nome / Idade / Celular
                          </label>
                          <textarea
                            rows={2}
                            value={formData.filho1}
                            onChange={(e) => handleInputChange('filho1', e.target.value)}
                            placeholder="Ex: LUCAS SILVA, 12 ANOS, (21) 98888-0000"
                            className="w-full px-4 py-2.5 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            2) Nome / Idade / Celular (Opcional)
                          </label>
                          <textarea
                            rows={2}
                            value={formData.filho2}
                            onChange={(e) => handleInputChange('filho2', e.target.value)}
                            placeholder="Ex: BEATRIZ SILVA, 8 ANOS"
                            className="w-full px-4 py-2.5 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            3) Nome / Idade / Celular (Opcional)
                          </label>
                          <textarea
                            rows={2}
                            value={formData.filho3}
                            onChange={(e) => handleInputChange('filho3', e.target.value)}
                            placeholder="Caso tenha mais filhos..."
                            className="w-full px-4 py-2.5 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: CONTATOS & REDES */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#E5C07B]" />
                      3. Telefones, Celular e Redes Sociais
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Canais de comunicação para orientações e confirmação de chegada.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Celular / WhatsApp Dele *
                      </label>
                      <input
                        type="tel"
                        value={formData.maridoCelular}
                        onChange={(e) => handleInputChange('maridoCelular', e.target.value)}
                        placeholder="(21) 99999-9999"
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white focus:outline-none ${
                          errors.maridoCelular ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.maridoCelular && (
                        <p className="text-xs text-red-400 mt-1">{errors.maridoCelular}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Celular / WhatsApp Dela *
                      </label>
                      <input
                        type="tel"
                        value={formData.esposaCelular}
                        onChange={(e) => handleInputChange('esposaCelular', e.target.value)}
                        placeholder="(21) 99999-9999"
                        className={`w-full px-4 py-3 bg-[#0A0D14] rounded-xl border text-sm text-white focus:outline-none ${
                          errors.esposaCelular ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.esposaCelular && (
                        <p className="text-xs text-red-400 mt-1">{errors.esposaCelular}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        E-mail Dele (Opcional)
                      </label>
                      <input
                        type="email"
                        value={formData.maridoEmail}
                        onChange={(e) => handleInputChange('maridoEmail', e.target.value)}
                        placeholder="email.marido@exemplo.com"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        E-mail Dela (Opcional)
                      </label>
                      <input
                        type="email"
                        value={formData.esposaEmail}
                        onChange={(e) => handleInputChange('esposaEmail', e.target.value)}
                        placeholder="email.esposa@exemplo.com"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Instagram / Facebook Dele
                      </label>
                      <input
                        type="text"
                        value={formData.maridoRedeSocial}
                        onChange={(e) => handleInputChange('maridoRedeSocial', e.target.value)}
                        placeholder="@perfil.dele"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Instagram / Facebook Dela
                      </label>
                      <input
                        type="text"
                        value={formData.esposaRedeSocial}
                        onChange={(e) => handleInputChange('esposaRedeSocial', e.target.value)}
                        placeholder="@perfil.dela"
                        className="w-full px-4 py-3 bg-[#0A0D14] rounded-xl border border-white/10 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: INFORMAÇÕES PESSOAIS & RELIGIOSAS */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Church className="w-5 h-5 text-[#E5C07B]" />
                      4. Informações Pessoais, Eclesiásticas e Saúde
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Informações para melhor assistência e adaptação do cardápio das refeições.
                    </p>
                  </div>

                  {/* Marido */}
                  <div className="bg-[#0A0D14] p-5 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider block">
                      Dados do Marido
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Profissão do Marido *
                        </label>
                        <input
                          type="text"
                          value={formData.maridoProfissao}
                          onChange={(e) => handleInputChange('maridoProfissao', e.target.value)}
                          placeholder="EX: ENGENHEIRO / COMERCIANTE"
                          className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-sm text-white"
                        />
                        {errors.maridoProfissao && (
                          <p className="text-xs text-red-400 mt-1">{errors.maridoProfissao}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Qual Igreja do Marido? *
                        </label>
                        <input
                          type="text"
                          value={formData.maridoQualIgreja}
                          onChange={(e) => handleInputChange('maridoQualIgreja', e.target.value)}
                          placeholder="EX: IGREJA NOVA VIDA DE ALCÂNTARA"
                          className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          É Membro de Alguma Igreja? *
                        </label>
                        <div className="flex gap-4 mt-1">
                          {['SIM', 'NÃO'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name="maridoMembroIgreja"
                                checked={formData.maridoMembroIgreja === opt}
                                onChange={() => handleInputChange('maridoMembroIgreja', opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Está Afastado de Alguma Igreja? *
                        </label>
                        <div className="flex gap-4 mt-1">
                          {['SIM', 'NÃO'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name="maridoAfastado"
                                checked={formData.maridoAfastado === opt}
                                onChange={() => handleInputChange('maridoAfastado', opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        Tem Alguma Dieta Especial / Alergia Alimentar? (Descreva se houver)
                      </label>
                      <input
                        type="text"
                        value={formData.maridoDieta}
                        onChange={(e) => handleInputChange('maridoDieta', e.target.value)}
                        placeholder="Ex: Intolerante a lactose, diabético, sem glúten..."
                        className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Esposa */}
                  <div className="bg-[#0A0D14] p-5 rounded-2xl border border-white/5 space-y-4">
                    <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider block">
                      Dados da Esposa
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Profissão da Esposa *
                        </label>
                        <input
                          type="text"
                          value={formData.esposaProfissao}
                          onChange={(e) => handleInputChange('esposaProfissao', e.target.value)}
                          placeholder="EX: PROFESSORA / EMPRESÁRIA"
                          className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-sm text-white"
                        />
                        {errors.esposaProfissao && (
                          <p className="text-xs text-red-400 mt-1">{errors.esposaProfissao}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Qual Igreja da Esposa? *
                        </label>
                        <input
                          type="text"
                          value={formData.esposaQualIgreja}
                          onChange={(e) => handleInputChange('esposaQualIgreja', e.target.value)}
                          placeholder="EX: IGREJA NOVA VIDA DE ALCÂNTARA"
                          className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          É Membro de Alguma Igreja? *
                        </label>
                        <div className="flex gap-4 mt-1">
                          {['SIM', 'NÃO'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name="esposaMembroIgreja"
                                checked={formData.esposaMembroIgreja === opt}
                                onChange={() => handleInputChange('esposaMembroIgreja', opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          Está Afastada de Alguma Igreja? *
                        </label>
                        <div className="flex gap-4 mt-1">
                          {['SIM', 'NÃO'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name="esposaAfastada"
                                checked={formData.esposaAfastada === opt}
                                onChange={() => handleInputChange('esposaAfastada', opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        Tem Alguma Dieta Especial / Alergia Alimentar?
                      </label>
                      <input
                        type="text"
                        value={formData.esposaDieta}
                        onChange={(e) => handleInputChange('esposaDieta', e.target.value)}
                        placeholder="Ex: Vegetariana, alérgica a frutos do mar..."
                        className="w-full px-3 py-2.5 bg-[#121722] rounded-xl border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: FILIAÇÃO & VISITA */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <HeartHandshake className="w-5 h-5 text-[#E5C07B]" />
                      5. Filiação e Visita Pastoral
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Dados para contato de emergência e possível visita de acolhimento ao casal.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Filiação Marido */}
                    <div className="bg-[#0A0D14] p-4 rounded-xl border border-white/5 space-y-3">
                      <span className="text-xs font-bold text-[#E5C07B] uppercase">
                        Pais do Marido
                      </span>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Nome do Pai do Marido
                        </label>
                        <input
                          type="text"
                          value={formData.maridoPaiNome}
                          onChange={(e) => handleInputChange('maridoPaiNome', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Nome da Mãe do Marido
                        </label>
                        <input
                          type="text"
                          value={formData.maridoMaeNome}
                          onChange={(e) => handleInputChange('maridoMaeNome', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Telefones dos Pais
                        </label>
                        <input
                          type="tel"
                          value={formData.maridoPaisTelefones}
                          onChange={(e) => handleInputChange('maridoPaisTelefones', e.target.value)}
                          placeholder="(21) 99999-9999"
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Filiação Esposa */}
                    <div className="bg-[#0A0D14] p-4 rounded-xl border border-white/5 space-y-3">
                      <span className="text-xs font-bold text-[#E5C07B] uppercase">
                        Pais da Esposa
                      </span>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Nome do Pai da Esposa
                        </label>
                        <input
                          type="text"
                          value={formData.esposaPaiNome}
                          onChange={(e) => handleInputChange('esposaPaiNome', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Nome da Mãe da Esposa
                        </label>
                        <input
                          type="text"
                          value={formData.esposaMaeNome}
                          onChange={(e) => handleInputChange('esposaMaeNome', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Telefones dos Pais
                        </label>
                        <input
                          type="tel"
                          value={formData.esposaPaisTelefones}
                          onChange={(e) => handleInputChange('esposaPaisTelefones', e.target.value)}
                          placeholder="(21) 99999-9999"
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Possível Visita */}
                  <div className="bg-[#0A0D14] p-4 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-slate-300 uppercase block mb-3">
                      Informações Para Uma Possível Visita de Acolhimento ao Casal
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Melhor Dia da Semana
                        </label>
                        <input
                          type="text"
                          value={formData.visitaDiaSemana}
                          onChange={(e) => handleInputChange('visitaDiaSemana', e.target.value)}
                          placeholder="Ex: Terça-feira ou Sábado"
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">
                          Melhor Horário
                        </label>
                        <input
                          type="text"
                          value={formData.visitaHorario}
                          onChange={(e) => handleInputChange('visitaHorario', e.target.value)}
                          placeholder="Ex: 19:30h"
                          className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PESQUISA, CONFIRMAÇÃO & ENVIO */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-[#E5C07B]" />
                      6. Pesquisa e Finalização da Inscrição
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Última etapa para submissão oficial dos dados.
                    </p>
                  </div>

                  {/* Pesquisa */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Como vocês ficaram sabendo do Encontro de Casais? *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'REDES SOCIAIS',
                          'SITE www.familiasintegradas.com',
                          'IGREJA',
                          'POR UM AMIGO(A)',
                          'FOLDER DE DIVULGAÇÃO',
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleInputChange('comoSoube', opt)}
                            className={`p-3 text-xs font-medium rounded-xl border text-left transition-all ${
                              formData.comoSoube === opt
                                ? 'bg-[#E5C07B] text-black font-bold border-[#E5C07B]'
                                : 'bg-[#0A0D14] text-slate-300 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.comoSoube === 'POR UM AMIGO(A)' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0A0D14] p-4 rounded-xl border border-white/5">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Nome do Amigo que Convidou
                          </label>
                          <input
                            type="text"
                            value={formData.amigoNome}
                            onChange={(e) => handleInputChange('amigoNome', e.target.value)}
                            className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">
                            Telefone do Amigo
                          </label>
                          <input
                            type="tel"
                            value={formData.amigoTelefone}
                            onChange={(e) => handleInputChange('amigoTelefone', e.target.value)}
                            className="w-full px-3 py-2 bg-[#121722] rounded-lg border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#0A0D14] border border-[#D4AF37]/30 rounded-2xl p-5 space-y-3">
                    <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider block">
                      Resumo da Inscrição do Casal
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">Marido:</span>{' '}
                        <strong className="text-white">{formData.maridoNome || '—'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Esposa:</span>{' '}
                        <strong className="text-white">{formData.esposaNome || '—'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Celular Dele:</span>{' '}
                        <span className="text-white">{formData.maridoCelular || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Celular Dela:</span>{' '}
                        <span className="text-white">{formData.esposaCelular || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Endereço:</span>{' '}
                        <span className="text-white">
                          {formData.endereco ? `${formData.endereco}, ${formData.numero}` : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Pacote da Vaga:</span>{' '}
                        <strong className="text-[#E5C07B]">1º Lote Casal (All-Inclusive)</strong>
                      </div>
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div className="bg-[#141A28] p-4 rounded-xl border border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termoAceito}
                        onChange={(e) => handleInputChange('termoAceito', e.target.checked)}
                        className="mt-0.5 rounded text-[#E5C07B] focus:ring-[#E5C07B] w-4 h-4"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        Declaro que todas as informações acima são verdadeiras e estou ciente de que a
                        confirmação da vaga do casal ocorre mediante o pagamento na Sacola Oficial do
                        PagBank da INVA.
                      </span>
                    </label>
                    {errors.termoAceito && (
                      <p className="text-xs text-red-400 mt-2">{errors.termoAceito}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] text-black text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Próximo Passo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#E5C07B] to-[#C59F49] hover:from-white hover:to-[#E5C07B] text-black text-sm sm:text-base font-extrabold shadow-xl shadow-[#C59F49]/30 hover:shadow-2xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Gravando Inscrição...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>FINALIZAR INSCRIÇÃO</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
