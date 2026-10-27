import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuditMasterState } from '../types/audit';
import { getActiveDatabase, getChecklistTitle } from '../data/databaseResolver';

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch('/assets/aistudio/Logo_RRV_1126983d.png');
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Generates and downloads a complete, structured, professional PDF inspection report
 * containing identification details, quantitative indicators, 5W2H corrective action plan,
 * item-by-item compliance evaluation table, photographic evidence gallery, and formal signature lines.
 */
export async function generateAuditPDF(state: AuditMasterState): Promise<void> {
  const { info, items, checklistMode = 'NR12_FULL' } = state;
  const db = getActiveDatabase(checklistMode);
  const meta = getChecklistTitle(checklistMode);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Compute statistics
  let totalItems = 0;
  let conformes = 0;
  let naoConformes = 0;
  let naoAplicaveis = 0;
  let pendentes = 0;

  const ncList: Array<{
    id: string;
    nr: string;
    code: string;
    title: string;
    obs: string;
    risk: string;
    responsavel: string;
    prazo: string;
  }> = [];

  const photosList: Array<{
    id: string;
    nr: string;
    code: string;
    title: string;
    photo: string;
    description: string;
  }> = [];

  db.forEach((sec) => {
    sec.items.forEach((item) => {
      totalItems++;
      const ev = items[item.id];
      if (ev?.status === 'C') conformes++;
      else if (ev?.status === 'NC') {
        naoConformes++;
        ncList.push({
          id: item.id,
          nr: item.nr,
          code: item.code,
          title: item.title,
          obs: ev.obs || 'Não conformidade registrada sem detalhamento.',
          risk: ev.riskLevel || 'Médio',
          responsavel: ev.responsavel || 'A definir',
          prazo: ev.prazo || 'Imediato'
        });
      } else if (ev?.status === 'NA') naoAplicaveis++;
      else pendentes++;

      if (ev?.photo) {
        photosList.push({
          id: item.id,
          nr: item.nr,
          code: item.code,
          title: item.title,
          photo: ev.photo,
          description: ev.photoDescription || ev.obs || `Evidência fotográfica para ${item.code}`
        });
      }
    });
  });

  const evaluated = conformes + naoConformes;
  const compliancePct = evaluated > 0 ? Math.round((conformes / evaluated) * 100) : 0;

  const logoData = await loadLogoDataUrl();

  // 1. Header Banner
  doc.setFillColor(21, 39, 68); // #152744 (RRV Navy)
  doc.rect(0, 0, pageWidth, 30, 'F');

  // Vibrant Lime Green badge bar
  doc.setFillColor(116, 184, 38); // #74b826 (RRV Lime Green)
  doc.rect(0, 30, pageWidth, 2.5, 'F');

  let textStartX = margin;
  if (logoData) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, 4, 22, 22, 2, 2, 'F');
      doc.addImage(logoData, 'PNG', margin + 1, 5, 20, 20);
      textStartX = margin + 26;
    } catch (e) {
      console.warn('Erro ao desenhar logo no PDF:', e);
    }
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('RRV CONSULTORIA', textStartX, 11);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(141, 214, 51); // #8dd633
  doc.text('SEGURANÇA DO TRABALHO · AUDITORIA & LAUDOS TÉCNICOS', textStartX, 16);

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(
    checklistMode === 'NR12_FULL' 
      ? 'LAUDO DE AUDITORIA DE CONFORMIDADE TÉCNICA - NR-12' 
      : 'LAUDO TÉCNICO DE INSPEÇÃO E CONFORMIDADE LEGAL', 
    textStartX, 
    23
  );

  // Document meta info (right aligned)
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  const docDate = info.data || new Date().toISOString().split('T')[0];
  const docCode = `RRV-LAUDO-${(info.tag || 'POSTO').toUpperCase()}-${new Date().getFullYear()}`;
  doc.text(docCode, pageWidth - margin, 11, { align: 'right' });
  doc.text(`Data da Auditoria: ${docDate}`, pageWidth - margin, 16, { align: 'right' });
  doc.text(
    checklistMode === 'NR12_FULL' ? 'NR-12 (Portaria MTP 4.219/2022)' : 'Normas Regulamentadoras', 
    pageWidth - margin, 
    23, 
    { align: 'right' }
  );

  let currentY = 38;

  // 2. Section 1: Dados Cadastrais
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('1. IDENTIFICAÇÃO DO ESTABELECIMENTO E POSTO AUDITADO', margin, currentY);
  currentY += 4;

  const idRows = [
    [
      { content: 'Empresa / Razão Social:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.empresa || 'Não informado' },
      { content: 'Data da Auditoria:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.data || 'Não informado' }
    ],
    [
      { content: 'Máquina / Posto / Área:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.posto || 'Não informado' },
      { content: 'Tag / Patrimônio:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.tag || 'Não informado' }
    ],
    [
      { content: 'Setor / Departamento:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.setor || 'Não informado' },
      { content: 'Gestor Acompanhante:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.responsavel || 'Não informado' }
    ],
    [
      { content: 'Auditor Técnico:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.inspetor || 'Não informado' },
      { content: 'Registro CREA / MTE:', styles: { fontStyle: 'bold' as const, fillColor: [248, 250, 252] as [number, number, number] } },
      { content: info.creaMte || 'Não informado' }
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    body: idRows,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    columnStyles: {
      0: { cellWidth: 42 },
      1: { cellWidth: 50 },
      2: { cellWidth: 42 },
      3: { cellWidth: 48 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 3;

  // Technical Opinion Callout
  let parecerBg: [number, number, number] = [240, 253, 244];
  let parecerText: [number, number, number] = [21, 128, 61];
  let parecerBorder: [number, number, number] = [134, 239, 172];

  if (info.parecer === 'Liberado com Restrições (Plano de Ação)') {
    parecerBg = [254, 243, 199];
    parecerText = [180, 83, 9];
    parecerBorder = [252, 211, 77];
  } else if (info.parecer === 'Interditado / Paralisado (Grave e Iminente Risco)') {
    parecerBg = [255, 241, 242];
    parecerText = [190, 18, 60];
    parecerBorder = [253, 164, 175];
  }

  doc.setFillColor(...parecerBg);
  doc.setDrawColor(...parecerBorder);
  doc.rect(margin, currentY, contentWidth, 12, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...parecerText);
  doc.text(`PARECER TÉCNICO CONCLUSIVO: ${info.parecer.toUpperCase()}`, margin + 3, currentY + 5);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const obsText = info.observacoesGerais || 'Sem observações adicionais registradas.';
  const splitObs = doc.splitTextToSize(`Observações Gerais: ${obsText}`, contentWidth - 6);
  doc.text(splitObs, margin + 3, currentY + 9.5);

  currentY += 16;

  // 2. Section 2: Resumo Executivo e Indicadores
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. RESUMO EXECUTIVO DE INDICADORES DE CONFORMIDADE', margin, currentY);
  currentY += 4;

  const kpiData = [
    [
      { content: 'Total de Requisitos', styles: { halign: 'center' as const, fontStyle: 'bold' as const } },
      { content: 'Conformes (C)', styles: { halign: 'center' as const, fontStyle: 'bold' as const, textColor: [22, 163, 74] as [number, number, number] } },
      { content: 'Não Conformes (NC)', styles: { halign: 'center' as const, fontStyle: 'bold' as const, textColor: [225, 29, 72] as [number, number, number] } },
      { content: 'Não Aplicáveis (NA)', styles: { halign: 'center' as const, fontStyle: 'bold' as const, textColor: [217, 119, 6] as [number, number, number] } },
      { content: 'Pendentes', styles: { halign: 'center' as const, fontStyle: 'bold' as const, textColor: [100, 116, 139] as [number, number, number] } },
      { content: 'Taxa Conformidade', styles: { halign: 'center' as const, fontStyle: 'bold' as const, textColor: [15, 23, 42] as [number, number, number] } }
    ],
    [
      { content: String(totalItems), styles: { halign: 'center' as const, fontSize: 11, fontStyle: 'bold' as const } },
      { content: String(conformes), styles: { halign: 'center' as const, fontSize: 11, fontStyle: 'bold' as const, textColor: [22, 163, 74] as [number, number, number], fillColor: [240, 253, 244] as [number, number, number] } },
      { content: String(naoConformes), styles: { halign: 'center' as const, fontSize: 11, fontStyle: 'bold' as const, textColor: [225, 29, 72] as [number, number, number], fillColor: [255, 241, 242] as [number, number, number] } },
      { content: String(naoAplicaveis), styles: { halign: 'center' as const, fontSize: 11, fontStyle: 'bold' as const, textColor: [217, 119, 6] as [number, number, number], fillColor: [254, 243, 199] as [number, number, number] } },
      { content: String(pendentes), styles: { halign: 'center' as const, fontSize: 11, fontStyle: 'bold' as const } },
      { content: `${compliancePct}%`, styles: { halign: 'center' as const, fontSize: 12, fontStyle: 'bold' as const, textColor: [255, 255, 255] as [number, number, number], fillColor: [15, 23, 42] as [number, number, number] } }
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    body: kpiData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // 4. Section 3: Plano de Ação 5W2H (se houver NCs)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`3. MATRIZ DO PLANO DE AÇÃO CORRETIVA (5W2H) - (${ncList.length} NÃO CONFORMIDADES)`, margin, currentY);
  currentY += 4;

  if (ncList.length > 0) {
    const ncRows = ncList.map((nc) => [
      `${nc.id}\n(${nc.nr})`,
      `${nc.code}\n${nc.title}`,
      nc.risk,
      nc.obs,
      nc.responsavel,
      nc.prazo
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [['Item/Cap.', 'Requisito', 'Risco', 'Ação Corretiva / Recomendação Técnica', 'Responsável', 'Prazo']],
      body: ncRows,
      theme: 'grid',
      headStyles: {
        fillColor: [225, 29, 72], // rose-600
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'left'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2,
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 38 },
        2: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 62 },
        4: { cellWidth: 26 },
        5: { cellWidth: 24, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          const val = data.cell.raw;
          if (val === 'Crítico') {
            data.cell.styles.fillColor = [255, 241, 242];
            data.cell.styles.textColor = [190, 18, 60];
          } else if (val === 'Alto') {
            data.cell.styles.fillColor = [255, 237, 213];
            data.cell.styles.textColor = [194, 65, 12];
          } else if (val === 'Médio') {
            data.cell.styles.fillColor = [254, 243, 199];
            data.cell.styles.textColor = [180, 83, 9];
          } else {
            data.cell.styles.fillColor = [239, 246, 255];
            data.cell.styles.textColor = [29, 78, 216];
          }
        }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 6;
  } else {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(134, 239, 172);
    doc.rect(margin, currentY, contentWidth, 10, 'FD');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(21, 128, 61);
    doc.text('Nenhuma não conformidade (NC) registrada. O posto inspecionado atende aos requisitos auditados.', margin + 3, currentY + 6);
    currentY += 14;
  }

  // Check if we need a new page for detailed items
  if (currentY > pageHeight - 60) {
    doc.addPage();
    currentY = 20;
  }

  // 5. Section 4: Detalhamento Item a Item
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(
    checklistMode === 'NR12_FULL' 
      ? '4. DETALHAMENTO DAS AVALIAÇÕES POR CAPÍTULO DA NR-12' 
      : '4. DETALHAMENTO DAS AVALIAÇÕES ITEM A ITEM POR NORMA REGULAMENTADORA', 
    margin, 
    currentY
  );
  currentY += 4;

  for (const section of db) {
    // If not enough room for section header and at least 2 rows, add page
    if (currentY > pageHeight - 45) {
      doc.addPage();
      currentY = 20;
    }

    const rows = section.items.map((item) => {
      const ev = items[item.id];
      let statusLabel = 'PENDENTE';
      if (ev?.status === 'C') statusLabel = 'CONFORME';
      else if (ev?.status === 'NC') statusLabel = 'NÃO CONFORME';
      else if (ev?.status === 'NA') statusLabel = 'NÃO APLICÁVEL';

      let details = item.text;
      if (ev?.obs) {
        details += `\n[Nota de Auditoria]: ${ev.obs}`;
      }
      if (ev?.photo) {
        details += ` (Evidência fotográfica anexada)`;
      }

      return [
        item.id,
        item.code,
        item.title,
        details,
        statusLabel
      ];
    });

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [[
        { content: `${section.title.toUpperCase()}`, colSpan: 5, styles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' } }
      ], ['ID', 'Código', 'Título', 'Requisito / Detalhes de Campo', 'Avaliação']],
      body: rows,
      theme: 'grid',
      headStyles: {
        fillColor: [71, 85, 105],
        textColor: [255, 255, 255],
        fontSize: 7.5,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.8,
        lineColor: [226, 232, 240],
        lineWidth: 0.2,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 20, fontStyle: 'bold' },
        2: { cellWidth: 32, fontStyle: 'bold' },
        3: { cellWidth: 88 },
        4: { cellWidth: 28, halign: 'center', fontStyle: 'bold' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          const val = data.cell.raw;
          if (val === 'CONFORME') {
            data.cell.styles.fillColor = [240, 253, 244];
            data.cell.styles.textColor = [22, 163, 74];
          } else if (val === 'NÃO CONFORME') {
            data.cell.styles.fillColor = [255, 241, 242];
            data.cell.styles.textColor = [225, 29, 72];
          } else if (val === 'NÃO APLICÁVEL') {
            data.cell.styles.fillColor = [254, 243, 199];
            data.cell.styles.textColor = [217, 119, 6];
          } else {
            data.cell.styles.fillColor = [241, 245, 249];
            data.cell.styles.textColor = [100, 116, 139];
          }
        }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 4;
  }

  // 6. Section 5: Galeria de Evidências Fotográficas (se houver fotos)
  if (photosList.length > 0) {
    doc.addPage();
    currentY = 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`5. REGISTRO FOTOGRÁFICO DE EVIDÊNCIAS DE CAMPO (${photosList.length} FOTOS)`, margin, currentY);
    currentY += 6;

    const photoCardWidth = (contentWidth - 6) / 2; // 2 columns
    const photoCardHeight = 62;

    for (let i = 0; i < photosList.length; i++) {
      const p = photosList[i];
      const isSecondCol = i % 2 === 1;
      const posX = isSecondCol ? margin + photoCardWidth + 6 : margin;

      // If at start of a pair and would overflow page
      if (!isSecondCol && currentY + photoCardHeight > pageHeight - 30) {
        doc.addPage();
        currentY = 20;
      }

      // Draw photo container card
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.rect(posX, currentY, photoCardWidth, photoCardHeight, 'FD');

      try {
        doc.addImage(p.photo, 'JPEG', posX + 2, currentY + 2, photoCardWidth - 4, 44, undefined, 'FAST');
      } catch (err) {
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text('[Imagem em formato incompatível]', posX + 4, currentY + 20);
      }

      // Caption
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${p.id} - ${p.code}`, posX + 3, currentY + 50);

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const cap = doc.splitTextToSize(p.description, photoCardWidth - 6);
      doc.text(cap, posX + 3, currentY + 54);

      if (isSecondCol || i === photosList.length - 1) {
        currentY += photoCardHeight + 5;
      }
    }
  }

  // 7. Section 6: Termo de Encerramento e Assinaturas
  if (currentY > pageHeight - 55) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 6;
  }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('6. TERMO DE ENCERRAMENTO E ASSINATURAS FORMAIS', margin, currentY);
  currentY += 4;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(
    'O presente laudo técnico expressa as condições fáticas de segurança e conformidade normativa inspecionadas no momento da auditoria.',
    margin,
    currentY
  );
  currentY += 16;

  // Signature lines
  const sigBoxWidth = (contentWidth - 14) / 2;

  // Auditor line
  const auditorX = margin;
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.3);
  doc.line(auditorX + 10, currentY, auditorX + sigBoxWidth - 10, currentY);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(info.inspetor || 'Auditor Técnico / Engenheiro Responsável', auditorX + sigBoxWidth / 2, currentY + 4, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Registro: ${info.creaMte || 'CREA / MTE'}`, auditorX + sigBoxWidth / 2, currentY + 8, { align: 'center' });
  doc.text('Engenharia de Segurança do Trabalho', auditorX + sigBoxWidth / 2, currentY + 11.5, { align: 'center' });

  // Area manager line
  const gestorX = margin + sigBoxWidth + 14;
  doc.line(gestorX + 10, currentY, gestorX + sigBoxWidth - 10, currentY);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(info.responsavel || 'Gestor / Líder da Área Auditada', gestorX + sigBoxWidth / 2, currentY + 4, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(info.setor || 'Responsável pelo Estabelecimento', gestorX + sigBoxWidth / 2, currentY + 8, { align: 'center' });
  doc.text('Ciente das Constatações e Prazos do Plano de Ação', gestorX + sigBoxWidth / 2, currentY + 11.5, { align: 'center' });

  // 8. Footers and Page Numbers across all pages
  const totalPages = doc.getNumberOfPages();
  const now = new Date();
  const timestampStr = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    // Bottom hairline divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    // Left: Document tracking
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `RRV Consultoria em Segurança do Trabalho · Emissão Oficial em ${timestampStr} · Tag: ${info.tag || 'POSTO'}`,
      margin,
      pageHeight - 6
    );

    // Right: Page number
    doc.text(
      `Página ${page} de ${totalPages}`,
      pageWidth - margin,
      pageHeight - 6,
      { align: 'right' }
    );
  }

  // Trigger browser download
  const cleanTag = (info.tag || 'auditoria').replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanDate = (info.data || 'data').replace(/[^a-zA-Z0-9_-]/g, '_');
  const prefix = checklistMode === 'NR12_FULL' ? 'rrv_laudo_nr12' : 'rrv_laudo_auditoria';
  const filename = `${prefix}_${cleanTag}_${cleanDate}.pdf`.toLowerCase();

  doc.save(filename);
}
