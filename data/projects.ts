export interface ProjectData {
  name: string
  description: string
  stack: string[]
  url?: string
  github?: string
  demo?: string
  color: string
  screenshots?: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    name: 'QuestBoard',
    description:
      'Plataforma VTT mobile-first para RPG de mesa. GMs criam campanhas, mapas e fichas de personagem; jogadores acessam via web sem instalar nada. Sistema de tokens com pathfinding A*, fog of war, combate em tempo real via Socket.IO e sistema de som com Web Audio API.',
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
      'Assistente desktop de suporte de TI com inteligência artificial. Janela flutuante com transcrição ao vivo via Gemini Live API e modo offline com Whisper.cpp. Sugestões de resolução em tempo real, sistema próprio de API keys com rate limiting por tier e painel Connection Monitor.',
    stack: ['Electron', 'Next.js', 'Gemini API', 'Whisper.cpp', 'Clerk', 'Socket.IO', 'Recharts'],
    url: 'tekiia.com',
    github: 'github.com/ScryLk/teki',
    demo: 'https://www.loom.com/share/c1324546bd25454087e79b2f7ee8f50f',
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
    name: 'Pré-Cadastro MCMV',
    description:
      'Sistema de pré-cadastro do programa Minha Casa Minha Vida para a Prefeitura de Panambi. Inovação divulgada na mídia local que eliminou filas presenciais e facilitou o acesso dos cidadãos ao programa habitacional.',
    stack: ['React', 'Tailwind CSS', 'Django'],
    demo: 'https://www.loom.com/share/91d8f84a4f074d029f89c8634807ba53',
    color: '#00c8e0',
    screenshots: [],
  },
  {
    name: 'Frotas Panambi',
    description:
      'Sistema de gestão de frotas para a Prefeitura Municipal de Panambi. Controle completo de veículos, manutenções preventivas, abastecimento e relatórios de utilização. Já registrou mais de 1.000 viagens. Projeto de alto impacto desenvolvido durante estágio na Prefeitura.',
    stack: ['React', 'Tailwind CSS', 'Django'],
    github: 'github.com/ScryLk/frotas-back',
    demo: 'https://www.loom.com/share/daa122b39db440ed8ecddb6185ea9b29',
    color: '#00c8e0',
    screenshots: [],
  },
  {
    name: 'DiPack Embalagens',
    description:
      'Site institucional para a DiPack Embalagens, distribuidora de embalagens do sul do Brasil. Landing page moderna com catálogo de produtos, formulário de contato e design responsivo.',
    stack: ['Next.js', 'Tailwind CSS'],
    url: 'dipackembalagens.com',
    color: '#00c8e0',
    screenshots: [],
  },
]
