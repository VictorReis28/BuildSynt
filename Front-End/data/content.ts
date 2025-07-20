import { Technology, Feature, Contact } from "../types";

export const technologies: Technology[] = [
  {
    name: "React",
    icon: "react",
    description: "Interface de usuário moderna e reativa",
  },
  {
    name: "TypeScript",
    icon: "code",
    description: "Tipagem estática para maior segurança",
  },
  {
    name: "Tailwind CSS",
    icon: "palette",
    description: "Estilização rápida e consistente",
  },
  {
    name: "Framer Motion",
    icon: "sparkles",
    description: "Animações suaves e interativas",
  },
];

export const features: Feature[] = [
  {
    title: "Análise Automática de Repositórios",
    description:
      "Escaneamento inteligente de repositórios GitHub para identificar padrões de erro",
    icon: "search",
  },
  {
    title: "Detecção de Erros em JavaScript/TypeScript",
    description:
      "Identificação específica de erros comuns em projetos React e TypeScript",
    icon: "bug",
  },
  {
    title: "Relatórios Detalhados",
    description: "Geração de relatórios completos com sugestões de correção",
    icon: "file-text",
  },
  {
    title: "Dashboard Interativo",
    description:
      "Interface visual para acompanhar métricas e tendências de erro",
    icon: "bar-chart",
  },
  {
    title: "Histórico de Análises",
    description: "Armazenamento e comparação de análises anteriores",
    icon: "history",
  },
  {
    title: "Alertas Inteligentes",
    description:
      "Notificações automáticas para novos padrões de erro detectados",
    icon: "bell",
  },
];

export const contacts: Contact[] = [
  {
    name: "GitHub",
    url: "#",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:seu.email@exemplo.com",
    icon: "mail",
  },
];
