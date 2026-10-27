import React, { useRef, useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Download, 
  Upload, 
  RotateCcw, 
  FileSpreadsheet, 
  Sparkles,
  FileCheck,
  FileDown,
  Loader2,
  Bot
} from 'lucide-react';
import { AuditMasterState } from '../types/audit';
import { exportAuditToJSON, exportAuditToCSV } from '../utils/exportHelpers';
import { generateAuditPDF } from '../utils/pdfGenerator';

interface HeaderProps {
  state: AuditMasterState;
  onReset: () => void;
  onLoadDemo: () => void;
  onImportJSON: (importedState: AuditMasterState) => void;
  activeView: 'audit' | 'report';
  setActiveView: (view: 'audit' | 'report') => void;
  onOpenAIChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onReset,
  onLoadDemo,
  onImportJSON,
  activeView,
  setActiveView,
  onOpenAIChat
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      await generateAuditPDF(state);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Ocorreu um erro ao gerar o arquivo PDF. Tente novamente.');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.info && parsed.items) {
          onImportJSON(parsed);
        } else {
          alert('Arquivo JSON inválido. Verifique o formato exportado pelo SafetyAudit Master.');
        }
      } catch (err) {
        alert('Erro ao interpretar o arquivo JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="bg-[#13243d] text-white shadow-lg sticky top-0 z-40 no-print border-b border-[#1f3a61]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Official Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-md shadow-black/20 shrink-0 border border-slate-200/50">
              <img 
                src="/assets/aistudio/Logo_RRV_1126983d.png" 
                alt="Logo RRV Consultoria em Segurança do Trabalho" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
                  RRV <span className="text-[#8dd633] font-bold">Consultoria</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#0c182a] text-[#8dd633] px-2 py-0.5 rounded border border-[#1f3a61] hidden sm:inline-block font-mono">
                  {state.checklistMode ? `Norma: ${state.checklistMode}` : 'NR-12'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-tight truncate max-w-xs sm:max-w-md">
                Segurança do Trabalho · Auditoria & Laudos Técnicos
              </p>
            </div>
          </div>

          {/* Mode Switch for Mobile */}
          <div className="flex md:hidden items-center bg-[#0d1a2d] p-1 rounded-lg border border-[#1f3a61]">
            <button
              onClick={() => setActiveView('audit')}
              className={`px-2.5 py-1 text-xs font-semibold rounded ${
                activeView === 'audit' ? 'bg-[#74b826] text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Auditoria
            </button>
            <button
              onClick={() => setActiveView('report')}
              className={`px-2.5 py-1 text-xs font-semibold rounded ${
                activeView === 'report' ? 'bg-[#74b826] text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Laudo
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Switch (Desktop) */}
        <nav className="hidden md:flex items-center bg-[#0d1a2d]/90 p-1 rounded-xl border border-[#1f3a61]">
          <button
            onClick={() => setActiveView('audit')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'audit'
                ? 'bg-[#152744] text-[#8dd633] shadow-sm border border-[#2b4c79]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Checklist de Campo
          </button>
          <button
            onClick={() => setActiveView('report')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'report'
                ? 'bg-[#152744] text-[#8dd633] shadow-sm border border-[#2b4c79]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Laudo Técnico Consolidado
          </button>
        </nav>

        {/* Zone 3: Primary Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* AI Consultant Trigger */}
          <button
            onClick={onOpenAIChat}
            title="Abrir o Consultor Especialista RRV em NRs (Eng. SafetyConsult AI com Google Search)"
            className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#173053] to-[#1f3f6e] hover:from-[#1c3a64] hover:to-[#254d85] rounded-lg transition flex items-center gap-1.5 shadow-sm border border-[#74b826]/40 hover:border-[#74b826] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8dd633]" />
            <span>Consultor IA RRV</span>
            <span className="hidden lg:inline text-[10px] bg-[#0d1a2d] px-1.5 py-0.5 rounded font-normal text-[#8dd633] border border-[#1f3a61]">
              NRs + Busca
            </span>
          </button>

          <button
            onClick={onLoadDemo}
            title="Preencher com dados de exemplo da Célula Robotizada"
            className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#152744] hover:bg-[#1f3a61] rounded-lg border border-[#23406a] transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Exemplo</span>
          </button>

          <button
            onClick={() => exportAuditToCSV(state)}
            title="Exportar dados para Excel (.CSV)"
            className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#152744] hover:bg-[#1f3a61] rounded-lg border border-[#23406a] transition flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#8dd633]" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={() => exportAuditToJSON(state)}
            title="Exportar backup completo em JSON"
            className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#152744] hover:bg-[#1f3a61] rounded-lg border border-[#23406a] transition flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Importar backup de auditoria prévia"
            className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#152744] hover:bg-[#1f3a61] rounded-lg border border-[#23406a] transition flex items-center gap-1.5 shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden sm:inline">Importar</span>
          </button>

          {/* Dedicated PDF Export Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            title="Gerar e baixar o Laudo Técnico oficial RRV em formato PDF (.pdf)"
            className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-[#74b826] hover:bg-[#86d42e] disabled:opacity-70 rounded-lg transition flex items-center gap-1.5 shadow-md shadow-lime-950/20 whitespace-nowrap"
          >
            {isExportingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gerando PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>Exportar Laudo PDF</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            title="Imprimir relatório na impressora ou visualizar no navegador"
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-200 bg-[#152744] hover:bg-[#1f3a61] rounded-lg border border-[#23406a] transition flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <button
            onClick={onReset}
            title="Reiniciar checklist e zerar formulário"
            className="p-1.5 text-rose-300 hover:text-white hover:bg-rose-900/60 rounded-lg border border-rose-900/40 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
