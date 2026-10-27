import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  ArrowLeft,
  FileDown,
  Loader2,
  FileText
} from 'lucide-react';
import { AuditMasterState } from '../types/audit';
import { getActiveDatabase } from '../data/databaseResolver';
import { generateAuditPDF } from '../utils/pdfGenerator';

interface PrintReportViewProps {
  state: AuditMasterState;
  onBackToAudit: () => void;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({ state, onBackToAudit }) => {
  const { info, items, checklistMode = 'NR12_FULL' } = state;
  const db = getActiveDatabase(checklistMode);
  const isNR12Only = checklistMode === 'NR12_FULL';

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateAuditPDF(state);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Não foi possível gerar o arquivo PDF. Tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Compute statistics
  let total = 0;
  let cCount = 0;
  let ncCount = 0;
  let naCount = 0;
  let pendingCount = 0;

  const ncItemsList: Array<{
    id: string;
    nr: string;
    code: string;
    title: string;
    obs: string;
    responsavel: string;
    prazo: string;
    riskLevel?: string;
    photo?: string;
  }> = [];

  const photoEvidenceList: Array<{
    id: string;
    title: string;
    nr: string;
    photo: string;
    description: string;
  }> = [];

  db.forEach((sec) => {
    sec.items.forEach((item) => {
      total++;
      const ev = items[item.id];
      if (ev?.status === 'C') cCount++;
      else if (ev?.status === 'NC') {
        ncCount++;
        ncItemsList.push({
          id: item.id,
          nr: item.nr,
          code: item.code,
          title: item.title,
          obs: ev.obs || 'Não conformidade registrada sem detalhamento adicional.',
          responsavel: ev.responsavel || 'A definir pela gerência',
          prazo: ev.prazo || 'Imediato',
          riskLevel: ev.riskLevel || 'Médio',
          photo: ev.photo
        });
      } else if (ev?.status === 'NA') naCount++;
      else pendingCount++;

      if (ev?.photo) {
        photoEvidenceList.push({
          id: item.id,
          title: item.title,
          nr: item.nr,
          photo: ev.photo,
          description: ev.photoDescription || ev.obs || `Evidência fotográfica para ${item.code}`
        });
      }
    });
  });

  const evaluated = cCount + ncCount;
  const compliancePct = evaluated > 0 ? Math.round((cCount / evaluated) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 md:p-10 print-shadow-none max-w-5xl mx-auto space-y-8">
      {/* Non-print toolbar bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 no-print">
        <button
          onClick={onBackToAudit}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Checklist de Campo
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          {/* Direct PDF Download Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 bg-[#74b826] hover:bg-[#86d42e] disabled:opacity-70 text-slate-950 font-bold rounded-lg text-xs transition flex items-center gap-2 shadow-md shadow-lime-950/20 whitespace-nowrap"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando Laudo Oficial RRV em PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                <span>Baixar Laudo Oficial RRV (.pdf)</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-[#152744] text-white rounded-lg text-xs font-semibold hover:bg-[#1f3a61] transition flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Official Document Header with RRV Consultoria Logo */}
      <div className="border-b-2 border-[#152744] pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-200 shrink-0">
              <img 
                src="/assets/aistudio/Logo_RRV_1126983d.png" 
                alt="RRV Consultoria em Segurança do Trabalho" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#152744] flex items-center gap-1.5">
                <span>RRV Consultoria em Segurança do Trabalho</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#74b826]"></span>
                <span className="text-slate-500 font-medium lowercase">Laudo Oficial</span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isNR12Only 
                  ? 'LAUDO TÉCNICO DE AUDITORIA DE CONFORMIDADE - NR-12'
                  : 'LAUDO TÉCNICO DE AUDITORIA DE SEGURANÇA DO TRABALHO'}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                {isNR12Only
                  ? 'Segurança no Trabalho em Máquinas e Equipamentos (Portaria MTP nº 4.219/2022)'
                  : 'Conformidade Integrada com as Normas Regulamentadoras: NR-12, NR-10, NR-06, NR-17 e NR-23'}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
            <p><strong>Emissão:</strong> {info.data || new Date().toISOString().split('T')[0]}</p>
            <p><strong>Documento nº:</strong> RRV-LAUDO-{(info.tag || 'POSTO').toUpperCase()}-{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Identification Table */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-slate-600" />
          1. Dados Cadastrais do Estabelecimento e Máquina / Posto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-slate-500 block text-[11px]">Empresa / Estabelecimento:</span>
            <strong className="text-slate-900">{info.empresa || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Equipamento / Posto:</span>
            <strong className="text-slate-900">{info.posto || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Tag / Patrimônio:</span>
            <strong className="text-slate-900 font-mono">{info.tag || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Setor / Departamento:</span>
            <strong className="text-slate-900">{info.setor || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Auditor Responsável:</span>
            <strong className="text-slate-900">{info.inspetor || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Registro CREA / MTE:</span>
            <strong className="text-slate-900 font-mono">{info.creaMte || 'Não informado'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Data da Auditoria:</span>
            <strong className="text-slate-900">{info.data || 'Não informada'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Líder da Área Auditada:</span>
            <strong className="text-slate-900">{info.responsavel || 'Não informado'}</strong>
          </div>
        </div>

        {/* Technical Assessment Box */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-slate-500 block text-[11px]">Parecer Técnico Conclusivo:</span>
            <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border mt-0.5 ${
              info.parecer === 'Aprovado / Liberado' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
              info.parecer === 'Liberado com Restrições (Plano de Ação)' ? 'bg-amber-100 text-amber-800 border-amber-300' :
              'bg-rose-100 text-rose-800 border-rose-300'
            }`}>
              {info.parecer}
            </span>
          </div>
          {info.observacoesGerais && (
            <div className="sm:max-w-md text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
              <strong className="text-slate-800">Observações:</strong> {info.observacoesGerais}
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary & Compliance Score */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          2. Resumo Executivo de Conformidade Legal
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 block uppercase">Total Avaliado</span>
            <span className="text-2xl font-bold text-slate-800 tabular-nums">{evaluated} / {total}</span>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-700 block uppercase">Conformes (C)</span>
            <span className="text-2xl font-bold text-emerald-700 tabular-nums">{cCount}</span>
          </div>
          <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200">
            <span className="text-[11px] font-semibold text-rose-700 block uppercase">Não Conformes (NC)</span>
            <span className="text-2xl font-bold text-rose-700 tabular-nums">{ncCount}</span>
          </div>
          <div className="p-3.5 bg-[#152744] text-white rounded-xl shadow-xs border border-[#1f3a61]">
            <span className="text-[11px] font-semibold text-[#8dd633] block uppercase">Índice Conformidade</span>
            <span className="text-2xl font-bold text-[#8dd633] tabular-nums">{compliancePct}%</span>
          </div>
        </div>
      </div>

      {/* Consolidated Action Plan (5W2H) for NCs */}
      <div className="print-break-inside-avoid">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>3. Matriz do Plano de Ação Corretiva (5W2H)</span>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
            {ncItemsList.length} Ações Requeridas
          </span>
        </h2>

        {ncItemsList.length > 0 ? (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Item / Cap.</th>
                  <th className="py-2.5 px-3">Requisito Violado</th>
                  <th className="py-2.5 px-3">Gravidade</th>
                  <th className="py-2.5 px-3">Ação Corretiva / Recomendação</th>
                  <th className="py-2.5 px-3">Responsável</th>
                  <th className="py-2.5 px-3">Prazo Limite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ncItemsList.map((nc) => (
                  <tr key={nc.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {nc.id} ({nc.nr})
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {nc.code} - {nc.title}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        nc.riskLevel === 'Crítico' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                        nc.riskLevel === 'Alto' ? 'bg-orange-100 text-orange-800 border-orange-300' :
                        nc.riskLevel === 'Médio' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {nc.riskLevel || 'Médio'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {nc.obs}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                      {nc.responsavel}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-800 whitespace-nowrap">
                      {nc.prazo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs">
            Parabéns! Nenhuma não conformidade (NC) foi apontada nesta auditoria. O posto atende integralmente aos requisitos normativos auditados.
          </div>
        )}
      </div>

      {/* Complete Check Table */}
      <div className="print-break-inside-avoid space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          {isNR12Only 
            ? '4. Relação Completa dos Requisitos Inspecionados por Capítulo da NR-12' 
            : '4. Relação Completa dos Requisitos Inspecionados por NR'}
        </h2>

        {db.map((sec) => (
          <div key={sec.nr} className="border border-slate-200 rounded-xl overflow-hidden mb-4">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{sec.title}</span>
              <span className="text-slate-500">{sec.items.length} requisitos</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-2 px-3 w-16">Item</th>
                  <th className="py-2 px-3 w-28">Código</th>
                  <th className="py-2 px-3">Descrição do Requisito Normativo</th>
                  <th className="py-2 px-3 w-24 text-center">Parecer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sec.items.map((item) => {
                  const ev = items[item.id];
                  const st = ev?.status;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono font-bold text-slate-700">{item.id}</td>
                      <td className="py-2 px-3 font-semibold text-slate-600">{item.code}</td>
                      <td className="py-2 px-3 text-slate-700">
                        <strong className="text-slate-900 block">{item.title}</strong>
                        {item.text}
                        {ev?.obs && (
                          <span className="block mt-1 text-[11px] text-slate-500 italic">
                            Obs: {ev.obs}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-center whitespace-nowrap font-bold">
                        {st === 'C' && (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Conforme
                          </span>
                        )}
                        {st === 'NC' && (
                          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            Não Conforme
                          </span>
                        )}
                        {st === 'NA' && (
                          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Não Aplicável
                          </span>
                        )}
                        {!st && (
                          <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            Pendente
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Photo Gallery (if any) */}
      {photoEvidenceList.length > 0 && (
        <div className="print-break-inside-avoid">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            5. Registro Fotográfico de Evidências de Campo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photoEvidenceList.map((photo, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden p-2.5 bg-slate-50 text-xs">
                <img
                  src={photo.photo}
                  alt={photo.title}
                  className="w-full h-36 object-cover rounded-lg border border-slate-200 mb-2"
                />
                <span className="font-bold text-slate-800 block text-[11px]">{photo.id} - {photo.title}</span>
                <p className="text-slate-600 text-[10px] truncate">{photo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signatures & Formal Closure */}
      <div className="print-break-inside-avoid pt-12 pb-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-8 text-center sm:text-left">
          6. Termo de Encerramento e Assinaturas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-6">
          <div className="text-center">
            <div className="border-t border-slate-400 w-4/5 mx-auto mb-2"></div>
            <strong className="block text-xs text-slate-900">{info.inspetor || 'Auditor / Inspetor Responsável'}</strong>
            <span className="text-[11px] text-slate-500 font-mono block">
              Registro: {info.creaMte || 'CREA / MTE'}
            </span>
            <span className="text-[10px] text-slate-400">Engenharia de Segurança do Trabalho</span>
          </div>

          <div className="text-center">
            <div className="border-t border-slate-400 w-4/5 mx-auto mb-2"></div>
            <strong className="block text-xs text-slate-900">{info.responsavel || 'Gestor / Líder da Área Auditada'}</strong>
            <span className="text-[11px] text-slate-500 block">
              {info.setor || 'Responsável pelo Estabelecimento'}
            </span>
            <span className="text-[10px] text-slate-400">Ciente do Relatório e Prazos do Plano de Ação</span>
          </div>
        </div>
      </div>
    </div>
  );
};
