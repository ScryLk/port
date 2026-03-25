'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Locale = 'pt' | 'en'

interface I18nContextType {
  locale: Locale
  t: (key: string) => string
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

const translations: Record<Locale, Record<string, string>> = {
  pt: {
    // Hero
    'hero.label': 'DESENVOLVEDOR FULL STACK',
    'hero.subtitle': 'Software Engineer | Java & Spring Boot | Angular & React',
    'hero.cta': '— role para explorar —',

    // About
    'about.label': 'SOBRE',
    'about.heading': 'Construindo produtos digitais com propósito.',
    'about.summary':
      'Sou Desenvolvedor Full Stack e estudante de Sistemas para Internet no IF Farroupilha, dedicado a entregar soluções que geram valor real. Meu conjunto de habilidades técnicas é versátil, permitindo construir aplicações robustas usando Java (Native/Spring) ou Python (Django), integradas com interfaces React modernas.',
    'about.full':
      'Tenho orgulho de ter liderado projetos de alto impacto no setor público. Executei integrações de sistemas que atualmente gerenciam mais de 600 ativos de TI e implementei um help desk centralizado que unificou o suporte de infraestrutura em todo o Polo de Saúde de Panambi. Também desenvolvi uma solução de gestão de frotas que já registrou mais de 1.000 viagens. Além disso, destaco a criação do sistema de pré-cadastro do Bolsa Família, uma inovação divulgada na mídia local que eliminou filas presenciais e facilitou o acesso dos cidadãos.\n\nMinha experiência profissional também inclui atuação como Analista de Dados com forte foco em desenvolvimento, utilizando Java e PostgreSQL para construir integrações e processar dados complexos. Estou constantemente buscando evoluir em Engenharia de Software, aplicando a tecnologia certa para resolver desafios de negócio com escalabilidade.',
    'about.readMore': 'ler mais',
    'about.readLess': 'ler menos',

    // Work
    'work.label': 'PROJETOS',

    // Stack
    'stack.label': 'TECNOLOGIAS',
    'stack.frontend': 'Frontend',
    'stack.backend': 'Backend',
    'stack.data': 'Dados',
    'stack.infra': 'Infra',

    // Contact
    'contact.label': 'CONTATO',
    'contact.heading': 'Vamos construir algo.',

    // Nav
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.stack': 'Stack',
    'nav.contact': 'Contato',

    // Loading
    'loading.text': 'INICIANDO TERRENO',

    // Modal
    'modal.project': 'PROJETO',
    'modal.stack': 'STACK',
    'modal.preview': 'PREVIEW',
    'modal.screenshot': 'captura',
    'modal.live': '↗ Ver ao vivo',
    'modal.demo': '▶ Demo',
    'modal.close': 'Fechar modal',

    // Projects
    'project.questboard.description':
      'VTT platform mobile-first para RPG de mesa. GMs criam campanhas, mapas e fichas de personagem; players acessam via web sem instalar nada. Sistema de tokens com pathfinding A*, fog of war, combate em tempo real via Socket.IO e sistema de som com Web Audio API.',
    'project.teki.description':
      'AI-powered IT support desktop assistant. Floating window com transcrição ao vivo via Gemini Live API e modo offline com Whisper.cpp. Sugestões de resolução em tempo real, sistema proprietário de API keys com rate limiting por tier e painel Connection Monitor.',
    'project.catana.description':
      'SaaS de catálogos digitais para distribuidoras de embalagem brasileiras. Editor Figma-like com layers panel, Monaco Editor integrado e geração de catálogos para clientes DiPack. Foco no mercado brasileiro de packaging.',
    'project.fleet-manager.description':
      'Sistema de gestão de frotas para a Prefeitura Municipal de Panambi. Controle completo de veículos, manutenções preventivas, abastecimento e relatórios de utilização. Já registrou mais de 1.000 viagens. Projeto de alto impacto desenvolvido durante estágio na Prefeitura.',
    'project.dipack.description':
      'Site institucional para a DiPack Embalagens, distribuidora de embalagens do sul do Brasil. Landing page moderna com catálogo de produtos, formulário de contato e design responsivo.',
    'project.precadastro-mcmv.description':
      'Sistema de pré-cadastro do programa Minha Casa Minha Vida para a Prefeitura de Panambi. Inovação divulgada na mídia local que eliminou filas presenciais e facilitou o acesso dos cidadãos ao programa habitacional.',

    // Profile
    'profile.button': '[ sobre mim ]',
    'profile.role': 'FULL STACK DEVELOPER',
    'profile.city': 'CIDADE',
    'profile.education': 'ESCOLARIDADE',
    'profile.educationValue': 'Estudante de Sistemas para Internet — Instituto Federal Farroupilha, Campus Panambi',
    'profile.age': 'IDADE',
    'profile.years': 'anos',
    'profile.gender': 'GÊNERO',
    'profile.genderValue': 'Masculino',

    // Metadata
    'meta.title': 'Lucas | Desenvolvedor Full Stack',
    'meta.description': 'Portfólio — Desenvolvedor Full Stack de Panambi, BR. Criando experiências web imersivas com React, Three.js e Node.js.',
  },
  en: {
    // Hero
    'hero.label': 'FULL STACK DEVELOPER',
    'hero.subtitle': 'Software Engineer | Java & Spring Boot | Angular & React',
    'hero.cta': '— scroll to explore —',

    // About
    'about.label': 'ABOUT',
    'about.heading': 'Building digital products with purpose.',
    'about.summary':
      'I am a Full Stack Developer and an Internet Systems student at IF Farroupilha, dedicated to delivering solutions that drive real value. My technical skillset is versatile, allowing me to build robust applications using either Java (Native/Spring) or Python (Django), seamlessly integrated with modern React interfaces.',
    'about.full':
      'I take pride in having led high-impact projects within the public sector. I executed system integrations that currently manage over 600 IT assets and implemented a centralized help desk that unified infrastructure support across the entire Panambi Health Hub. I also developed a fleet management solution that has already logged over 1,000 trips. Additionally, I highlight the creation of the Bolsa Família pre-registration system, an innovation featured in local media that eliminated physical queues and streamlined access for citizens.\n\nMy professional experience also includes working as a Data Analyst with a strong focus on development, utilizing Java and PostgreSQL to build integrations and process complex data. I am constantly seeking to evolve in Software Engineering, applying the right technology to solve business challenges with scalability.',
    'about.readMore': 'read more',
    'about.readLess': 'read less',

    // Work
    'work.label': 'PROJECTS',

    // Stack
    'stack.label': 'TECH STACK',
    'stack.frontend': 'Frontend',
    'stack.backend': 'Backend',
    'stack.data': 'Data',
    'stack.infra': 'Infra',

    // Contact
    'contact.label': 'CONTACT',
    'contact.heading': "Let's build something.",

    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.stack': 'Stack',
    'nav.contact': 'Contact',

    // Loading
    'loading.text': 'INITIATING TERRAIN',

    // Modal
    'modal.project': 'PROJECT',
    'modal.stack': 'STACK',
    'modal.preview': 'PREVIEW',
    'modal.screenshot': 'screenshot',
    'modal.live': '↗ View live',
    'modal.demo': '▶ Demo',
    'modal.close': 'Close modal',

    // Projects
    'project.questboard.description':
      'Mobile-first VTT platform for tabletop RPG. GMs create campaigns, maps, and character sheets; players access via web without installing anything. Token system with A* pathfinding, fog of war, real-time combat via Socket.IO, and sound system with Web Audio API.',
    'project.teki.description':
      'AI-powered IT support desktop assistant. Floating window with live transcription via Gemini Live API and offline mode with Whisper.cpp. Real-time resolution suggestions, proprietary API key system with tier-based rate limiting, and Connection Monitor panel.',
    'project.catana.description':
      'Digital catalog SaaS for Brazilian packaging distributors. Figma-like editor with layers panel, integrated Monaco Editor, and catalog generation for DiPack clients. Focused on the Brazilian packaging market.',
    'project.fleet-manager.description':
      'Fleet management system for the Municipality of Panambi. Complete vehicle control, preventive maintenance, fueling, and usage reports. Already logged over 1,000 trips. High-impact project developed during internship at the Municipality.',
    'project.dipack.description':
      'Institutional website for DiPack Embalagens, a packaging distributor in southern Brazil. Modern landing page with product catalog, contact form, and responsive design.',
    'project.precadastro-mcmv.description':
      'Pre-registration system for the Minha Casa Minha Vida housing program for the Municipality of Panambi. Innovation featured in local media that eliminated physical queues and streamlined citizen access to the housing program.',

    // Profile
    'profile.button': '[ about me ]',
    'profile.role': 'FULL STACK DEVELOPER',
    'profile.city': 'CITY',
    'profile.education': 'EDUCATION',
    'profile.educationValue': 'Internet Systems Student — Instituto Federal Farroupilha, Campus Panambi',
    'profile.age': 'AGE',
    'profile.years': 'years',
    'profile.gender': 'GENDER',
    'profile.genderValue': 'Male',

    // Metadata
    'meta.title': 'Lucas | Full Stack Developer',
    'meta.description': 'Portfolio — Full Stack Developer from Panambi, BR. Building immersive web experiences with React, Three.js, and Node.js.',
  },
}

// Map project names to translation keys
const PROJECT_KEY_MAP: Record<string, string> = {
  'QuestBoard': 'project.questboard.description',
  'Teki': 'project.teki.description',
  'CATANA': 'project.catana.description',
  'Frotas Panambi': 'project.fleet-manager.description',
  'DiPack Embalagens': 'project.dipack.description',
  'Pré-Cadastro MCMV': 'project.precadastro-mcmv.description',
}

export function getProjectDescriptionKey(projectName: string): string {
  return PROJECT_KEY_MAP[projectName] || ''
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('pt')

  const t = useCallback(
    (key: string) => translations[locale][key] || key,
    [locale]
  )

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'pt' ? 'en' : 'pt'))
  }, [])

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
