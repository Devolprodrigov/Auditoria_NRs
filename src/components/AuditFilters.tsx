import React, { useState } from 'react';
import { Search, X, Filter, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { FilterType, ChecklistMode } from '../types/audit';
import { getActiveDatabase, getCatalogForMode, AVAILABLE_NRS_LIST } from '../data/databaseResolver';
import { NRSelectorModal } from './NRSelectorModal';

interface AuditFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  selectedChapter: string;
  onSelectChapter: (chapter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFiltered: number;
  activeNR: ChecklistMode;
  onSelectNR: (nrId: ChecklistMode) => void;
}

export const AuditFilters: React.FC<AuditFiltersProps> = ({
  currentFilter,
  onFilterChange,
  selectedChapter,
  onSelectChapter,
  searchQuery,
  onSearchChange,
  totalFiltered,
  activeNR,
  onSelectNR
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const db = getActiveDatabase(activeNR);
  const catalog = getCatalogForMode(activeNR);

  return (
    <div className="space-y-3.5 no-print">
      {/* 1. NR Selector Strip / Hub */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#74b826]" />
              Norma Regulamentadora para Auditoria RRV:
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded border border-[#1f3a61] bg-[#152744] text-[#8dd633] font-mono">
              {catalog.code}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-semibold text-[#5e971d] hover:text-[#74b826] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ver catálogo completo com todas as NRs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Quick Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {AVAILABLE_NRS_LIST.map((item) => {
            const isSelected = activeNR === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectNR(item.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#152744] text-[#8dd633] border-[#152744] shadow-sm ring-1 ring-[#152744]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8dd633] inline-block"></span>}
                {item.code}
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
          <span className="font-medium text-slate-700 truncate">
            <strong>{catalog.name}</strong> · {catalog.officialPortaria}
          </span>
          <span className="text-[11px] text-slate-400">
            {db.reduce((acc, s) => acc + s.items.length, 0)} requisitos normativos nesta norma
          </span>
        </div>
      </div>

      {/* 2. Main Filter & Search Bar */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-3.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Status Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Status:
          </span>

          <button
            onClick={() => onFilterChange('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => onFilterChange('NC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentFilter === 'NC'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Não Conformes (NC)
          </button>

          <button
            onClick={() => onFilterChange('C')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentFilter === 'C'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            Conformes (C)
          </button>

          <button
            onClick={() => onFilterChange('NA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentFilter === 'NA'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            Não Aplicáveis (NA)
          </button>

          <button
            onClick={() => onFilterChange('PENDING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              currentFilter === 'PENDING'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pendentes
          </button>
        </div>

        {/* Chapter / Section Dropdown and Search Input */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          {/* Chapter / Section Select */}
          <select
            value={selectedChapter}
            onChange={(e) => onSelectChapter(e.target.value)}
            aria-label="Filtrar por Capítulo da Norma"
            className="text-xs rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[210px] truncate"
          >
            <option value="ALL">Todos os Capítulos / Seções</option>
            {db.map((sec) => (
              <option key={sec.nr} value={sec.nr}>
                {sec.nr} - {sec.title.split(':')[1]?.trim() || sec.title}
              </option>
            ))}
          </select>

          {/* Live Search */}
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 pointer-events-none">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pesquisar requisito, item ou ação..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-500 tabular-nums whitespace-nowrap hidden sm:inline-block">
            {totalFiltered} itens
          </span>
        </div>
      </section>

      {/* Modal for full NR selection */}
      <NRSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeNR={activeNR}
        onSelectNR={onSelectNR}
      />
    </div>
  );
};
