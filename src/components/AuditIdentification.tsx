import React from 'react';
import { 
  Building2, 
  MapPin, 
  Tag, 
  Users, 
  UserCheck, 
  Calendar, 
  FileCheck2, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { AuditHeaderInfo, GlobalParecer, ChecklistMode } from '../types/audit';

interface AuditIdentificationProps {
  info: AuditHeaderInfo;
  onChange: (updatedInfo: AuditHeaderInfo) => void;
  checklistMode?: ChecklistMode;
}

export const AuditIdentification: React.FC<AuditIdentificationProps> = ({ 
  info, 
  onChange,
  checklistMode = 'NR12_FULL' 
}) => {
  const updateField = (field: keyof AuditHeaderInfo, value: string) => {
    onChange({
      ...info,
      [field]: value
    });
  };

  const getParecerColor = (parecer: GlobalParecer) => {
    switch (parecer) {
      case 'Aprovado / Liberado':
        return 'text-emerald-700 bg-emerald-50 border-emerald-300';
      case 'Liberado com Restrições (Plano de Ação)':
        return 'text-amber-700 bg-amber-50 border-amber-300';
      case 'Interditado / Paralisado (Grave e Iminente Risco)':
        return 'text-rose-700 bg-rose-50 border-rose-300';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-300';
    }
  };

  const isNR12Only = checklistMode === 'NR12_FULL';

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 md:p-6 print-shadow-none transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#152744] text-[#8dd633] border border-[#1f3a61]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {isNR12Only 
                ? 'Identificação da Máquina / Equipamento & Auditoria NR-12' 
                : 'Identificação da Auditoria, Posto de Trabalho e Equipamento'}
            </h2>
            <p className="text-xs text-slate-500">
              {isNR12Only
                ? 'Dados cadastrais da máquina industrial, fabricante, operador e engenheiro responsável'
                : 'Dados cadastrais do estabelecimento, posto inspecionado e corpo técnico responsável'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Escopo Ativo:</span>
          <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {isNR12Only ? 'NR-12 (Portaria MTP 4.219/2022)' : '5 NRs Integradas'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Empresa */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Empresa / Razão Social / Unidade
          </label>
          <input
            type="text"
            value={info.empresa}
            onChange={(e) => updateField('empresa', e.target.value)}
            placeholder="Ex: Indústria Metalúrgica Central S/A"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Posto / Máquina */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Máquina / Equipamento / Posto
          </label>
          <input
            type="text"
            value={info.posto}
            onChange={(e) => updateField('posto', e.target.value)}
            placeholder="Ex: Célula de Solda Robotizada 02"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Tag / Patrimônio */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            Tag / Patrimônio / Identificador
          </label>
          <input
            type="text"
            value={info.tag}
            onChange={(e) => updateField('tag', e.target.value)}
            placeholder="Ex: ROB-SOL-02"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Setor */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            Setor / Área Fabril
          </label>
          <input
            type="text"
            value={info.setor}
            onChange={(e) => updateField('setor', e.target.value)}
            placeholder="Ex: Linha de Montagem Final"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Inspetor Responsável */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            Auditor / Inspetor Técnico
          </label>
          <input
            type="text"
            value={info.inspetor}
            onChange={(e) => updateField('inspetor', e.target.value)}
            placeholder="Nome Completo do Auditor"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Registro Profissional CREA / MTE */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
            Registro CREA / MTE
          </label>
          <input
            type="text"
            value={info.creaMte}
            onChange={(e) => updateField('creaMte', e.target.value)}
            placeholder="Ex: CREA/SP 506.128.990-D"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Data da Inspeção */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Data da Auditoria
          </label>
          <input
            type="date"
            value={info.data}
            onChange={(e) => updateField('data', e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>

        {/* Responsável Acompanhante */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            Líder / Gestor da Área
          </label>
          <input
            type="text"
            value={info.responsavel}
            onChange={(e) => updateField('responsavel', e.target.value)}
            placeholder="Nome do Gestor Acompanhante"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826] transition-shadow"
          />
        </div>
      </div>

      {/* Global Technical Assessment */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Parecer Técnico Conclusivo Global
          </label>
          <div className="relative">
            <select
              value={info.parecer}
              onChange={(e) => updateField('parecer', e.target.value as GlobalParecer)}
              className={`w-full rounded-lg border px-3 py-2 text-xs md:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#74b826] transition-colors ${getParecerColor(
                info.parecer
              )}`}
            >
              <option value="Aprovado / Liberado">Aprovado / Liberado (Sem impedimentos)</option>
              <option value="Liberado com Restrições (Plano de Ação)">
                Liberado com Restrições (Requer Plano de Ação)
              </option>
              <option value="Interditado / Paralisado (Grave e Iminente Risco)">
                Interditado / Paralisado (Grave e Iminente Risco)
              </option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Observações Gerais & Resumo do Posto
          </label>
          <input
            type="text"
            value={info.observacoesGerais}
            onChange={(e) => updateField('observacoesGerais', e.target.value)}
            placeholder="Comentários globais da auditoria ou condições operacionais no momento da visita..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-[#74b826]"
          />
        </div>
      </div>
    </section>
  );
};
