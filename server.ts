import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side initialization of GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for SafetyAudit AI Chatbot with Search Grounding
app.post('/api/chat', async (req, res) => {
  try {
    const { 
      messages, 
      model = 'gemini-3.8-flash', 
      useSearch = true,
      auditContext 
    } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Chave GEMINI_API_KEY não configurada no servidor. Verifique o painel Secrets.' 
      });
    }

    // Rich domain system instruction for SST Consultant
    let systemInstruction = `Você é o Consultor Técnico Especialista em IA da "RRV Consultoria em Segurança do Trabalho", prestando assessoria técnica e pericial de alto nível em Normas Regulamentadoras (NRs) do Brasil (MTE/Governo Federal).
Seu objetivo é orientar a equipe técnica da RRV Consultoria e seus clientes em inspeções de campo, auditorias de conformidade legal, análise de riscos e formulação de planos de ação corretiva 5W2H.

Diretrizes de Atuação:
1. Conhecimento aprofundado das NRs:
   - NR-12: Segurança em Máquinas e Equipamentos (Portaria MTP 4.219/2022).
   - NR-10: Instalações e Serviços em Eletricidade.
   - NR-06: Equipamentos de Proteção Individual (EPI).
   - NR-17: Ergonomia.
   - NR-23: Proteção Contra Incêndios.
   - NR-35: Trabalho em Altura.
   - NR-33: Espaços Confinados.
   - NR-01: GRO e PGR.
2. Seja técnico, preciso, pragmático e cite os itens específicos da norma e normas técnicas associadas (NBR ISO 12100, NBR ISO 13849, NBR ISO 13857, NHO 11, etc.).
3. Quando sugerir ações corretivas, use a estrutura prática 5W2H (O que fazer, Por que fazer, Quem faz, Onde, Quando/Prazo sugerido).
4. Forneça respostas claras com formatação limpa (negrito para termos chave, listas pontuadas para passos práticos).`;

    if (auditContext) {
      systemInstruction += `\n\nContexto da Auditoria em Andamento:
- Norma Ativa: ${auditContext.activeNR || 'Não especificada'}
- Empresa: ${auditContext.empresa || 'Não especificada'}
- Máquina / Posto: ${auditContext.posto || 'Não especificada'}
- Tag / Patrimônio: ${auditContext.tag || 'Não especificada'}
- Setor: ${auditContext.setor || 'Não especificada'}
- Total de Itens: ${auditContext.totalItems || 0}
- Conformes (C): ${auditContext.conformes || 0}
- Não Conformes (NC): ${auditContext.naoConformes || 0}
- Lista de Não Conformidades encontradas: ${JSON.stringify(auditContext.ncList || [])}
Leve este contexto em consideração ao responder para fornecer recomendações personalizadas para este equipamento/posto.`;
    }

    // Build contents for @google/genai
    const formattedContents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    // Configure tools: Enable Google Search Grounding when requested on gemini-3.8-flash
    const config: any = {
      systemInstruction,
      temperature: 0.7,
    };

    if (useSearch && model === 'gemini-3.8-flash') {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model,
      contents: formattedContents,
      config,
    });

    const replyText = response.text || 'Não foi possível gerar uma resposta para esta solicitação.';

    // Extract Google Search grounding citations if present
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const searchSources: Array<{ title: string; uri: string }> = [];

    if (Array.isArray(rawChunks)) {
      rawChunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          searchSources.push({
            title: chunk.web.title || chunk.web.uri,
            uri: chunk.web.uri,
          });
        }
      });
    }

    return res.json({
      text: replyText,
      sources: searchSources,
      model,
    });
  } catch (error: any) {
    console.error('Erro na API de Chat Gemini:', error);
    return res.status(500).json({
      error: error?.message || 'Erro ao processar consulta com o assistente Gemini.'
    });
  }
});

// Vite Middleware in dev, Static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`SafetyAudit Server rodando na porta ${PORT} (dev mode: ${!isProd})`);
  });
}

startServer();
