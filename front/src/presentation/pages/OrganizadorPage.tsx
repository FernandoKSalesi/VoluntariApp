import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Edit2, Trash2, Users, Bell, Calendar, MapPin, X, Upload} from "lucide-react";

export function OrganizadorPage() {
  const [activeTab, setActiveTab] = useState<"criar" | "gerenciar" | "notificacoes">("criar");
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
    vagas: "",
    categoria: "Meio Ambiente"
  });

  const eventosOrganizados = [
    {
      id: 1,
      title: "Limpeza de Parque Comunitário",
      date: "20 Abr 2026",
      inscritos: 17,
      vagas: 25,
      status: "ativo"
    },
    {
      id: 2,
      title: "Plantio de Árvores",
      date: "25 Abr 2026",
      inscritos: 32,
      vagas: 40,
      status: "ativo"
    },
    {
      id: 3,
      title: "Reforma de Casa Comunitária",
      date: "30 Abr 2026",
      inscritos: 15,
      vagas: 20,
      status: "ativo"
    }
  ];

  const handleCriarEvento = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Criar evento:", novoEvento);
    setShowModal(false);
    setNovoEvento({
      titulo: "",
      descricao: "",
      data: "",
      horario: "",
      local: "",
      vagas: "",
      categoria: "Meio Ambiente"
    });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Painel do Organizador
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              style={{ fontWeight: 600 }}
            >
              <Plus className="w-5 h-5" />
              Criar Evento
            </button>
          </div>

          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("criar")}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === "criar"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontWeight: 600 }}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab("gerenciar")}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === "gerenciar"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontWeight: 600 }}
            >
              Meus Eventos
            </button>
            <button
              onClick={() => setActiveTab("notificacoes")}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === "notificacoes"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontWeight: 600 }}
            >
              Notificações
            </button>
          </div>

          {activeTab === "criar" && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 600 }}>Total de Eventos</h3>
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>3</p>
                <p className="text-muted-foreground mt-2">Eventos ativos</p>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 600 }}>Total de Inscritos</h3>
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>64</p>
                <p className="text-muted-foreground mt-2">Voluntários cadastrados</p>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 600 }}>Taxa de Ocupação</h3>
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>75%</p>
                <p className="text-muted-foreground mt-2">Média de preenchimento</p>
              </div>
            </div>
          )}

          {activeTab === "gerenciar" && (
            <div className="space-y-4">
              {eventosOrganizados.map((evento) => (
                <div
                  key={evento.id}
                  className="bg-secondary rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                      {evento.title}
                    </h3>
                    <div className="flex gap-6 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {evento.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {evento.inscritos}/{evento.vagas} inscritos
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Users className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-accent rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "notificacoes" && (
            <div className="bg-secondary rounded-xl p-8">
              <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                Enviar Notificação
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block mb-2">Selecionar Evento</label>
                  <select className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent">
                    <option>Limpeza de Parque Comunitário</option>
                    <option>Plantio de Árvores</option>
                    <option>Reforma de Casa Comunitária</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Assunto</label>
                  <input
                    type="text"
                    placeholder="Ex: Lembrete sobre o evento"
                    className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block mb-2">Mensagem</label>
                  <textarea
                    rows={6}
                    placeholder="Digite a mensagem para os voluntários..."
                    className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 600 }}
                >
                  <Bell className="w-5 h-5" />
                  Enviar Notificação
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Criar Novo Evento</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCriarEvento} className="space-y-6">
              <div>
                <label className="block mb-2">Imagem do Evento</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Clique para fazer upload</p>
                </div>
              </div>

              <div>
                <label className="block mb-2">Título do Evento</label>
                <input
                  type="text"
                  value={novoEvento.titulo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  placeholder="Ex: Limpeza de Praia"
                  className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Categoria</label>
                <select
                  value={novoEvento.categoria}
                  onChange={(e) => setNovoEvento({ ...novoEvento, categoria: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                >
                  <option>Meio Ambiente</option>
                  <option>Alimentação</option>
                  <option>Educação</option>
                  <option>Saúde</option>
                  <option>Construção</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Descrição</label>
                <textarea
                  value={novoEvento.descricao}
                  onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                  rows={4}
                  placeholder="Descreva os detalhes do evento..."
                  className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Data</label>
                  <input
                    type="date"
                    value={novoEvento.data}
                    onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Horário</label>
                  <input
                    type="time"
                    value={novoEvento.horario}
                    onChange={(e) => setNovoEvento({ ...novoEvento, horario: e.target.value })}
                    className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Local</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={novoEvento.local}
                    onChange={(e) => setNovoEvento({ ...novoEvento, local: e.target.value })}
                    placeholder="Ex: Parque Ibirapuera, SP"
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Número de Vagas</label>
                <input
                  type="number"
                  value={novoEvento.vagas}
                  onChange={(e) => setNovoEvento({ ...novoEvento, vagas: e.target.value })}
                  placeholder="Ex: 30"
                  className="w-full px-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 600 }}
                >
                  Criar Evento
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
