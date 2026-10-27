import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Ban, 
  Camera, 
  Trash2, 
  HelpCircle, 
  Calendar, 
  User, 
  AlertCircle,
  Maximize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AuditItemDef, NRSectionDef } from '../data/safetyDatabase';
import { AuditStatus, ItemEvaluation, RiskLevel } from '../types/audit';
import { compressImage } from '../utils/imageCompressor';

interface NRSectionCardProps {
  section: NRSectionDef;
  items: AuditItemDef[];
  evaluations: Record<string, ItemEvaluation>;
  onUpdateStatus: (itemId: string, status: AuditStatus) => void;
  onUpdateField: (itemId: string, field: keyof ItemEvaluation, value: any) => void;
  onOpenPhotoModal: (imgSrc: string, title: string) => void;
}

export const NRSectionCard: React.FC<NRSectionCardProps> = ({
  section,
  items,
  evaluations,
  onUpdateStatus,
  onUpdateField,
  onOpenPhotoModal
}) => {
  const [expandedGuidance, setExpandedGuidance] = useState<Record<string, boolean>>({});
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);

  const toggleGuidance = (itemId: string) => {
    setExpandedGuidance((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handlePhotoUpload = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file, 1200, 0.75);
      onUpdateField(itemId, 'photo', compressedDataUrl);
    } catch (err) {
      alert('Não foi possível processar a imagem. Tente outro arquivo.');
    }
    e.target.value = '';
  };

  // Section level metrics
  let cCount = 0;
  let ncCount = 0;
  let naCount = 0;
  items.forEach((item) => {
    const st = evaluations[item.id]?.status;
    if (st === 'C') cCount++;
    else if (st === 'NC') ncCount++;
    else if (st === 'NA') naCount++;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden print-shadow-none transition-all">
      {/* Section Header */}
      <div 
        onClick={() => setIsSectionCollapsed(!isSectionCollapsed)}
        className="bg-slate-50/90 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${section.badgeBg} ${section.badgeText} ${section.badgeBorder}`}>
            {section.nr}
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
              {section.title}
            </h3>
            <p className="text-xs text-slate-500 hidden sm:block">
              {section.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              C: {cCount}
            </span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              NC: {ncCount}
            </span>
            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              NA: {naCount}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs tabular-nums">
            {items.length} itens
          </span>
          <button 
            type="button" 
            aria-label={isSectionCollapsed ? "Expandir seção" : "Recolher seção"}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            {isSectionCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Items List */}
      {!isSectionCollapsed && (
        <div className="divide-y divide-slate-100">
          {items.map((item) => {
            const ev = evaluations[item.id] || { status: '', obs: '', prazo: '', responsavel: '' };
            const isC = ev.status === 'C';
            const isNC = ev.status === 'NC';
            const isNA = ev.status === 'NA';

            const isOverdue =
              isNC &&
              ev.prazo &&
              new Date(ev.prazo) < new Date(new Date().toISOString().split('T')[0]);

            return (
              <div 
                key={item.id} 
                className={`p-4 md:p-5 transition-colors ${
                  isNC ? 'bg-rose-50/20' : 'hover:bg-slate-50/50'
                }`}
              >
                {/* Item Top: ID, Norm, Title, Status Actions */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                        {item.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {item.code}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        · {item.title}
                      </span>
                      {isNC && ev.riskLevel && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          ev.riskLevel === 'Crítico' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                          ev.riskLevel === 'Alto' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                          ev.riskLevel === 'Médio' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-blue-100 text-blue-800 border-blue-300'
                        }`}>
                          Risco {ev.riskLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                      {item.text}
                    </p>

                    {/* Technical guidance toggle */}
                    {item.guidance && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => toggleGuidance(item.id)}
                          className="text-[11px] font-semibold text-[#5e971d] hover:text-[#74b826] flex items-center gap-1 transition"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          {expandedGuidance[item.id] ? 'Ocultar critério de auditoria' : 'Ver critério técnico de auditoria'}
                        </button>
                        {expandedGuidance[item.id] && (
                          <div className="mt-1.5 p-2.5 rounded-lg bg-[#f0f9e8] border border-[#d3edb0] text-xs text-[#1c3817] leading-normal">
                            <strong className="font-semibold">Orientação para o auditor RRV:</strong> {item.guidance}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Buttons: C, NC, NA */}
                  <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                    {/* Conforme */}
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(item.id, isC ? '' : 'C')}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs ${
                        isC
                          ? 'bg-[#74b826] text-slate-950 border-[#74b826] ring-2 ring-[#74b826]/30'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-[#f0f9e8] hover:text-[#5e971d] hover:border-[#74b826]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      C
                    </button>

                    {/* Não Conforme */}
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(item.id, isNC ? '' : 'NC')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs ${
                        isNC
                          ? 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-500/20'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      NC
                    </button>

                    {/* Não Aplicável */}
                    <button
                      type="button"
                      onClick={() => onUpdateStatus(item.id, isNA ? '' : 'NA')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs ${
                        isNA
                          ? 'bg-amber-500 text-white border-amber-500 ring-2 ring-amber-500/20'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300'
                      }`}
                    >
                      <Ban className="w-3.5 h-3.5" />
                      NA
                    </button>
                  </div>
                </div>

                {/* Sub-form: Observations, Action Plan & Photo */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3.5 text-xs">
                  {/* Left: Observations & Action Plan (8 cols) */}
                  <div className="md:col-span-8 space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        {isNC ? (
                          <span className="text-rose-700 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Descrição da Não Conformidade & Ação Corretiva Recomendada (5W2H)
                          </span>
                        ) : (
                          'Observações / Notas da Inspeção'
                        )}
                      </label>
                      <textarea
                        rows={isNC ? 2 : 1}
                        value={ev.obs || ''}
                        onChange={(e) => onUpdateField(item.id, 'obs', e.target.value)}
                        placeholder={
                          isNC
                            ? 'Descreva o desvio encontrado, a gravidade e a ação de adequação necessária...'
                            : 'Registros de conformidade ou detalhes do posto (opcional)...'
                        }
                        className={`w-full text-xs rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-none ${
                          isNC ? 'border-rose-300 bg-rose-50/20' : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>

                    {/* Action Plan Specifics when NC */}
                    {isNC && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-rose-50/40 p-2.5 rounded-lg border border-rose-200/80">
                        {/* Risk Level */}
                        <div>
                          <label className="block text-[11px] font-semibold text-rose-800 mb-1">
                            Gravidade / Risco
                          </label>
                          <select
                            value={ev.riskLevel || 'Médio'}
                            onChange={(e) => onUpdateField(item.id, 'riskLevel', e.target.value as RiskLevel)}
                            aria-label="Gravidade ou nível de risco"
                            className="w-full text-xs rounded border border-rose-300 bg-white px-2 py-1 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="Baixo">Baixo (Leve)</option>
                            <option value="Médio">Médio (Atenção)</option>
                            <option value="Alto">Alto (Grave)</option>
                            <option value="Crítico">Crítico (Imediato)</option>
                          </select>
                        </div>

                        {/* Responsible person */}
                        <div>
                          <label className="block text-[11px] font-semibold text-rose-800 mb-1 flex items-center gap-1">
                            <User className="w-3 h-3 text-rose-600" />
                            Responsável
                          </label>
                          <input
                            type="text"
                            value={ev.responsavel || ''}
                            onChange={(e) => onUpdateField(item.id, 'responsavel', e.target.value)}
                            placeholder="Ex: Manutenção / Líder"
                            className="w-full text-xs rounded border border-rose-300 bg-white px-2 py-1 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                          />
                        </div>

                        {/* Deadline */}
                        <div>
                          <label className="block text-[11px] font-semibold text-rose-800 mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-rose-600" />
                            Prazo de Adequação
                          </label>
                          <input
                            type="date"
                            value={ev.prazo || ''}
                            onChange={(e) => onUpdateField(item.id, 'prazo', e.target.value)}
                            className={`w-full text-xs rounded border px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                              isOverdue ? 'border-rose-600 font-bold text-rose-700' : 'border-rose-300 text-slate-800'
                            }`}
                          />
                          {isOverdue && (
                            <span className="text-[10px] text-rose-600 font-semibold block mt-0.5">
                              ⚠️ Prazo expirado!
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Photo Evidence (4 cols) */}
                  <div className="md:col-span-4 flex flex-col justify-between">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1 flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-slate-400" />
                        Evidência Fotográfica do Requisito
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 transition flex items-center gap-1.5 shadow-2xs">
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          <span>{ev.photo ? 'Alterar Foto' : 'Anexar Foto'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => handlePhotoUpload(item.id, e)}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-slate-400 italic">
                          {ev.photo ? 'Foto carregada' : 'Nenhuma foto'}
                        </span>
                      </div>
                    </div>

                    {/* Photo Preview and Removal */}
                    {ev.photo && (
                      <div className="flex items-center gap-3 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <div 
                          onClick={() => onOpenPhotoModal(ev.photo!, `${item.id} - ${item.title}`)}
                          className="relative group cursor-pointer shrink-0"
                          title="Clique para ampliar"
                        >
                          <img
                            src={ev.photo}
                            alt={`Evidência fotográfica para ${item.id}`}
                            className="w-14 h-14 rounded-md object-cover border border-slate-300 group-hover:opacity-90 transition shadow-2xs"
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Maximize2 className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={ev.photoDescription || ''}
                            onChange={(e) => onUpdateField(item.id, 'photoDescription', e.target.value)}
                            placeholder="Legenda da foto..."
                            className="w-full text-[11px] border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <div className="flex items-center justify-between mt-1">
                            <button
                              type="button"
                              onClick={() => onOpenPhotoModal(ev.photo!, `${item.id} - ${item.title}`)}
                              className="text-[10px] text-emerald-700 hover:underline font-semibold"
                            >
                              Ver em Tela Cheia
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateField(item.id, 'photo', undefined)}
                              title="Remover foto"
                              className="text-rose-600 hover:text-rose-800 text-[11px] p-0.5 flex items-center gap-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Excluir</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
