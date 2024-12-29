enum Tipo {
  Projeto = "Projeto",
  Administrativa = "Administrativa",
}

interface Usuario {
  id: number;
  nome: string;
}

interface Projeto {
  id: number;
  nome: string;
}

interface Meeting {
  id: number;
  tipo: Tipo;
  data: Date;
  participantes: Usuario[];
  projetoRelacionado?: Projeto;
  pauta: string;
}

export const meetingsMockup: Meeting[] = [
  {
    id: 1,
    tipo: Tipo.Projeto,
    data: new Date("2023-01-15"),
    participantes: [
      { id: 1, nome: "Alice" },
      { id: 2, nome: "Bob" },
    ],
    projetoRelacionado: { id: 1, nome: "Projeto A" },
    pauta: "Discussão sobre o andamento do Projeto A",
  },
  {
    id: 2,
    tipo: Tipo.Administrativa,
    data: new Date("2023-02-20"),
    participantes: [
      { id: 3, nome: "Carlos" },
      { id: 4, nome: "Diana" },
    ],
    pauta: "Reunião administrativa mensal",
  },
  {
    id: 3,
    tipo: Tipo.Projeto,
    data: new Date("2023-03-10"),
    participantes: [
      { id: 5, nome: "Eva" },
      { id: 6, nome: "Frank" },
    ],
    projetoRelacionado: { id: 2, nome: "Projeto B" },
    pauta: "Planejamento inicial do Projeto B",
  },
  {
    id: 4,
    tipo: Tipo.Administrativa,
    data: new Date("2023-04-05"),
    participantes: [
      { id: 7, nome: "Grace" },
      { id: 8, nome: "Hank" },
    ],
    pauta: "Avaliação de desempenho trimestral",
  },
  {
    id: 5,
    tipo: Tipo.Projeto,
    data: new Date("2023-05-15"),
    participantes: [
      { id: 9, nome: "Ivy" },
      { id: 10, nome: "Jack" },
    ],
    projetoRelacionado: { id: 3, nome: "Projeto C" },
    pauta: "Revisão do escopo do Projeto C",
  },
  {
    id: 6,
    tipo: Tipo.Administrativa,
    data: new Date("2023-06-20"),
    participantes: [
      { id: 1, nome: "Alice" },
      { id: 3, nome: "Carlos" },
    ],
    pauta: "Reunião de orçamento semestral",
  },
  {
    id: 7,
    tipo: Tipo.Projeto,
    data: new Date("2023-07-10"),
    participantes: [
      { id: 2, nome: "Bob" },
      { id: 4, nome: "Diana" },
    ],
    projetoRelacionado: { id: 4, nome: "Projeto D" },
    pauta: "Definição de metas do Projeto D",
  },
  {
    id: 8,
    tipo: Tipo.Administrativa,
    data: new Date("2023-08-05"),
    participantes: [
      { id: 5, nome: "Eva" },
      { id: 7, nome: "Grace" },
    ],
    pauta: "Revisão de políticas internas",
  },
  {
    id: 9,
    tipo: Tipo.Projeto,
    data: new Date("2023-09-15"),
    participantes: [
      { id: 6, nome: "Frank" },
      { id: 8, nome: "Hank" },
    ],
    projetoRelacionado: { id: 5, nome: "Projeto E" },
    pauta: "Análise de riscos do Projeto E",
  },
  {
    id: 10,
    tipo: Tipo.Administrativa,
    data: new Date("2023-10-20"),
    participantes: [
      { id: 9, nome: "Ivy" },
      { id: 10, nome: "Jack" },
    ],
    pauta: "Planejamento estratégico anual",
  },
];

export default meetingsMockup;
