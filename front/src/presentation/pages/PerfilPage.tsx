import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, CreditCard, Edit2, Heart, Calendar, MapPin } from "lucide-react";
import { ApiClient } from "../../data/services/ApiClient";
import { getImageUrl } from "../../utils/imageUtils";

export function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    usuario: ""
  });

  const [meusEventos, setMeusEventos] = useState<any[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const [userRes, subsRes] = await Promise.all([
          ApiClient.get("/users/me"),
          ApiClient.get("/users/me/subscriptions")
        ]);

        setUserData({
          nome: userRes.name || "",
          email: userRes.email || "",
          telefone: userRes.phone || "",
          cpf: userRes.document || "",
          usuario: userRes.email?.split('@')[0] || "" // Mock de username via email
        });

        const mappedSubs = subsRes.map((sub: any) => ({
          id: sub.event.id,
          title: sub.event.name || sub.event.title,
          image: getImageUrl(sub.event.imageUrl),
          date: new Date(sub.event.startTime).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: 'numeric' }),
          location: sub.event.location || "",
          status: "confirmado"
        }));
        setMeusEventos(mappedSubs);

      } catch (e) {
        console.error("Erro ao carregar perfil", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await ApiClient.put("/users", {
        name: userData.nome,
        phone: userData.telefone,
        document: userData.cpf
      });
      // Email generally is not updated here, or handled separately
      setIsEditing(false);
    } catch (e: any) {
      alert("Erro ao salvar: " + (e.message || ""));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-8" style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Meu Perfil
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-secondary rounded-xl p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Informações Pessoais</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90"
                      >
                        Salvar
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-muted-foreground">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={userData.nome}
                        onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-muted-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-muted-foreground">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={userData.telefone}
                          onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-muted-foreground">CPF</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={userData.cpf}
                          disabled
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-lg outline-none opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-8">
                <h2 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  Meus Eventos
                </h2>

                <div className="space-y-4">
                  {meusEventos.map((evento) => (
                    <div
                      key={evento.id}
                      className="bg-white rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={evento.image}
                        alt={evento.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="mb-2" style={{ fontWeight: 600 }}>
                          {evento.title}
                        </h3>
                        <div className="flex flex-col gap-1 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {evento.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {evento.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          Confirmado
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-secondary rounded-xl p-8 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-accent-foreground" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {userData.nome}
                  </h3>
                  <p className="text-muted-foreground">@{userData.usuario}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Eventos participados</span>
                    <span style={{ fontWeight: 600 }}>{meusEventos.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Horas voluntariadas</span>
                    <span style={{ fontWeight: 600 }}>{meusEventos.length * 4}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Impacto gerado</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-accent fill-accent" />
                      <span style={{ fontWeight: 600 }}>{meusEventos.length > 5 ? "Alto" : (meusEventos.length > 0 ? "Médio" : "Nenhum")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
