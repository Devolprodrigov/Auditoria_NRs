import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Ban, 
  Layers,
  PieChart as PieChartIcon,
  Filter,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { AuditMasterState } from '../types/audit';
import { getActiveDatabase, getCatalogForMode } from '../data/databaseResolver';

interface AuditDashboardProps {
  state: AuditMasterState;
  onFilterByStatus?: (status: 'ALL' | 'NC' | 'C' | 'NA' | 'PENDING') => void;
  onSelectNR?: (nr: string) => void;
  selectedNR?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
      percentage: number;
    };
  }>;
  total: number;
}

const CustomDonutTooltip: React.FC<CustomTooltipProps> = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const pct = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0';
    return (
      <div className="bg-[#152744] text-white px-3 py-2 rounded-xl shadow-xl text-xs border border-slate-600/80 pointer-events-none z-50">
        <div className="flex items-center gap-2 font-semibold">
          <span 
            className="w-2.5 h-2.5 rounded-full inline-block shadow-sm" 
            style={{ backgroundColor: data.payload.color }} 
          />
          <span className="text-slate-100">{data.name}</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-extrabold text-white tabular-nums">
            {data.value} {data.value === 1 ? 'item' : 'itens'}
          </span>
          <span className="text-[#8dd633] font-bold text-[11px]">
            {pct}% do total
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const AuditDashboard: React.FC<AuditDashboardProps> = ({
  state,
  onFilterByStatus,
  onSelectNR,
  selectedNR
}) => {
  const [scopeMode, setScopeMode] = useState<'FULL_NR' | 'SELECTED_CHAPTER'>('FULL_NR');

  const catalog = getCatalogForMode(state.checklistMode);
  const db = getActiveDatabase(state.checklistMode);
  const isNR12Only = state.checklistMode === 'NR-12' || state.checklistMode === 'NR12_FULL';

  // Overall stats for the active NR
  let totalItems = 0;
  let conformes = 0;
  let naoConformes = 0;
  let naoAplicaveis = 0;
  let pendentes = 0;

  // Breakdown by Section / NR
  const sectionBreakdown = db.map((sec) => {
    const secTotal = sec.items.length;
    let secC = 0;
    let secNC = 0;
    let secNA = 0;
    let secPending = 0;

    sec.items.forEach((item) => {
      totalItems++;
      const itemState = state.items[item.id]?.status;
      if (itemState === 'C') {
        conformes++;
        secC++;
      } else if (itemState === 'NC') {
        naoConformes++;
        secNC++;
      } else if (itemState === 'NA') {
        naoAplicaveis++;
        secNA++;
      } else {
        pendentes++;
        secPending++;
      }
    });

    const secEvaluated = secC + secNC;
    const secPct = secEvaluated > 0 ? Math.round((secC / secEvaluated) * 100) : 0;

    return {
      nr: sec.nr,
      title: sec.title,
      total: secTotal,
      c: secC,
      nc: secNC,
      na: secNA,
      pending: secPending,
      pct: secPct,
      badgeBorder: sec.badgeBorder,
      badgeBg: sec.badgeBg,
      badgeText: sec.badgeText
    };
  });

  const evaluated = conformes + naoConformes;
  const compliancePct = evaluated > 0 ? Math.round((conformes / evaluated) * 100) : 0;

  // Health color helper
  const getProgressColor = (pct: number) => {
    if (pct >= 90) return 'bg-[#74b826] text-[#5e971d]';
    if (pct >= 70) return 'bg-amber-500 text-amber-700';
    return 'bg-rose-500 text-rose-700';
  };

  // Determine currently selected section if any
  const hasSpecificChapterSelected = Boolean(selectedNR && selectedNR !== 'ALL');
  const selectedSection = hasSpecificChapterSelected 
    ? sectionBreakdown.find((s) => s.nr === selectedNR)
    : null;

  // Decide data for Donut Chart based on scope mode and selection
  const useSelectedChapterData = scopeMode === 'SELECTED_CHAPTER' && selectedSection;
  
  const donutC = useSelectedChapterData ? selectedSection.c : conformes;
  const donutNC = useSelectedChapterData ? selectedSection.nc : naoConformes;
  const donutNA = useSelectedChapterData ? selectedSection.na : naoAplicaveis;
  const donutPending = useSelectedChapterData ? selectedSection.pending : pendentes;
  const donutTotal = useSelectedChapterData ? selectedSection.total : totalItems;

  const donutEvaluated = donutC + donutNC;
  const donutCompliancePct = donutEvaluated > 0 ? Math.round((donutC / donutEvaluated) * 100) : 0;

  // Prepare chart dataset (C, NC, NA, and optionally Pending)
  const chartData = [
    { name: 'Conformes (C)', value: donutC, color: '#74b826', statusKey: 'C' as const },
    { name: 'Não Conformes (NC)', value: donutNC, color: '#e11d48', statusKey: 'NC' as const },
    { name: 'Não Aplicáveis (NA)', value: donutNA, color: '#f59e0b', statusKey: 'NA' as const },
    ...(donutPending > 0 ? [{ name: 'Pendentes', value: donutPending, color: '#94a3b8', statusKey: 'PENDING' as const }] : [])
  ].filter((d) => d.value > 0);

  const displayScopeTitle = useSelectedChapterData
    ? `Capítulo ${selectedSection.nr}: ${selectedSection.title}`
    : `${catalog.code}: ${catalog.name}`;

  return (
    <section className="space-y-4">
      {/* 5 Main Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Total */}
        <button
          type="button"
          onClick={() => onFilterByStatus?.('ALL')}
          className="text-left bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:border-[#152744]/40 hover:shadow transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total de Itens
            </span>
            <span className="text-2xl font-extrabold text-[#152744] mt-1 block tabular-nums">
              {totalItems}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {isNR12Only ? 'NR-12 Completa' : catalog.code}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#152744] group-hover:bg-[#152744]/10 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
        </button>

        {/* Conformes */}
        <button
          type="button"
          onClick={() => onFilterByStatus?.('C')}
          className="text-left bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:border-[#74b826]/60 hover:shadow transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[11px] font-bold text-[#5e971d] uppercase tracking-wider block">
              Conformes (C)
            </span>
            <span className="text-2xl font-extrabold text-[#74b826] mt-1 block tabular-nums">
              {conformes}
            </span>
            <span className="text-[11px] text-[#5e971d]/80 font-medium">Requisitos atendidos</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-[#74b826] group-hover:bg-emerald-100 transition-colors">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </button>

        {/* Não Conformes */}
        <button
          type="button"
          onClick={() => onFilterByStatus?.('NC')}
          className="text-left bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:border-rose-300 hover:shadow transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
              Não Conformes (NC)
            </span>
            <span className="text-2xl font-extrabold text-rose-600 mt-1 block tabular-nums">
              {naoConformes}
            </span>
            <span className="text-[11px] text-rose-600/80 font-medium">Requer plano de ação</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-100 transition-colors">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </button>

        {/* Não Aplicáveis */}
        <button
          type="button"
          onClick={() => onFilterByStatus?.('NA')}
          className="text-left bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm hover:border-amber-300 hover:shadow transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Não Aplicáveis (NA)
            </span>
            <span className="text-2xl font-extrabold text-amber-600 mt-1 block tabular-nums">
              {naoAplicaveis}
            </span>
            <span className="text-[11px] text-amber-600/80 font-medium">Sem aplicabilidade</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
            <Ban className="w-5 h-5" />
          </div>
        </button>

        {/* Taxa de Conformidade */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Índice Conformidade
              </span>
              <span className={`text-base font-extrabold tabular-nums ${getProgressColor(compliancePct).split(' ')[1]}`}>
                {compliancePct}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${getProgressColor(compliancePct).split(' ')[0]}`}
                style={{ width: `${compliancePct}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-2">
            <span>Pendentes: <strong className="tabular-nums text-slate-700">{pendentes}</strong></span>
            <span>Avaliados: <strong className="tabular-nums text-slate-700">{evaluated}/{totalItems}</strong></span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row: Recharts Donut Chart + Chapter Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Donut Chart Card (Recharts) */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-1 pb-2 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#152744] text-[#8dd633] flex items-center justify-center shadow-xs">
                  <PieChartIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#152744] text-sm leading-tight">
                    Proporção de Conformidade ({catalog.code})
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[240px] sm:max-w-[300px]" title={displayScopeTitle}>
                    {displayScopeTitle}
                  </p>
                </div>
              </div>

              {/* Scope Switcher if a specific chapter is currently selected */}
              {hasSpecificChapterSelected && (
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setScopeMode('FULL_NR')}
                    className={`px-2 py-1 rounded-md transition-all ${
                      scopeMode === 'FULL_NR'
                        ? 'bg-white text-[#152744] shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Toda NR
                  </button>
                  <button
                    type="button"
                    onClick={() => setScopeMode('SELECTED_CHAPTER')}
                    className={`px-2 py-1 rounded-md transition-all ${
                      scopeMode === 'SELECTED_CHAPTER'
                        ? 'bg-white text-[#152744] shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Cap. {selectedNR}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Donut Chart Container */}
          <div className="relative w-full h-52 sm:h-56 my-1 flex items-center justify-center">
            {chartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-slate-400 text-xs">
                <PieChartIcon className="w-8 h-8 mb-2 opacity-30 text-slate-500" />
                <span>Nenhum item avaliado para esta seleção</span>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={54}
                      outerRadius={78}
                      paddingAngle={chartData.length > 1 ? 3 : 0}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`donut-cell-${index}`} 
                          fill={entry.color} 
                          className="hover:opacity-90 transition-opacity cursor-pointer outline-none"
                          onClick={() => onFilterByStatus?.(entry.statusKey)}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomDonutTooltip total={donutTotal} />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center of the Donut: Compliance Percentage & Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none">
                  <span className="text-3xl font-black text-[#152744] tracking-tight leading-none tabular-nums">
                    {donutCompliancePct}%
                  </span>
                  <span className="text-[10px] font-extrabold text-[#74b826] uppercase tracking-wider mt-0.5">
                    Conforme
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">
                    {donutEvaluated} de {donutTotal}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Interactive Legend with Direct Status Filter Triggers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100">
            {/* C */}
            <button
              type="button"
              onClick={() => onFilterByStatus?.('C')}
              title="Filtrar por itens Conformes"
              className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/70 hover:bg-emerald-100/70 transition-all text-left group border border-emerald-100"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#74b826] shrink-0 group-hover:scale-125 transition-transform" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-emerald-800 truncate">
                  Conformes (C)
                </div>
                <div className="text-xs font-black text-emerald-700 tabular-nums">
                  {donutC} <span className="text-[10px] font-normal text-emerald-600/80">({donutTotal > 0 ? Math.round((donutC / donutTotal) * 100) : 0}%)</span>
                </div>
              </div>
            </button>

            {/* NC */}
            <button
              type="button"
              onClick={() => onFilterByStatus?.('NC')}
              title="Filtrar por itens Não Conformes"
              className="flex items-center gap-2 p-2 rounded-lg bg-rose-50/70 hover:bg-rose-100/70 transition-all text-left group border border-rose-100"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48] shrink-0 group-hover:scale-125 transition-transform" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-rose-800 truncate">
                  Não Conf. (NC)
                </div>
                <div className="text-xs font-black text-rose-700 tabular-nums">
                  {donutNC} <span className="text-[10px] font-normal text-rose-600/80">({donutTotal > 0 ? Math.round((donutNC / donutTotal) * 100) : 0}%)</span>
                </div>
              </div>
            </button>

            {/* NA */}
            <button
              type="button"
              onClick={() => onFilterByStatus?.('NA')}
              title="Filtrar por itens Não Aplicáveis"
              className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/70 hover:bg-amber-100/70 transition-all text-left group border border-amber-100"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shrink-0 group-hover:scale-125 transition-transform" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-amber-800 truncate">
                  Não Aplic. (NA)
                </div>
                <div className="text-xs font-black text-amber-700 tabular-nums">
                  {donutNA} <span className="text-[10px] font-normal text-amber-600/80">({donutTotal > 0 ? Math.round((donutNA / donutTotal) * 100) : 0}%)</span>
                </div>
              </div>
            </button>

            {/* Pendente */}
            <button
              type="button"
              onClick={() => onFilterByStatus?.('PENDING')}
              title="Filtrar por itens Pendentes"
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-all text-left group border border-slate-200"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] shrink-0 group-hover:scale-125 transition-transform" />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-700 truncate">
                  Pendentes
                </div>
                <div className="text-xs font-black text-slate-700 tabular-nums">
                  {donutPending} <span className="text-[10px] font-normal text-slate-500">({donutTotal > 0 ? Math.round((donutPending / donutTotal) * 100) : 0}%)</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Chapter / Section Breakdown Progress Grid */}
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#74b826]" />
                <span className="font-bold text-[#152744] uppercase text-[11px] tracking-wide">
                  {isNR12Only 
                    ? 'Desempenho por Capítulo Normativo da NR-12:' 
                    : `Desempenho por Seção da ${catalog.code}:`}
                </span>
              </div>
              {selectedNR !== 'ALL' && (
                <button
                  type="button"
                  onClick={() => onSelectNR?.('ALL')}
                  className="text-[11px] text-[#5e971d] hover:text-[#74b826] font-bold underline underline-offset-2 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Exibir Todos os Capítulos
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full max-h-[260px] overflow-y-auto pr-1">
              {sectionBreakdown.map((sec) => {
                const isSelected = selectedNR === sec.nr;
                return (
                  <button
                    key={sec.nr}
                    type="button"
                    onClick={() => onSelectNR?.(isSelected ? 'ALL' : sec.nr)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#152744] bg-[#152744] text-[#8dd633] shadow-sm ring-2 ring-[#74b826]/40'
                        : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs truncate max-w-[95px]" title={sec.title}>
                        {sec.nr}
                      </span>
                      <span className="font-mono tabular-nums text-[11px] font-extrabold">
                        {sec.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden mb-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          sec.pct >= 85 ? 'bg-[#74b826]' : sec.pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sec.pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] opacity-85 font-semibold">
                      <span className={isSelected ? 'text-[#8dd633]' : 'text-emerald-700'}>C:{sec.c}</span>
                      <span className={isSelected ? 'text-rose-300' : 'text-rose-600'}>NC:{sec.nc}</span>
                      <span className={isSelected ? 'text-amber-200' : 'text-amber-600'}>NA:{sec.na}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Clique em um capítulo para filtrar os itens da auditoria.</span>
            <span className="font-medium text-[#152744]">{sectionBreakdown.length} seções</span>
          </div>
        </div>
      </div>
    </section>
  );
};
