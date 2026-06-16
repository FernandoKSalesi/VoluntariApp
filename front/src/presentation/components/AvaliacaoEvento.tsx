import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { EventRatingService } from "../../data/services/EventRatingService";

interface Props {
  eventId: number;
}

export function AvaliacaoEvento({ eventId }: Props) {
  const [organizacao, setOrganizacao] = useState(0);
  const [experiencia, setExperiencia] = useState(0);
  const [impacto, setImpacto] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizacao || !experiencia || !impacto) {
      setErro("Por favor, preencha todas as estrelas.");
      return;
    }

    setEnviando(true);
    setErro("");

    // Calcula a média e arredonda para o número inteiro mais próximo
    const media = Math.round((organizacao + experiencia + impacto) / 3);

    try {
      // Dummy token - Na vida real seria do contexto do usuário logado
      await EventRatingService.rateEvent(eventId, { rating: media, comment: comentario });
      setSucesso(true);
    } catch (err: any) {
      setErro(err.message || "Erro ao enviar avaliação.");
    } finally {
      setEnviando(false);
    }
  };

  const StarRating = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div className="flex flex-col gap-2 mb-4">
      <span style={{ fontWeight: 600 }}>{label}</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`transition-colors ${value >= star ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-300`}
          >
            <Star className="w-8 h-8" fill={value >= star ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  );

  if (sucesso) {
    return (
      <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-green-800 text-center">
        <h3 className="text-xl font-bold mb-2">Avaliação Enviada!</h3>
        <p>Agradecemos por nos ajudar a melhorar os próximos eventos.</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl p-8 mt-12">
      <h2 className="mb-6 flex items-center gap-3" style={{ fontSize: '2rem', fontWeight: 600 }}>
        <MessageSquare className="w-8 h-8 text-accent" />
        Avalie o Evento
      </h2>
      
      {erro && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <StarRating label="Organização do Evento" value={organizacao} onChange={setOrganizacao} />
          <StarRating label="Experiência do Voluntário" value={experiencia} onChange={setExperiencia} />
          <StarRating label="Impacto do Evento" value={impacto} onChange={setImpacto} />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Comentário (Opcional)</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            placeholder="Conte-nos o que achou do evento, pontos positivos e o que pode melhorar..."
            className="w-full px-4 py-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-accent resize-none border border-gray-200"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-bold text-lg"
        >
          {enviando ? "Enviando..." : "Enviar Avaliação"}
        </button>
      </form>
    </div>
  );
}
