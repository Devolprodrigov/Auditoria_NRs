import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { AuditIdentification } from './components/AuditIdentification';
import { AuditDashboard } from './components/AuditDashboard';
import { AuditFilters } from './components/AuditFilters';
import { NRSectionCard } from './components/NRSectionCard';
import { PrintReportView } from './components/PrintReportView';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { DEMO_AUDIT_DATA } from './data/safetyDatabase';
import { DEMO_NR12_STATE } from './data/nr12DetailedDatabase';
import { getActiveDatabase, getCatalogForMode } from './data/databaseResolver';
import { 
  AuditMasterState, 
  AuditStatus, 
  FilterType, 
  ItemEvaluation,
  ChecklistMode,
  AuditHeaderInfo
} from './types/audit';
import { FolderSearch, Sparkles } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'safetyaudit_master_state_v3';

const INITIAL_EMPTY_STATE: AuditMasterState = {
  info: {
    empresa: '',
    posto: '',
    tag: '',
    setor: '',
    inspetor: '',
    creaMte: '',
    data: new Date().toISOString().split('T')[0],
    responsavel: '',
    parecer: 'Aprovado / Liberado',
    observacoesGerais: ''
  },
  items: {},
  checklistMode: 'NR-12'
};

export default function App() {
  // Application State
  const [auditState, setAuditState] = useState<AuditMasterState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.info && parsed.items) {
          return {
            ...parsed,
            checklistMode: parsed.checklistMode || 'NR-12'
          };
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos no localStorage:', e);
    }
    // Default to the dedicated NR-12 checklist
    return {
      ...(DEMO_NR12_STATE as AuditMasterState),
      checklistMode: 'NR-12'
    };
  });

  // UI Navigation & Filter States
  const [activeView, setActiveView] = useState<'audit' | 'report'>('audit');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox Modal State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
  }>({
    isOpen: false,
    imageSrc: '',
    title: ''
  });

  // AI Assistant Drawer State
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Persist state to localStorage on every update
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auditState));
    } catch (e) {
      console.error('Falha ao salvar no localStorage (possível limite excedido):', e);
    }
  }, [auditState]);

  const activeNR: ChecklistMode = auditState.checklistMode || 'NR-12';
  const activeDatabase = useMemo(() => getActiveDatabase(activeNR), [activeNR]);

  // Handlers for Identification & Item Updates
  const handleInfoChange = (newInfo: typeof auditState.info) => {
    setAuditState((prev) => ({
      ...prev,
      info: newInfo
    }));
  };

  const handleSelectNR = (newNR: ChecklistMode) => {
    if (newNR === activeNR) return;
    
    setAuditState((prev) => {
      const catalog = getCatalogForMode(newNR);
      const isSwitchingToNR12 = newNR === 'NR-12';
      const isSwitchingToMulti = newNR === 'MULTI_NR';

      let newInfo = { ...prev.info };
      let newItems = { ...prev.items };

      // If switching from empty, populate smart default posto for that NR
      if (!prev.info.empresa && !prev.info.posto) {
        if (isSwitchingToNR12) {
          newInfo = DEMO_NR12_STATE.info as AuditHeaderInfo;
          newItems = DEMO_NR12_STATE.items as unknown as Record<string, ItemEvaluation>;
        } else if (isSwitchingToMulti) {
          newInfo = DEMO_AUDIT_DATA.info as AuditHeaderInfo;
          newItems = DEMO_AUDIT_DATA.items as unknown as Record<string, ItemEvaluation>;
        } else {
          newInfo.posto = `${catalog.shortName} - Área Operacional`;
          newInfo.observacoesGerais = `Auditoria técnica focada na conformidade da ${catalog.code} (${catalog.officialPortaria}).`;
        }
      }

      return {
        ...prev,
        checklistMode: newNR,
        info: newInfo,
        items: newItems
      };
    });

    setSelectedChapter('ALL');
    setCurrentFilter('ALL');
  };

  const handleUpdateStatus = (itemId: string, status: AuditStatus) => {
    setAuditState((prev) => {
      const currentItem = prev.items[itemId] || { status: '', obs: '', prazo: '', responsavel: '' };
      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...currentItem,
            status
          }
        }
      };
    });
  };

  const handleUpdateField = (itemId: string, field: keyof ItemEvaluation, value: any) => {
    setAuditState((prev) => {
      const currentItem = prev.items[itemId] || { status: '', obs: '', prazo: '', responsavel: '' };
      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...currentItem,
            [field]: value
          }
        }
      };
    });
  };

  const handleReset = () => {
    const catalog = getCatalogForMode(activeNR);
    if (window.confirm(`Tem certeza que deseja zerar os dados da auditoria da ${catalog.code}? Esta ação não pode ser desfeita.`)) {
      setAuditState({
        ...INITIAL_EMPTY_STATE,
        checklistMode: activeNR
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setCurrentFilter('ALL');
      setSelectedChapter('ALL');
      setSearchQuery('');
    }
  };

  const handleLoadDemo = () => {
    if (activeNR === 'NR-12') {
      setAuditState({
        ...(DEMO_NR12_STATE as AuditMasterState),
        checklistMode: 'NR-12'
      });
    } else if (activeNR === 'MULTI_NR') {
      setAuditState({
        ...(DEMO_AUDIT_DATA as AuditMasterState),
        checklistMode: 'MULTI_NR'
      });
    } else {
      const catalog = getCatalogForMode(activeNR);
      // Generate initial demo data for this specific NR
      const sampleItems: Record<string, ItemEvaluation> = {};
      catalog.sections.forEach((s, idx) => {
        s.items.forEach((item, itemIdx) => {
          if (itemIdx === 0 && idx === 0) {
            sampleItems[item.id] = {
              status: 'NC',
              obs: 'Requisito em adequação com recomendação técnica prioritária.',
              riskLevel: 'Médio',
              responsavel: 'Supervisão Técnica',
              prazo: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
            };
          } else {
            sampleItems[item.id] = {
              status: 'C',
              obs: 'Conformidade verificada em inspeção visual e documental.',
              prazo: '',
              responsavel: ''
            };
          }
        });
      });

      setAuditState((prev) => ({
        ...prev,
        checklistMode: activeNR,
        info: {
          empresa: "Indústria Metalmecânica Nacional S/A",
          posto: `Instalação / Posto de Trabalho - ${catalog.shortName}`,
          tag: `${catalog.code}-AUDIT-01`,
          setor: "Operações & Manutenção Geral",
          inspetor: "Rodrigo Vieira (TST - RRV Consultoria)",
          creaMte: "MTE / SST - RRV Consultoria",
          data: new Date().toISOString().split('T')[0],
          responsavel: "Fernando Lima (Coordenador de SST)",
          parecer: "Liberado com Restrições (Plano de Ação)",
          observacoesGerais: `Auditoria de conformidade técnica da ${catalog.code} (${catalog.officialPortaria}).`
        },
        items: sampleItems
      }));
    }

    setSelectedChapter('ALL');
    setCurrentFilter('ALL');
    setSearchQuery('');
  };

  const handleImportJSON = (importedState: AuditMasterState) => {
    setAuditState(importedState);
    alert('Auditoria importada com sucesso!');
  };

  const handleOpenPhotoModal = (imgSrc: string, title: string) => {
    setLightbox({
      isOpen: true,
      imageSrc: imgSrc,
      title
    });
  };

  const handleApplyAIText = (aiText: string) => {
    setAuditState((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        observacoesGerais: prev.info.observacoesGerais
          ? `${prev.info.observacoesGerais}\n\n[Recomendação Técnica Eng. SafetyConsult AI]:\n${aiText}`
          : `[Recomendação Técnica Eng. SafetyConsult AI]:\n${aiText}`
      }
    }));
    alert('Recomendação técnica inserida com sucesso nas Observações Gerais do Laudo!');
  };

  // Filtered Sections and Items computation
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return activeDatabase.map((sec) => {
      // If chapter filter is active, check if this section matches
      if (selectedChapter !== 'ALL' && sec.nr !== selectedChapter) {
        return { ...sec, items: [] };
      }

      const matchingItems = sec.items.filter((item) => {
        const ev = auditState.items[item.id] || { status: '', obs: '', prazo: '', responsavel: '' };

        // 1. Status Filter
        if (currentFilter === 'C' && ev.status !== 'C') return false;
        if (currentFilter === 'NC' && ev.status !== 'NC') return false;
        if (currentFilter === 'NA' && ev.status !== 'NA') return false;
        if (currentFilter === 'PENDING' && (ev.status === 'C' || ev.status === 'NC' || ev.status === 'NA')) return false;

        // 2. Search Query
        if (q) {
          const matchId = item.id.toLowerCase().includes(q);
          const matchCode = item.code.toLowerCase().includes(q);
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchText = item.text.toLowerCase().includes(q);
          const matchObs = (ev.obs || '').toLowerCase().includes(q);
          const matchResp = (ev.responsavel || '').toLowerCase().includes(q);
          const matchSec = sec.title.toLowerCase().includes(q);

          if (!matchId && !matchCode && !matchTitle && !matchText && !matchObs && !matchResp && !matchSec) {
            return false;
          }
        }

        return true;
      });

      return {
        ...sec,
        items: matchingItems
      };
    }).filter((sec) => sec.items.length > 0);
  }, [activeDatabase, auditState.items, currentFilter, selectedChapter, searchQuery]);

  const totalFilteredCount = useMemo(() => {
    return filteredSections.reduce((acc, sec) => acc + sec.items.length, 0);
  }, [filteredSections]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-800">
      {/* Header with Navigation, Direct PDF Export and Backup Utilities */}
      <Header
        state={auditState}
        onReset={handleReset}
        onLoadDemo={handleLoadDemo}
        onImportJSON={handleImportJSON}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full space-y-6">
        {activeView === 'report' ? (
          <PrintReportView
            state={auditState}
            onBackToAudit={() => setActiveView('audit')}
          />
        ) : (
          <>
            {/* 1. Identification Section */}
            <AuditIdentification
              info={auditState.info}
              onChange={handleInfoChange}
              checklistMode={activeNR}
            />

            {/* 2. Interactive KPI Dashboard */}
            <AuditDashboard
              state={auditState}
              selectedNR={selectedChapter}
              onFilterByStatus={(st) => setCurrentFilter(st)}
              onSelectNR={(chapter) => setSelectedChapter(chapter)}
            />

            {/* 3. NR Selection Hub, Chapter Filter and Search */}
            <AuditFilters
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalFiltered={totalFilteredCount}
              activeNR={activeNR}
              onSelectNR={handleSelectNR}
            />

            {/* 4. Checklist Sections by Chapter */}
            {filteredSections.length > 0 ? (
              <div className="space-y-5">
                {filteredSections.map((sec) => (
                  <NRSectionCard
                    key={sec.nr}
                    section={sec}
                    items={sec.items}
                    evaluations={auditState.items}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdateField={handleUpdateField}
                    onOpenPhotoModal={handleOpenPhotoModal}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto">
                <FolderSearch className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  Nenhum requisito localizado
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Não encontramos itens para o filtro selecionado ({currentFilter}) ou termo pesquisado "{searchQuery}".
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentFilter('ALL');
                      setSelectedChapter('ALL');
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    Limpar Filtros e Busca
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <img 
              src="/assets/aistudio/Logo_RRV_1126983d.png" 
              alt="RRV Consultoria" 
              className="h-5 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="font-semibold text-[#152744]">
              RRV Consultoria em Segurança do Trabalho · Plataforma Oficial de Laudos Técnicos
            </p>
          </div>
          <p className="text-slate-400">
            Norma ativa: <strong className="text-[#152744]">{getCatalogForMode(activeNR).code}</strong> · Emissão de laudo em PDF com chancela técnica.
          </p>
        </div>
      </footer>

      {/* Floating AI Consultant Button */}
      <button
        onClick={() => setIsAIChatOpen(true)}
        className="fixed bottom-6 right-6 z-30 no-print flex items-center gap-2.5 px-4 py-3 bg-[#13243d] hover:bg-[#1a3356] text-white rounded-full shadow-2xl shadow-slate-900/40 border border-[#74b826]/70 hover:border-[#8dd633] transition-all transform hover:-translate-y-0.5 group cursor-pointer"
        title="Consultar Eng. SafetyConsult AI da RRV Consultoria (Gemini 3.8 + Busca no Google)"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-[#8dd633]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8dd633] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#74b826]"></span>
          </span>
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none flex items-center gap-1.5">
            <span>Consultor IA</span>
            <span className="text-[9px] bg-[#0c182a] text-[#8dd633] px-1 py-0.2 rounded font-mono border border-[#1f3a61]">RRV</span>
          </div>
          <div className="text-[10px] text-slate-300 font-medium">Gemini 3.8 + Google Search</div>
        </div>
      </button>

      {/* Enlarged Photo Modal */}
      <ImageLightboxModal
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        imageSrc={lightbox.imageSrc}
        title={lightbox.title}
      />

      {/* AI Assistant Drawer */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        auditState={auditState}
        onApplyTextToNotes={handleApplyAIText}
      />
    </div>
  );
}
