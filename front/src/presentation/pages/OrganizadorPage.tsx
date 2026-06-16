import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Edit2, Trash2, Users, Bell, Calendar, MapPin, X, Upload, Star } from "lucide-react";
import { AvaliacoesEventoModal } from "../components/AvaliacoesEventoModal";
import { ApiClient } from "../../data/services/ApiClient";
import type { Event } from "../../domain/models/Event";
import { getImageUrl } from "../../utils/imageUtils";

export function OrganizadorPage() {
  const [activeTab, setActiveTab] = useState<"criar" | "gerenciar" | "notificacoes">("criar");
  const [showModal, setShowModal] = useState(false);
  const [eventoParaAvaliacao, setEventoParaAvaliacao] = useState<{id: number, title: string} | null>(null);
  
  const [eventosOrganizados, setEventosOrganizados] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [novoEvento, setNovoEvento] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
    vagas: "",
    categoria: "Meio Ambiente"
  });

  const [notificacao, setNotificacao] = useState({
    eventId: "",
    assunto: "",
    mensagem: "",
    enviando: false
  });

  const [eventoEditandoId, setEventoEditandoId] = useState<number | null>(null);
  const [showParticipantesModal, setShowParticipantesModal] = useState<number | null>(null);
  const [participantes, setParticipantes] = useState<any[]>([]);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const data = await ApiClient.get("/users/me/organized-events");
      const mapped = data.map((item: any) => ({
        id: item.id,
        rawStartTime: item.startTime,
        title: item.name || item.title,
        descricao: item.description || "",
        date: new Date(item.startTime).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: 'numeric' }),
        horario: new Date(item.startTime).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
        location: item.location || "",
        vagas: item.totalSpots || 0,
        inscritos: item._count?.subscriptions || 0,
        image: getImageUrl(item.imageUrl),
        categoria: item.categories?.[0]?.category?.name || "Geral",
        organizador: item.organizer?.name || "Organizador"
      }));
      setEventosOrganizados(mapped);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvento = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      await ApiClient.delete(`/events/${id}`);
      loadEventos();
    } catch (e: any) {
      alert("Erro ao excluir: " + (e.message || ""));
    }
  };

  const abrirEdicaoEvento = (evento: any) => {
    let dateStr = "";
    let timeStr = "";
    if (evento.rawStartTime) {
      const d = new Date(evento.rawStartTime);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      dateStr = `${year}-${month}-${day}`;
      
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      timeStr = `${hours}:${minutes}`;
    }

    setNovoEvento({
      titulo: evento.title,
      descricao: evento.descricao,
      data: dateStr,
      horario: timeStr,
      local: evento.location,
      vagas: evento.vagas.toString(),
      categoria: evento.categoria
    });
    setEventoEditandoId(evento.id);
    setShowModal(true);
  };

  const abrirParticipantes = async (id: number) => {
    setShowParticipantesModal(id);
    setParticipantes([]);
    try {
      const data = await ApiClient.get(`/events/${id}/subscriptions`);
      setParticipantes(data);
    } catch (e: any) {
      alert("Erro ao carregar participantes: " + (e.message || ""));
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCriarEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await ApiClient.post("/upload", formData);
        imageUrl = res.imageUrl;
      }

      // Concat date and time for startTime
      const [year, month, day] = novoEvento.data.split("-");
      const [hour, min] = novoEvento.horario.split(":");
      const startTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min)).toISOString();
      const endTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour) + 2, Number(min)).toISOString();

      const payload = {
        name: novoEvento.titulo,
        description: novoEvento.descricao,
        startTime,
        endTime,
        location: novoEvento.local,
        totalSpots: Number(novoEvento.vagas),
        categoryNames: [novoEvento.categoria],
        ...(imageUrl && { imageUrl })
      };

      if (eventoEditandoId) {
        await ApiClient.put(`/events/${eventoEditandoId}`, payload);
      } else {
        await ApiClient.post("/events", payload);
      }

      setShowModal(false);
      setNovoEvento({
        titulo: "", descricao: "", data: "", horario: "", local: "", vagas: "", categoria: "Meio Ambiente"
      });
      setImageFile(null);
      setImagePreview(null);
      setEventoEditandoId(null);
      loadEventos();
    } catch (err: any) {
      alert(`Erro ao ${eventoEditandoId ? 'editar' : 'criar'} evento: ` + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEnviarNotificacao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificacao.eventId || !notificacao.mensagem) {
      return alert("Preencha o evento e a mensagem.");
    }

    setNotificacao(prev => ({ ...prev, enviando: true }));
    try {
      await ApiClient.post(`/events/${notificacao.eventId}/messages`, {
        subject: notificacao.assunto,
        message: notificacao.mensagem
      });
      alert("Notificação enviada com sucesso!");
      setNotificacao({ eventId: "", assunto: "", mensagem: "", enviando: false });
    } catch (err: any) {
      alert("Erro ao enviar notificação: " + (err.message || ""));
      setNotificacao(prev => ({ ...prev, enviando: false }));
    }
  };

  const totalEventos = eventosOrganizados.length;
  const totalInscritos = eventosOrganizados.reduce((acc, ev: any) => acc + (ev.inscritos || 0), 0);
  const totalVagas = eventosOrganizados.reduce((acc, ev: any) => acc + (ev.vagas || 0), 0);
  const taxaOcupacao = totalVagas > 0 ? Math.round((totalInscritos / totalVagas) * 100) : 0;

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
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>{totalEventos}</p>
                <p className="text-muted-foreground mt-2">Eventos ativos</p>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 600 }}>Total de Inscritos</h3>
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>{totalInscritos}</p>
                <p className="text-muted-foreground mt-2">Voluntários cadastrados</p>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ fontWeight: 600 }}>Taxa de Ocupação</h3>
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 700 }}>{taxaOcupacao}%</p>
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
                    <button 
                      onClick={() => setEventoParaAvaliacao({ id: evento.id, title: evento.title })}
                      className="p-2 hover:bg-muted text-yellow-600 rounded-lg transition-colors flex items-center gap-1"
                      title="Ver Avaliações"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => abrirParticipantes(evento.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors" title="Gerenciar Inscritos">
                      <Users className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => abrirEdicaoEvento(evento)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors" title="Editar">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEvento(evento.id)}
                      className="p-2 hover:bg-red-50 text-accent rounded-lg transition-colors" title="Excluir">
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

              <form className="space-y-6" onSubmit={handleEnviarNotificacao}>
                <div>
                  <label className="block mb-2">Selecionar Evento</label>
                  <select 
                    className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    value={notificacao.eventId}
                    onChange={(e) => setNotificacao({ ...notificacao, eventId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecione um evento...</option>
                    {eventosOrganizados.map(evento => (
                      <option key={evento.id} value={evento.id}>{evento.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Assunto</label>
                  <input
                    type="text"
                    placeholder="Ex: Lembrete sobre o evento"
                    className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    value={notificacao.assunto}
                    onChange={(e) => setNotificacao({ ...notificacao, assunto: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2">Mensagem</label>
                  <textarea
                    rows={6}
                    placeholder="Digite a mensagem para os voluntários..."
                    className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent resize-none"
                    value={notificacao.mensagem}
                    onChange={(e) => setNotificacao({ ...notificacao, mensagem: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={notificacao.enviando}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  <Bell className="w-5 h-5" />
                  {notificacao.enviando ? "Enviando..." : "Enviar Notificação"}
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
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{eventoEditandoId ? "Editar Evento" : "Criar Novo Evento"}</h2>
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
                <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Clique para fazer upload</p>
                    </>
                  )}
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
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  {submitting ? "Salvando..." : (eventoEditandoId ? "Salvar Alterações" : "Criar Evento")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {eventoParaAvaliacao && (
        <AvaliacoesEventoModal 
          eventId={eventoParaAvaliacao.id} 
          eventTitle={eventoParaAvaliacao.title}
          onClose={() => setEventoParaAvaliacao(null)} 
        />
      )}

      {showParticipantesModal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Inscritos no Evento</h2>
              <button
                onClick={() => setShowParticipantesModal(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {participantes.length === 0 ? (
              <p className="text-muted-foreground">Nenhum voluntário inscrito ainda.</p>
            ) : (
              <div className="space-y-4">
                {participantes.map((p: any) => (
                  <div key={p.id} className="bg-secondary rounded-lg p-4 flex flex-col gap-1">
                    <p style={{ fontWeight: 600 }}>{p.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{p.user?.email}</p>
                    {p.user?.phone && <p className="text-sm text-muted-foreground">{p.user?.phone}</p>}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
