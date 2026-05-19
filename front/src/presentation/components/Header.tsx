import { Link, useLocation } from "react-router";
import { Heart, User, Calendar } from "lucide-react";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-accent fill-accent" />
          <span className="text-[2rem] tracking-tight" style={{ fontWeight: 700 }}>VoluntariApp</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/eventos"
            className={`flex items-center gap-2 transition-colors ${
              isActive('/eventos') ? 'text-accent' : 'text-foreground hover:text-accent'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Eventos
          </Link>
          <Link
            to="/organizador"
            className={`transition-colors ${
              isActive('/organizador') ? 'text-accent' : 'text-foreground hover:text-accent'
            }`}
          >
            Organizar
          </Link>
          <Link
            to="/perfil"
            className={`flex items-center gap-2 transition-colors ${
              isActive('/perfil') ? 'text-accent' : 'text-foreground hover:text-accent'
            }`}
          >
            <User className="w-5 h-5" />
            Perfil
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
