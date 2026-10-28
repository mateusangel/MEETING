import React, { useState, useEffect } from 'react';
import { StoredRegistration } from '../types';
import { EVENT_DETAILS } from '../data/eventData';
import {
  X,
  Download,
  Users,
  Search,
  CheckCircle,
  Clock,
  Printer,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface AdminReceiptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminReceiptsModal: React.FC<AdminReceiptsModalProps> = ({ isOpen, onClose }) => {
  const [registrations, setRegistrations] = useState<StoredRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReg, setSelectedReg] = useState<StoredRegistration | null>(null);

  const loadData = () => {
    try {
      const raw = localStorage.getItem('inva_event_registrations');
      if (raw) {
        setRegistrations(JSON.parse(raw));
      } else {
        setRegistrations([]);
      }
    } catch (e) {
      console.error(e);
      setRegistrations([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = registrations.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.voucherCode.toLowerCase().includes(q) ||
      r.data.maridoNome.toLowerCase().includes(q) ||
      r.data.esposaNome.toLowerCase().includes(q) ||
      r.data.maridoCelular.includes(q) ||
      r.data.esposaCelular.includes(q)
    );
  });

  const exportCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      'Código Voucher',
      'Data Inscrição',
      'Nome Marido',
      'Nome Esposa',
      'Nasc. Marido',
      'Nasc. Esposa',
      'Celular Marido',
      'Celular Esposa',
      'Email Marido',
      'Email Esposa',
      'Endereço',
      'Número',
      'Bairro',
      'Cidade',
      'Estado Civil',
      'Data Casamento',
      'Grupo de Vida',
      'Tem Filhos',
      'Quantos Filhos',
      'Profissão Marido',
      'Profissão Esposa',
      'Igreja Marido',
      'Igreja Esposa',
      'Dieta Marido',
      'Dieta Esposa',
      'Como Soube',
      'Sincronizado Google Form',
    ];

    const rows = registrations.map((r) => [
      `"${r.voucherCode}"`,
      `"${new Date(r.createdAt).toLocaleString('pt-BR')}"`,
      `"${r.data.maridoNome}"`,
      `"${r.data.esposaNome}"`,
      `"${r.data.maridoNascimento}"`,
      `"${r.data.esposaNascimento}"`,
      `"${r.data.maridoCelular}"`,
      `"${r.data.esposaCelular}"`,
      `"${r.data.maridoEmail}"`,
      `"${r.data.esposaEmail}"`,
      `"${r.data.endereco}"`,
      `"${r.data.numero}"`,
      `"${r.data.bairro}"`,
      `"${r.data.cidade}"`,
      `"${r.data.estadoCivil}"`,
      `"${r.data.dataCasamento}"`,
      `"${r.data.grupoDeVida}"`,
      `"${r.data.temFilhos}"`,
      `"${r.data.quantosFilhos}"`,
      `"${r.data.maridoProfissao}"`,
      `"${r.data.esposaProfissao}"`,
      `"${r.data.maridoQualIgreja}"`,
      `"${r.data.esposaQualIgreja}"`,
      `"${r.data.maridoDieta}"`,
      `"${r.data.esposaDieta}"`,
      `"${r.data.comoSoube}"`,
      `"${r.syncedToGoogleForms ? 'SIM' : 'NÃO'}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inscricoes_72_encontro_casais_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteRecord = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este registro local?')) {
      const updated = registrations.filter((r) => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('inva_event_registrations', JSON.stringify(updated));
      if (selectedReg?.id === id) setSelectedReg(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#0D1117] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0F1420] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#E5C07B] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Inscrições Registradas no Sistema
              </h3>
              <p className="text-xs text-slate-400">
                {registrations.length} casais registrados nesta estação de trabalho.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {registrations.length > 0 && (
              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-4 bg-[#090C12] border-b border-white/5 flex items-center gap-3">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome do marido, esposa, telefone ou código voucher..."
              className="w-full pl-9 pr-4 py-2 bg-[#121722] rounded-xl border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List column */}
          <div className={`${selectedReg ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-3`}>
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-[#090C12] rounded-2xl border border-white/5 p-6">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-slate-300">
                  {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhuma inscrição registrada ainda'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Assim que os participantes preencherem o formulário oficial, os comprovantes e
                  cadastros aparecerão automaticamente aqui.
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedReg(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedReg?.id === item.id
                      ? 'bg-[#141C2B] border-[#D4AF37]'
                      : 'bg-[#0F1420] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#E5C07B] bg-[#E5C07B]/10 px-2 py-0.5 rounded">
                        {item.voucherCode}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1.5">
                        {item.data.maridoNome} & {item.data.esposaNome}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.data.maridoCelular} · {item.data.cidade}/{item.data.estado}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span
                        className={`text-[10px] font-medium inline-block mt-1.5 px-2 py-0.5 rounded ${
                          item.syncedToGoogleForms
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {item.syncedToGoogleForms ? 'Google Form OK' : 'Salvo Localmente'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Details column (when an item is selected) */}
          {selectedReg && (
            <div className="lg:col-span-6 bg-[#0A0D14] border border-[#D4AF37]/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Detalhes da Inscrição
                  </span>
                  <div className="text-base font-bold text-[#E5C07B] font-mono">
                    {selectedReg.voucherCode}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                    title="Imprimir"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRecord(selectedReg.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedReg(null)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block">Casal:</span>
                  <div className="text-sm font-bold text-white">
                    {selectedReg.data.maridoNome} & {selectedReg.data.esposaNome}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Nasc. Dele:</span>
                    <span>{selectedReg.data.maridoNascimento || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nasc. Dela:</span>
                    <span>{selectedReg.data.esposaNascimento || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Celular Dele:</span>
                    <a
                      href={`https://wa.me/55${selectedReg.data.maridoCelular.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      {selectedReg.data.maridoCelular}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Celular Dela:</span>
                    <a
                      href={`https://wa.me/55${selectedReg.data.esposaCelular.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      {selectedReg.data.esposaCelular}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block">Endereço:</span>
                  <span>
                    {selectedReg.data.endereco}, {selectedReg.data.numero} — {selectedReg.data.bairro},{' '}
                    {selectedReg.data.cidade}/{selectedReg.data.estado}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Estado Civil:</span>
                    <span>{selectedReg.data.estadoCivil}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data Casamento:</span>
                    <span>{selectedReg.data.dataCasamento || '—'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Profissão Marido:</span>
                    <span>{selectedReg.data.maridoProfissao}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Profissão Esposa:</span>
                    <span>{selectedReg.data.esposaProfissao}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Igreja Marido:</span>
                    <span>{selectedReg.data.maridoQualIgreja}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Igreja Esposa:</span>
                    <span>{selectedReg.data.esposaQualIgreja}</span>
                  </div>
                </div>

                {(selectedReg.data.maridoDieta || selectedReg.data.esposaDieta) && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-amber-200">
                    <span className="font-bold block">Dietas / Restrições Alimentares:</span>
                    {selectedReg.data.maridoDieta && <div>Dele: {selectedReg.data.maridoDieta}</div>}
                    {selectedReg.data.esposaDieta && <div>Dela: {selectedReg.data.esposaDieta}</div>}
                  </div>
                )}

                <div className="pt-2">
                  <a
                    href={EVENT_DETAILS.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#E5C07B] text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir Sacola PagBank</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
