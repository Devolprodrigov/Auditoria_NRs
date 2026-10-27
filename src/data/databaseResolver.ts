import { NRSectionDef, SAFETY_DATABASE } from './safetyDatabase';
import { NR_CATALOGS, NRCatalogMeta } from './nrCatalogs';

export function getCatalogForMode(normId: string = 'NR-12'): NRCatalogMeta {
  if (NR_CATALOGS[normId]) {
    return NR_CATALOGS[normId];
  }

  // Fallback / Multi-NR mode
  return {
    id: "MULTI_NR",
    code: "Multi-NR",
    name: "Auditoria Integrada Multi-Normas",
    shortName: "Integrada (Multi-NR)",
    officialPortaria: "Normas Regulamentadoras MTE/MTP Integradas",
    description: "Auditoria conjunta de conformidade legal abordando máquinas (NR-12), eletricidade (NR-10), EPIs (NR-06), ergonomia (NR-17) e incêndio (NR-23).",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-300",
    iconName: "Layers",
    sections: SAFETY_DATABASE
  };
}

export function getActiveDatabase(normId: string = 'NR-12'): NRSectionDef[] {
  return getCatalogForMode(normId).sections;
}

export function getChecklistTitle(normId: string = 'NR-12'): {
  title: string;
  subtitle: string;
  badge: string;
  officialPortaria: string;
} {
  const meta = getCatalogForMode(normId);
  return {
    title: meta.id === 'MULTI_NR' ? meta.name : `Checklist Oficial ${meta.code} - ${meta.name}`,
    subtitle: `${meta.description} (${meta.officialPortaria})`,
    badge: meta.code,
    officialPortaria: meta.officialPortaria
  };
}

export const AVAILABLE_NRS_LIST = [
  { id: "NR-12", code: "NR-12", label: "NR-12: Máquinas e Equipamentos", badgeColor: "border-blue-300 text-blue-700 bg-blue-50" },
  { id: "NR-10", code: "NR-10", label: "NR-10: Segurança em Eletricidade", badgeColor: "border-amber-300 text-amber-700 bg-amber-50" },
  { id: "NR-06", code: "NR-06", label: "NR-06: Equipamentos de Proteção (EPI)", badgeColor: "border-purple-300 text-purple-700 bg-purple-50" },
  { id: "NR-17", code: "NR-17", label: "NR-17: Ergonomia nos Postos", badgeColor: "border-emerald-300 text-emerald-700 bg-emerald-50" },
  { id: "NR-23", code: "NR-23", label: "NR-23: Proteção Contra Incêndios", badgeColor: "border-rose-300 text-rose-700 bg-rose-50" },
  { id: "NR-35", code: "NR-35", label: "NR-35: Trabalho em Altura", badgeColor: "border-orange-300 text-orange-700 bg-orange-50" },
  { id: "NR-33", code: "NR-33", label: "NR-33: Espaços Confinados", badgeColor: "border-zinc-300 text-zinc-700 bg-zinc-50" },
  { id: "NR-01", code: "NR-01", label: "NR-01: GRO e PGR Ocupacional", badgeColor: "border-slate-300 text-slate-700 bg-slate-50" },
  { id: "MULTI_NR", code: "Multi-NR", label: "Auditoria Integrada Multi-NRs", badgeColor: "border-indigo-300 text-indigo-700 bg-indigo-50" }
];
