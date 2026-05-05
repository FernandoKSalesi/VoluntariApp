import { useState, useEffect } from "react";
import { User, Mail, Phone, CreditCard, Edit2, Save } from "lucide-react";

import {
  Container,
  Content,
  Card,
  TitleRow,
  Row,
  SideCard
} from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    username: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/usuarios/me");
        const { nome, email, telefone, cpf, username } = response.data;
        setForm({
          name: nome || "",
          email: email || "",
          phone: telefone || "",
          cpf: cpf || "",
          username: username || "",
        });
      } catch (err) {
        console.error("Erro ao carregar perfil", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      await api.put("/usuarios", form);
      setEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar perfil", err);
      alert("Erro ao atualizar perfil.");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <p>Carregando...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />

      <Container>
        <h1>Meu Perfil</h1>

        <Content>
          {/* ESQUERDA */}
          <div style={{ flex: 1 }}>
            <Card>
              <TitleRow>
                <h2>Informações Pessoais</h2>

                <span 
                  onClick={() => editing ? handleSave() : setEditing(true)} 
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  {editing ? (
                    <>
                      <Save size={18} /> Salvar
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} /> Editar
                    </>
                  )}
                </span>
              </TitleRow>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <Input
                  label="Nome Completo"
                  name="name"
                  value={form.name}
                  disabled={!editing}
                  onChange={handleChange}
                  icon={User}
                />

                <Input
                  label="Email"
                  name="email"
                  value={form.email}
                  disabled={!editing}
                  onChange={handleChange}
                  icon={Mail}
                />

                <Row>
                  <Input
                    label="Telefone"
                    name="phone"
                    value={form.phone}
                    disabled={!editing}
                    onChange={handleChange}
                    icon={Phone}
                  />

                  <Input
                    label="CPF"
                    name="cpf"
                    value={form.cpf}
                    disabled={!editing}
                    onChange={handleChange}
                    icon={CreditCard}
                  />
                </Row>
              </div>
            </Card>

            <Card>
              <h2>Meus Eventos</h2>
              <p style={{ color: "#777", marginTop: "10px" }}>
                Você ainda não participou de eventos.
              </p>
            </Card>
          </div>

          {/* DIREITA */}
          <SideCard>
            <div className="avatar">
              <User size={40} />
            </div>

            <h3>{form.name}</h3>
            <span>@{form.username}</span>

            <div className="stats">
              <div>
                <span>Eventos participados</span>
                <strong>0</strong>
              </div>

              <div>
                <span>Horas voluntariadas</span>
                <strong>0h</strong>
              </div>

              <div>
                <span>Impacto gerado</span>
                <strong>Baixo</strong>
              </div>
            </div>
          </SideCard>
        </Content>
      </Container>
    </>
  );
}
