import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search, MapPin, Calendar, Users, SlidersHorizontal } from "lucide-react";
import { useEventosController } from "../controllers/useEventosController";

const categorias = ["Todas", "Meio Ambiente", "Alimentação", "Educação", "Saúde", "Construção"];

export function EventosPage() {
  const { events, loading } = useEventosController();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = selectedCategoria === "Todas" || event.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}
          >
            Eventos de Voluntariado
          </motion.h1>
          <p className="text-muted-foreground" style={{ fontSize: '1.125rem' }}>
            Encontre oportunidades para fazer a diferença
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-secondary rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-6 bg-secondary rounded-lg"
            >
              <h3 className="mb-4" style={{ fontWeight: 600 }}>Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoria(cat)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategoria === cat
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-white hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Link to={`/eventos/${event.id}`} className="group block">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3] shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 rounded-full" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {event.categoria}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground rounded-full" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {event.vagas} vagas
                  </div>
                </div>
                <h3 className="mb-2 group-hover:text-accent transition-colors" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {event.descricao}
                </p>
                <div className="flex flex-col gap-2 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Nenhum evento encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros ou busca
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
