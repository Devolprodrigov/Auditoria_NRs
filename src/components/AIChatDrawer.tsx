import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Globe, 
  Bot, 
  User, 
  Loader2, 
  RotateCcw, 
  ExternalLink, 
  Copy, 
  Check, 
  Zap, 
  ShieldAlert, 
  Lightbulb, 
  Search,
  Maximize2,
  Minimize2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { AuditMasterState, ChecklistMode } from '../types/audit';
import { getCatalogForMode } from '../data/databaseResolver';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: Array<{ title: string; uri: string }>;
  timestamp: string;
  isError?: boolean;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  auditState: AuditMasterState;
  onApplyTextToNotes?: (text: string) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  auditState,
  onApplyTextToNotes,
}) => {
  const activeNR = auditState.checklistMode || 'NR-12';
  const catalog = getCatalogForMode(activeNR);

  // Model & Search Grounding settings
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [useSearch, setUseSearch] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Conversation history
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      text: `Olá! Sou o **Consultor IA da RRV Consultoria em Segurança do Trabalho**, seu assistente pericial em SST e Normas Regulamentadoras.\n\nEstou conectado aos dados da sua auditoria ativa para a **${catalog.code}** (${catalog.shortName}). Posso analisar não conformidades, sugerir planos de ação **5W2H**, consultar atualizações oficiais do MTE com busca no Google e calcular distâncias seguras (NBR ISO 13857 / NBR 14153). Como posso ajudar a RRV hoje?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Extract Non-Conformities from state for context
  const nonConformities = Object.entries(auditState.items)
    .filter(([_, item]) => item.status === 'NC')
    .map(([itemId, item]) => ({
      itemId,
      obs: item.obs || 'Sem observações registradas',
      riskLevel: item.riskLevel || 'Não definido',
      responsavel: item.responsavel || 'Não definido',
      prazo: item.prazo || 'Sem prazo'
    }));

  const totalEvaluated = Object.values(auditState.items).filter(
    (it) => it.status === 'C' || it.status === 'NC' || it.status === 'NA'
  ).length;

  const conformesCount = Object.values(auditState.items).filter((it) => it.status === 'C').length;

  // Context payload sent to server
  const getAuditContextPayload = () => ({
    activeNR: `${catalog.code} - ${catalog.name}`,
    empresa: auditState.info.empresa,
    posto: auditState.info.posto,
    tag: auditState.info.tag,
    setor: auditState.info.setor,
    totalItems: totalEvaluated,
    conformes: conformesCount,
    naoConformes: nonConformities.length,
    ncList: nonConformities
  });

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation payload for server
      const apiMessages = newHistory
        .filter(m => !m.isError)
        .map(m => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          model: selectedModel,
          useSearch: selectedModel === 'gemini-3.8-flash' ? useSearch : false,
          auditContext: getAuditContextPayload(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erro HTTP ${response.status}: Falha na resposta da IA`);
      }

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'Resposta recebida sem conteúdo de texto.',
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Falha ao enviar mensagem:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: `⚠️ **Atenção:** ${err.message || 'Não foi possível se comunicar com o assistente.'}\n\n*Dica: Verifique se sua chave GEMINI_API_KEY está configurada no painel de Secrets ou tente novamente.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (window.confirm('Deseja limpar todo o histórico desta conversa com o assistente?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'model',
          text: `Histórico reiniciado. Como posso orientar sua auditoria da **${catalog.code}** agora?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }
  };

  // Quick suggestions tailored to active NR
  const quickPrompts = [
    {
      label: `Plano 5W2H para as ${nonConformities.length} Não Conformidades`,
      prompt: `Analise as ${nonConformities.length} não conformidades detectadas na auditoria atual da ${catalog.code} para o equipamento "${auditState.info.posto || 'Máquina/Instalação'}" e elabore um Plano de Ação estruturado em 5W2H com prazos e priorização técnica.`,
      icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
    },
    {
      label: 'Consultar exigências no MTE (Google Search)',
      prompt: `Pesquise no Google as portarias e regulamentações mais recentes do Ministério do Trabalho e Emprego (MTE) relativas à ${catalog.code} e informe os principais pontos de atenção exigidos pelos Auditores Fiscais do Trabalho.`,
      icon: <Globe className="w-3.5 h-3.5 text-sky-500" />
    },
    {
      label: 'Distâncias de Segurança NBR ISO 13857',
      prompt: `Explique detalhadamente como calcular as distâncias de segurança para zonas de perigo de máquinas segundo a NBR ISO 13857 e o Anexo II da NR-12 (alcance por cima e através de aberturas).`,
      icon: <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
    },
    {
      label: 'Validação e Emissão de ART',
      prompt: `Quais são as atribuições legais exigidas para o Engenheiro de Segurança do Trabalho emitir o laudo de conformidade com ART no CREA para a ${catalog.code}?`,
      icon: <FileText className="w-3.5 h-3.5 text-indigo-500" />
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className={`bg-white h-full shadow-2xl flex flex-col transition-all duration-300 border-l border-slate-200 ${
          isExpanded ? 'w-full md:w-4/5 lg:w-3/4' : 'w-full sm:w-[500px] md:w-[540px]'
        }`}
      >
        {/* Header with RRV Consultoria Logo */}
        <div className="bg-[#13243d] text-white px-5 py-4 flex items-center justify-between border-b border-[#1f3a61] shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-slate-200 shrink-0">
              <img 
                src="/assets/aistudio/Logo_RRV_1126983d.png" 
                alt="RRV Consultoria" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                  Consultor IA RRV
                </h3>
                <span className="bg-[#0c182a] text-[#8dd633] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#1f3a61] font-mono">
                  {catalog.code}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1">
                RRV Consultoria em SST & Busca Grounding no Google
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <button
              onClick={handleResetChat}
              title="Reiniciar histórico de mensagens"
              className="p-1.5 hover:text-white hover:bg-[#1f3a61] rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Reduzir largura" : "Expandir painel"}
              className="p-1.5 hover:text-white hover:bg-[#1f3a61] rounded-lg transition hidden sm:inline-flex"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title="Fechar assistente"
              className="p-1.5 hover:text-white hover:bg-[#1f3a61] rounded-lg transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Control Toolbar: Model Selector & Google Search Grounding Toggle */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          {/* Model Selector */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedModel('gemini-3.8-flash')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition flex items-center gap-1 ${
                selectedModel === 'gemini-3.8-flash'
                  ? 'bg-[#152744] text-[#8dd633] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#8dd633]" />
              <span>gemini-3.8-flash</span>
              <span className="text-[9px] opacity-75 font-normal">(Raciocínio)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition flex items-center gap-1 ${
                selectedModel === 'gemini-3.1-flash-lite'
                  ? 'bg-[#152744] text-[#8dd633] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>3.1-flash-lite</span>
              <span className="text-[9px] opacity-75 font-normal">(Rápido)</span>
            </button>
          </div>

          {/* Google Search Grounding Switch */}
          {selectedModel === 'gemini-3.8-flash' ? (
            <label 
              className={`flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 rounded-lg border transition ${
                useSearch 
                  ? 'bg-sky-50 border-sky-300 text-sky-800 font-medium' 
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
              }`}
              title="Ativa o Google Search Grounding para obter normas e portarias atualizadas"
            >
              <input
                type="checkbox"
                checked={useSearch}
                onChange={(e) => setUseSearch(e.target.checked)}
                className="sr-only"
              />
              <Globe className={`w-3.5 h-3.5 ${useSearch ? 'text-sky-600' : 'text-slate-400'}`} />
              <span className="text-[11px]">Busca Google (MTE/Legislação)</span>
              <span className={`w-2 h-2 rounded-full ml-0.5 ${useSearch ? 'bg-sky-500 animate-pulse' : 'bg-slate-300'}`} />
            </label>
          ) : (
            <div className="text-[11px] text-slate-400 italic">
              Flash-Lite: Respostas locais diretas
            </div>
          )}
        </div>

        {/* Audit Context Pill Bar */}
        <div className="bg-[#0f1d33] border-b border-[#1f3a61] px-4 py-1.5 text-[11px] text-slate-200 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74b826] inline-block" />
              Auditando:
            </span>
            <span className="truncate max-w-[200px] text-slate-300">
              {auditState.info.posto || 'Máquina não especificada'} ({catalog.code})
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-[#152744] px-2 py-0.5 rounded border border-[#1f3a61] text-[#8dd633] font-medium text-[10px]">
              {conformesCount} C
            </span>
            <span className="bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800 text-rose-300 font-semibold text-[10px]">
              {nonConformities.length} NC
            </span>
          </div>
        </div>

        {/* Chat Message Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((message) => {
            const isModel = message.role === 'model';
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isModel ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs text-xs ${
                    isModel
                      ? message.isError 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-[#152744] text-[#8dd633] border border-[#1f3a61]'
                      : 'bg-[#74b826] text-slate-950 font-bold'
                  }`}
                >
                  {isModel ? (
                    message.isError ? <ShieldAlert className="w-4 h-4" /> : <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`space-y-1.5 max-w-[85%] ${isModel ? 'text-left' : 'text-right'}`}>
                  <div
                    className={`rounded-2xl p-4 text-xs leading-relaxed shadow-xs relative group ${
                      isModel
                        ? message.isError
                          ? 'bg-rose-50 text-rose-950 border border-rose-200'
                          : 'bg-white text-slate-800 border border-slate-200/90'
                        : 'bg-[#152744] text-white rounded-br-xs'
                    }`}
                  >
                    {/* Message Text with Simple Markdown Formatting */}
                    <div className="whitespace-pre-wrap break-words space-y-2">
                      {formatMessageContent(message.text)}
                    </div>

                    {/* Google Search Grounding Sources / Citations */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 text-left">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 mb-2">
                          <Globe className="w-3.5 h-3.5 text-sky-600" />
                          <span>Fontes Consultadas via Google Search:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {message.sources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2 py-1 rounded-md transition font-medium max-w-[220px] truncate"
                              title={source.title}
                            >
                              <Search className="w-2.5 h-2.5 shrink-0 text-sky-500" />
                              <span className="truncate">{source.title || source.uri}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60 ml-0.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons (Copy / Apply) */}
                    {isModel && !message.isError && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="text-[10px]">{message.timestamp}</span>
                        <div className="flex items-center gap-2">
                          {onApplyTextToNotes && (
                            <button
                              type="button"
                              onClick={() => onApplyTextToNotes(message.text)}
                              title="Copiar recomendação para as observações gerais da auditoria"
                              className="hover:text-emerald-600 flex items-center gap-1 text-[10px] font-medium transition"
                            >
                              <FileText className="w-3 h-3" />
                              Inserir no Laudo
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleCopyText(message.id, message.text)}
                            title="Copiar texto da resposta"
                            className="hover:text-slate-700 flex items-center gap-1 transition"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold text-[10px]">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isModel && (
                    <span className="text-[10px] text-slate-400 block pr-1">
                      {message.timestamp}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-start animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                <span>
                  {useSearch && selectedModel === 'gemini-3.8-flash' 
                    ? 'Consultando portarias, jurisprudência e normas com Google Search...' 
                    : 'Eng. SafetyConsult AI formulando parecer técnico...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-slate-200/80 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-1.5">
            <HelpCircle className="w-3 h-3 text-emerald-500" />
            <span>Sugestões rápidas para a {catalog.code}:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                onClick={() => handleSendMessage(item.prompt)}
                className="inline-flex items-center gap-1.5 text-[11px] bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition disabled:opacity-50 border border-slate-200/60 font-medium shrink-0"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea & Send Button */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={`Pergunte sobre requisitos da ${catalog.code}, normas ABNT, planos de ação 5W2H ou consulte o MTE...`}
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#74b826] focus:border-transparent resize-none disabled:bg-slate-50 text-slate-800 placeholder:text-slate-400"
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 pointer-events-none hidden sm:inline">
                Enter para enviar · Shift+Enter pula linha
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="h-11 px-4 bg-[#74b826] hover:bg-[#86d42e] disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-lime-950/20 shrink-0"
              title="Enviar mensagem"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Enviar</span>
                </>
              )}
            </button>
          </form>
          <div className="mt-2 text-[10px] text-center text-slate-400">
            Consultor IA da RRV Consultoria utiliza Inteligência Artificial e busca fundamentada no Google. Sempre confira com a ART do Responsável Técnico.
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format basic markdown elements (bolding, lists, code tags) cleanly without heavyweight markdown libs
function formatMessageContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, index) => {
    // Headers (e.g. ### Title)
    if (line.startsWith('### ')) {
      return (
        <h4 key={index} className="text-xs font-bold text-slate-900 mt-2 mb-1">
          {parseInlineMarkdown(line.replace('### ', ''))}
        </h4>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h3 key={index} className="text-sm font-bold text-slate-950 mt-2 mb-1 border-b border-slate-200 pb-0.5">
          {parseInlineMarkdown(line.replace('## ', ''))}
        </h3>
      );
    }

    // List items (e.g. - item or * item)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <div key={index} className="flex items-start gap-1.5 ml-2 my-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          <span>{parseInlineMarkdown(line.substring(2))}</span>
        </div>
      );
    }

    // Numbered list (e.g. 1. item)
    const numberedMatch = line.match(/^(\d+)\.\s(.*)/);
    if (numberedMatch) {
      return (
        <div key={index} className="flex items-start gap-1.5 ml-2 my-0.5">
          <span className="font-bold text-emerald-700 min-w-[16px]">{numberedMatch[1]}.</span>
          <span>{parseInlineMarkdown(numberedMatch[2])}</span>
        </div>
      );
    }

    // Regular line
    if (!line.trim()) {
      return <div key={index} className="h-1.5" />;
    }

    return <p key={index}>{parseInlineMarkdown(line)}</p>;
  });
}

function parseInlineMarkdown(text: string) {
  // Split on bold markers **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle inline code `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-slate-100 text-emerald-800 px-1 py-0.5 rounded font-mono text-[10px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
