import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { useEventoDetalheController } from "../controllers/useEventoDetalheController";

export function EventoDetalhePage() {
  const { id } = useParams();
  const { event: evento, loading, isInscrito, toggleInscricao } = useEventoDetalheController(Number(id));
  const [showConfirmacao, setShowConfirmacao] = useState(false);

  const handleInscrever = () => {
    if (!isInscrito) {
      toggleInscricao();
      setShowConfirmacao(true);
      setTimeout(() => setShowConfirmacao(false), 3000);
    } else {
      toggleInscricao();
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
                {evento.descricao}
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

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Vagas</div>
                      <div style={{ fontWeight: 600 }}>
                        {evento.inscritos}/{evento.vagas} inscritos
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${((evento.inscritos || 0) / evento.vagas) * 100}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground mt-2" style={{ fontSize: '0.875rem' }}>
                    {evento.vagas - (evento.inscritos || 0)} vagas disponíveis
                  </p>
                </div>

                {!isInscrito ? (
                  <button
                    onClick={handleInscrever}
                    className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
                    style={{ fontWeight: 600, fontSize: '1.125rem' }}
                  >
                    Inscrever-se
                  </button>
                ) : (
                  <div className="w-full px-6 py-4 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Inscrito com sucesso!
                  </div>
                )}
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
    </div>
  );
}
