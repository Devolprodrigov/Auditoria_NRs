import { AuditMasterState } from '../types/audit';
import { getActiveDatabase } from '../data/databaseResolver';

export function exportAuditToJSON(state: AuditMasterState): void {
  const modePrefix = state.checklistMode === 'NR12_FULL' ? 'auditoria_nr12' : 'auditoria_multi_nr';
  const fileName = `${modePrefix}_${state.info.tag || 'relatorio'}_${state.info.data || 'data'}.json`
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '_');
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportAuditToCSV(state: AuditMasterState): void {
  const rows: string[][] = [
    ["ID", "Norma / Capítulo", "Código", "Requisito / Título", "Descrição", "Status", "Grau de Risco", "Observação / Plano de Ação", "Responsável", "Prazo", "Evidência Fotográfica"]
  ];

  const db = getActiveDatabase(state.checklistMode);

  for (const section of db) {
    for (const item of section.items) {
      const evalData = state.items[item.id] || { status: '', obs: '', prazo: '', responsavel: '', riskLevel: '' };
      const statusLabel = 
        evalData.status === 'C' ? 'Conforme' :
        evalData.status === 'NC' ? 'Não Conforme' :
        evalData.status === 'NA' ? 'Não Aplicável' : 'Pendente';

      rows.push([
        item.id,
        section.title,
        item.code,
        item.title,
        item.text.replace(/"/g, '""'),
        statusLabel,
        evalData.riskLevel || '-',
        (evalData.obs || '').replace(/"/g, '""'),
        evalData.responsavel || '-',
        evalData.prazo || '-',
        evalData.photo ? 'Sim' : 'Não'
      ]);
    }
  }

  // Format CSV with semicolon delimiter (standard for PT-BR Excel)
  const csvContent = "\uFEFF" + rows.map(r => r.map(c => `"${c}"`).join(";")).join("\r\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const modePrefix = state.checklistMode === 'NR12_FULL' ? 'relatorio_nr12' : 'relatorio_auditoria';
  const fileName = `${modePrefix}_${state.info.tag || 'export'}_${state.info.data || 'data'}.csv`
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '_');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
