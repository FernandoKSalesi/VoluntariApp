import type { Event } from "@/domain/models/Event";
import type { IEventRepository } from "@/domain/repositories/IEventRepository";

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Limpeza de Parque Comunitário",
    image: "https://images.unsplash.com/photo-1758599668429-121d54188b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    date: "20 Abr 2026",
    horario: "08:00 - 12:00",
    location: "Parque Ibirapuera, São Paulo - SP",
    vagas: 25,
    inscritos: 17,
    categoria: "Meio Ambiente",
    organizador: "ONG Planeta Verde",
    descricao: "Junte-se a nós em uma manhã de ação comunitária para manter nosso querido Parque Ibirapuera limpo e acolhedor. Esta é uma oportunidade perfeita para conhecer pessoas que compartilham o amor pela natureza e fazer a diferença em nossa comunidade.",
    atividades: [
      "Coleta de lixo em áreas verdes",
      "Separação de resíduos recicláveis",
      "Limpeza de trilhas e caminhos",
      "Conscientização ambiental"
    ],
    requisitos: [
      "Roupa confortável e calçado fechado",
      "Protetor solar e boné",
      "Garrafa de água reutilizável",
      "Disponibilidade para 4 horas"
    ]
  },
  {
    id: 2,
    title: "Distribuição de Alimentos",
    image: "https://images.unsplash.com/photo-1758599669406-d5179ccefcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    date: "22 Abr 2026",
    location: "Centro, São Paulo",
    vagas: 30,
    categoria: "Alimentação",
    descricao: "Distribuição de marmitas para pessoas em situação de vulnerabilidade."
  },
  {
    id: 3,
    title: "Plantio de Árvores",
    image: "https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    date: "25 Abr 2026",
    location: "Serra da Cantareira, SP",
    vagas: 50,
    categoria: "Meio Ambiente",
    descricao: "Plantio de mudas de árvores nativas da Mata Atlântica."
  },
  {
    id: 4,
    title: "Apoio em Abrigo de Animais",
    image: "https://images.unsplash.com/photo-1758599669528-7f9cb24075b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    date: "28 Abr 2026",
    location: "Zona Norte, São Paulo",
    vagas: 15,
    categoria: "Animais",
    descricao: "Cuidados e passeios com cães e gatos resgatados."
  }
];

export class EventRepositoryMock implements IEventRepository {
  async getEvents(): Promise<Event[]> {
    return Promise.resolve(mockEvents);
  }

  async getEventById(id: number): Promise<Event | null> {
    const event = mockEvents.find(e => e.id === id);
    return Promise.resolve(event || null);
  }
}
