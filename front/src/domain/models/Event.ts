export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  vagas: number;
  categoria: string;
  descricao: string;
  horario?: string;
  inscritos?: number;
  organizador?: string;
  atividades?: string[];
  requisitos?: string[];
}
