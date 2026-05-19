import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Mail, Lock } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, senha });
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-8">
            <Heart className="w-10 h-10 text-accent fill-accent" />
            <span style={{ fontSize: '2rem', fontWeight: 700 }}>VoluntariApp</span>
          </div>

          <h1 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Bem-vindo de volta
          </h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize: '1.125rem' }}>
            Entre para continuar fazendo a diferença
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-accent" />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="text-accent hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              style={{ fontWeight: 600, fontSize: '1.125rem' }}
            >
              Entrar
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-accent hover:underline" style={{ fontWeight: 600 }}>
              Cadastre-se
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1758599669406-d5179ccefcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="Voluntários"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-accent/20" />
      </div>
    </div>
  );
}
