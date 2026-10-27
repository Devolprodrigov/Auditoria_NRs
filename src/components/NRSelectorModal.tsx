import React from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { NR_CATALOGS } from '../data/nrCatalogs';
import { AVAILABLE_NRS_LIST } from '../data/databaseResolver';

interface NRSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeNR: string;
  onSelectNR: (nrId: string) => void;
}

export const NRSelectorModal: React.FC<NRSelectorModalProps> = ({
  isOpen,
  onClose,
  activeNR,
  onSelectNR
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 no-print"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with RRV Brand */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#152744] text-[#8dd633] flex items-center justify-center p-2 border border-[#1f3a61]">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#152744] text-base sm:text-lg">
                Catálogo de Normas Regulamentadoras · RRV Consultoria
              </h3>
              <p className="text-xs text-slate-500">
                Selecione a NR desejada para auditar ou opte pela auditoria integrada multi-normas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Catalog Grid */}
        <div className="overflow-y-auto space-y-3 pr-1 py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AVAILABLE_NRS_LIST.map((item) => {
              const catalog = NR_CATALOGS[item.id];
              const isSelected = activeNR === item.id;
              const totalItems = catalog
                ? catalog.sections.reduce((acc, s) => acc + s.items.length, 0)
                : 21;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectNR(item.id);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#74b826] bg-[#f0f9e8] ring-2 ring-[#74b826]/30 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-[#74b826]/50 hover:bg-slate-50/60 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.code}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs">
                        {isSelected ? (
                          <span className="font-bold text-[#5e971d] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Ativa Agora
                          </span>
                        ) : (
                          <span className="text-slate-400 font-mono">
                            {totalItems} itens
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#5e971d] transition-colors">
                      {catalog?.name || item.label}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {catalog?.description || 'Auditoria conjunta com amostragem dos principais requisitos normativos.'}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono truncate max-w-[240px]">
                      {catalog?.officialPortaria || 'MTE / Portarias Consolidadas'}
                    </span>
                    <span className="font-semibold text-[#5e971d] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Iniciar <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Todas as normas com base na legislação oficial e atualizada do Ministério do Trabalho e Emprego.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
