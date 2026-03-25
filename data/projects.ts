export interface ProjectData {
  name: string
  description: string
  stack: string[]
  url?: string
  github?: string
  color: string
  screenshots?: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    name: 'QuestBoard',
    description:
      'VTT platform mobile-first para RPG de mesa. GMs criam campanhas, mapas e fichas de personagem; players acessam via web sem instalar nada. Sistema de tokens com pathfinding A*, fog of war, combate em tempo real via Socket.IO e sistema de som com Web Audio API.',
    stack: ['Expo 52', 'React Three Fiber', 'Socket.IO', 'Fastify 5', 'Prisma 6', 'PostgreSQL', 'Redis', 'Clerk'],
    url: 'questboard.gg',
    github: 'github.com/ScryLk/questboard',
    color: '#00c8e0',
    screenshots: [
      '/screenshots/questboard-1.png',
      '/screenshots/questboard-2.png',
    ],
  },
  {
    name: 'Teki',
    description:
      'AI-powered IT support desktop assistant. Floating window com transcrição ao vivo via Gemini Live API e modo offline com Whisper.cpp. Sugestões de resolução em tempo real, sistema proprietário de API keys com rate limiting por tier e painel Connection Monitor.',
    stack: ['Electron', 'Next.js', 'Gemini API', 'Whisper.cpp', 'Clerk', 'Socket.IO', 'Recharts'],
    url: 'tekiia.com',
    github: 'github.com/ScryLk/teki',
    color: '#00c8e0',
    screenshots: [
      '/screenshots/teki-1.png',
      '/screenshots/teki-2.png',
    ],
  },
  {
    name: 'CATANA',
    description:
      'SaaS de catálogos digitais para distribuidoras de embalagem brasileiras. Editor Figma-like com layers panel, Monaco Editor integrado e geração de catálogos para clientes DiPack. Foco no mercado brasileiro de packaging.',
    stack: ['React', 'Vite', 'TypeScript', 'Django', 'PostgreSQL'],
    color: '#00c8e0',
    screenshots: [],
  },
  {
    name: 'Mudea',
    description:
      'Carteira digital de saúde. Pacientes centralizam histórico médico, exames e receitas em um único lugar. App mobile com sincronização offline e compartilhamento seguro com médicos via QR code.',
    stack: ['React Native', 'Expo', 'Fastify', 'PostgreSQL'],
    color: '#00c8e0',
    screenshots: [],
  },
  {
    name: 'Fleet Manager',
    description:
      'Sistema de gestão de frotas para a Prefeitura Municipal de Panambi. Controle completo de veículos, manutenções preventivas, abastecimento e relatórios de utilização. Projeto de alto impacto desenvolvido durante estágio na Prefeitura.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Swing'],
    color: '#00c8e0',
    screenshots: [],
  },
  {
    name: 'Helpdesk Central',
    description:
      'Sistema centralizado de suporte técnico para a Prefeitura de Panambi. Abertura de chamados, SLA automático, categorização por departamento e painel de gestão de atendimento. Substituiu processos manuais por fluxo digital completo.',
    stack: ['Java', 'Swing', 'JDBC', 'PostgreSQL'],
    color: '#00c8e0',
    screenshots: [],
  },
]
