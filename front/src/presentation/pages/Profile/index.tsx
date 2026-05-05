import {
  Container,
  Content,
  Card,
  TitleRow,
  InputGroup,
  Row,
  SideCard} from "./styles";
import { Header } from "../../components/Header";
import { useState } from "react";

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    cpf: "000.000.000-00",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Header />

      <Container>
        <h1>Meu Perfil</h1>

        <Content>
          {/* ESQUERDA */}
          <div>
            <Card>
              <TitleRow>
                <h2>Informações Pessoais</h2>

                <span onClick={() => setEditing(!editing)}>
                  ✏️ {editing ? "Salvar" : "Editar"}
                </span>
              </TitleRow>

              <InputGroup>
                <label>Nome Completo</label>
                <input
                  name="name"
                  value={form.name}
                  disabled={!editing}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  disabled={!editing}
                  onChange={handleChange}
                />
              </InputGroup>

              <Row>
                <InputGroup>
                  <label>Telefone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup>
                  <label>CPF</label>
                  <input
                    name="cpf"
                    value={form.cpf}
                    disabled={!editing}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Row>
            </Card>

            {/* EVENTOS (vazio como você pediu) */}
            <Card>
              <h2>Meus Eventos</h2>

              <p style={{ color: "#777" }}>
                Você ainda não participou de eventos.
              </p>
            </Card>
          </div>

          {/* DIREITA */}
          <SideCard>
            <div className="avatar">👤</div>

            <h3>{form.name}</h3>
            <span>@usuario</span>

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