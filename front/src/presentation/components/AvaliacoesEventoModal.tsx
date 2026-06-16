import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { X, Star, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EventRatingService } from "../../data/services/EventRatingService";
import type { GetRatingsResponse } from "../../data/services/EventRatingService";

interface Props {
  eventId: number;
  eventTitle: string;
  onClose: () => void;
}

export function AvaliacoesEventoModal({ eventId, eventTitle, onClose }: Props) {
  const [data, setData] = useState<GetRatingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroNota, setFiltroNota] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAvaliacoes() {
      try {
        setLoading(true);
        // Dummy token
        const result = await EventRatingService.getEventRatings(eventId);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar avaliações.");
      } finally {
        setLoading(false);
      }
    }
    fetchAvaliacoes();
  }, [eventId]);

  // Conta quantas avaliações cada nota (1-5) recebeu
  const chartData = useMemo(() => {
    if (!data) return [];
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.ratings.forEach(r => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    });
    return Object.entries(counts).map(([nota, qtd]) => ({
      nota: `Nota ${nota}`,
      quantidade: qtd
    }));
  }, [data]);

  // Filtra as avaliações para exibição
  const filteredRatings = useMemo(() => {
    if (!data) return [];
    if (filtroNota === null) return data.ratings;
    return data.ratings.filter(r => r.rating === filtroNota);
  }, [data, filtroNota]);

  // Gera uma Word Cloud simples
  const wordCloud = useMemo(() => {
    if (!data || data.comments.length === 0) return [];
    const words = data.comments
      .join(" ")
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .split(/\s+/);

    const freq: Record<string, number> = {};
    const stopWords = ["o", "a", "os", "as", "um", "uma", "e", "do", "da", "de", "para", "com", "que", "em", "no", "na", "foi", "muito"];
    
    words.forEach(w => {
      if (w.length > 2 && !stopWords.includes(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20) // Top 20 palavras
      .map(([text, value]) => ({ text, value }));
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Avaliações do Evento</h2>
            <p className="text-muted-foreground">{eventTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
          {loading ? (
            <div className="text-center py-12">Carregando avaliações...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12">{error}</div>
          ) : !data || data.total === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Ainda não há avaliações para este evento.
            </div>
          ) : (
            <div className="space-y-8">
              {/* Visão Geral */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold mb-2 text-accent">
                    {data.average.toFixed(1)}
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5" fill={s <= Math.round(data.average) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Média de {data.total} avaliações
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-semibold mb-4 text-gray-700">Distribuição das Notas</h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="nota" type="category" axisLine={false} tickLine={false} width={60} />
                        <Tooltip />
                        <Bar dataKey="quantidade" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Word Cloud */}
              {wordCloud.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-semibold mb-4 text-gray-700">Palavras mais usadas</h3>
                  <div className="flex flex-wrap gap-3 justify-center py-4">
                    {wordCloud.map((w, i) => (
                      <span 
                        key={i} 
                        style={{ 
                          fontSize: `${Math.max(1, 1 + w.value * 0.2)}rem`,
                          opacity: Math.max(0.4, w.value / wordCloud[0].value),
                          color: `hsl(250, ${Math.min(100, 40 + w.value * 10)}%, 40%)`
                        }}
                        className="font-semibold"
                      >
                        {w.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lista de Avaliações */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-700">Comentários</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select 
                      className="border-none bg-gray-50 text-sm py-1 px-2 rounded-md outline-none focus:ring-2 focus:ring-accent"
                      value={filtroNota || ""}
                      onChange={(e) => setFiltroNota(e.target.value ? Number(e.target.value) : null)}
                    >
                      <option value="">Todas as notas</option>
                      <option value="5">5 estrelas</option>
                      <option value="4">4 estrelas</option>
                      <option value="3">3 estrelas</option>
                      <option value="2">2 estrelas</option>
                      <option value="1">1 estrela</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredRatings.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">Nenhuma avaliação com este filtro.</p>
                  ) : (
                    filteredRatings.map((rating, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-4 h-4" fill={s <= rating.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(rating.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {rating.comment && (
                          <p className="text-gray-700 text-sm">{rating.comment}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
