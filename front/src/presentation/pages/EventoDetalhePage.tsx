import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, Info } from "lucide-react";
import { useEventoDetalheController } from "../controllers/useEventoDetalheController";
import { AvaliacaoEvento } from "../components/AvaliacaoEvento";

export function EventoDetalhePage() {
  const { id } = useParams();
  const { event: evento, loading, error, isSubscribed, subscribing, handleSubscribe } = useEventoDetalheController(Number(id));
  const [showConfirmacao, setShowConfirmacao] = useState(false);

  const handleInscrever = () => {
    if (!isSubscribed) {
      handleSubscribe();
      setShowConfirmacao(true);
      setTimeout(() => setShowConfirmacao(false), 3000);
    } else {
      handleSubscribe();
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!evento) return <div>Evento não encontrado</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={evento.image}
          alt={evento.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <Link to="/eventos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar para eventos
            </Link>
            <div className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full mb-4" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              {evento.categoria}
            </div>
            <h1 className="text-white" style={{ fontSize: '4rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {evento.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="mb-6" style={{ fontSize: '2rem', fontWeight: 600 }}>
                Sobre o Evento
              </h2>
              <p className="text-foreground/80 leading-relaxed" style={{ fontSize: '1.125rem' }}>
                {evento.description}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-6" style={{ fontSize: '2rem', fontWeight: 600 }}>
                Atividades
              </h2>
              <ul className="space-y-3">
                {(evento.atividades || []).map((atividade, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span style={{ fontSize: '1.125rem' }}>{atividade}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-6" style={{ fontSize: '2rem', fontWeight: 600 }}>
                O que levar
              </h2>
              <ul className="space-y-3">
                {(evento.requisitos || []).map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span style={{ fontSize: '1.125rem' }}>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <div className="sticky top-24">
              <div className="bg-secondary rounded-xl p-6 mb-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Data</div>
                      <div style={{ fontWeight: 600 }}>{evento.date}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Horário</div>
                      <div style={{ fontWeight: 600 }}>{evento.horario}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Local</div>
                      <div style={{ fontWeight: 600 }}>{evento.location}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Vagas Disponíveis
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex items-end gap-2 mb-2">
                      <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>
                        {evento.vagas - (evento.inscritos || 0)}
                      </span>
                      <span className="text-muted-foreground pb-1">de {evento.vagas}</span>
                    </div>
                    <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-accent h-full transition-all duration-500"
                        style={{ width: `${((evento.inscritos || 0) / evento.vagas) * 100}%` }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">
                      {error}
                    </div>
                  )}

                  {new Date(evento.rawStartTime || evento.date) < new Date() ? (
                    <p className="text-center text-red-600 font-semibold mt-4 bg-red-50 py-3 border border-red-200 rounded-lg">
                      Este evento já foi realizado.
                    </p>
                  ) : !!localStorage.getItem("token") ? (
                    <>
                      <button
                        onClick={handleInscrever}
                        disabled={subscribing || (!isSubscribed && (evento.inscritos || 0) >= evento.vagas)}
                        className={`w-full py-4 rounded-lg transition-all mb-4 disabled:opacity-50 flex items-center justify-center gap-2 ${
                          isSubscribed
                            ? "bg-white text-accent border-2 border-accent hover:bg-red-50 hover:text-red-500 hover:border-red-500"
                            : "bg-accent text-accent-foreground hover:opacity-90"
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {subscribing ? "Processando..." : (isSubscribed ? "Cancelar Inscrição" : "Quero Participar")}
                      </button>

                      <p className="text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
                        <Info className="w-4 h-4" />
                        {isSubscribed ? "Você está inscrito neste evento" : "Inscrições encerram 1h antes do evento"}
                      </p>
                    </>
                  ) : (
                    <p className="text-center text-muted-foreground text-sm mt-4 bg-white py-3 border border-border rounded-lg">
                      <a href="/login" className="text-accent hover:underline font-semibold">Faça login</a> para participar deste evento.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <h3 className="mb-2" style={{ fontWeight: 600 }}>Organizador</h3>
                <p className="text-muted-foreground">{evento.organizador}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmacao && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          <div>
            <div style={{ fontWeight: 600 }}>Inscrição confirmada!</div>
            <div style={{ fontSize: '0.875rem' }}>Você receberá mais informações por email</div>
          </div>
        </motion.div>
      )}

      {isSubscribed && (
        <div className="mx-auto max-w-5xl px-6 pb-12">
          <AvaliacaoEvento eventId={evento.id} />
        </div>
      )}
    </div>
  );
}
