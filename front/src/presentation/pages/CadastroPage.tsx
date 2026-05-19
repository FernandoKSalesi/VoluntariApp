import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, User, Mail, Phone, CreditCard, Lock } from "lucide-react";

export function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    usuario: "",
    senha: "",
    confirmarSenha: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastro:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Crie sua conta
          </h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize: '1.125rem' }}>
            Comece sua jornada como voluntário
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  placeholder="João Silva"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">CPF</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleChange("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2">Nome de Usuário</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => handleChange("usuario", e.target.value)}
                  placeholder="joaosilva"
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
                  value={formData.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              style={{ fontWeight: 600, fontSize: '1.125rem' }}
            >
              Cadastrar
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-accent hover:underline" style={{ fontWeight: 600 }}>
              Entrar
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1758599668547-2b1192c10abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="Voluntários"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-accent/20" />
      </div>
    </div>
  );
}
