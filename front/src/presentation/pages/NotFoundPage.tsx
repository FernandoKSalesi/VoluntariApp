import { Link } from "react-router";
import { Home,  } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mb-4" style={{ fontSize: '8rem', fontWeight: 700, color: '#FE0000' }}>
          404
        </h1>
        <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>
          Página não encontrada
        </h2>
        <p className="text-muted-foreground mb-8" style={{ fontSize: '1.125rem' }}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
            style={{ fontWeight: 600 }}
          >
            <Home className="w-5 h-5" />
            Voltar para Home
          </Link>
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground rounded-lg hover:bg-foreground hover:text-background transition-all"
            style={{ fontWeight: 600 }}
          >
            Ver Eventos
          </Link>
        </div>
      </div>
    </div>
  );
}
