import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Heart, User, Calendar, Bell, CheckCircle } from "lucide-react";
import { ApiClient } from "../../data/services/ApiClient";

export function Header() {
  const location = useLocation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const hasToken = !!localStorage.getItem("token");

  useEffect(() => {
    if (hasToken) {
      loadNotifications();
    }
  }, [hasToken]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await ApiClient.get("/notifications");
      setNotifications(data);
    } catch (e) {
      console.error("Erro ao buscar notificações", e);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await ApiClient.put(`/notifications/${id}/read`, {});
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error("Erro ao marcar como lida", e);
    }
  };

  const markAllAsRead = async () => {
    try {
      await ApiClient.put('/notifications/read-all', {});
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error("Erro ao limpar notificações", e);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border relative">
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
          {hasToken ? (
            <>
              <Link
                to="/organizador"
                className={`transition-colors ${
                  isActive('/organizador') ? 'text-accent' : 'text-foreground hover:text-accent'
                }`}
              >
                Organizar
              </Link>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-foreground hover:text-accent transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                      <h3 className="font-semibold">Notificações</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead} 
                          className="text-xs text-accent hover:underline"
                        >
                          Limpar tudo
                        </button>
                      )}
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-center text-sm text-muted-foreground">Nenhuma notificação</p>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n.id} 
                            className={`p-4 border-b border-border last:border-0 hover:bg-secondary transition-colors ${!n.read ? 'bg-accent/5' : ''}`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <p className="font-semibold text-sm">{n.title}</p>
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground mt-2">
                                  {n.sentAt ? new Date(n.sentAt).toLocaleString('pt-BR') : ''}
                                </p>
                              </div>
                              {!n.read && (
                                <button 
                                  onClick={() => markAsRead(n.id)}
                                  className="text-accent hover:text-accent/80 transition-colors"
                                  title="Marcar como lida"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/perfil"
                className={`flex items-center gap-2 transition-colors ${
                  isActive('/perfil') ? 'text-accent' : 'text-foreground hover:text-accent'
                }`}
              >
                <User className="w-5 h-5" />
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
