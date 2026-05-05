import {
  Container,
  Left,
  Right,
  Form,
  InputGroup,
  Row,
  FooterText,
  FormWrapper
} from "./styles";
import { useState } from "react";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    username: "",
    password: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />

      <Container>
        <Left>
          <h1>Crie sua conta</h1>
          <p>Comece sua jornada como voluntário</p>

          <FormWrapper>
            <Form onSubmit={handleRegister}>
              <InputGroup>
                <label>Nome completo</label>
                <div>
                  <span>👤</span>
                  <input name="name" onChange={handleChange} />
                </div>
              </InputGroup>

              <InputGroup>
                <label>Email</label>
                <div>
                  <span>📧</span>
                  <input name="email" onChange={handleChange} />
                </div>
              </InputGroup>

              <Row>
                <InputGroup>
                  <label>Telefone</label>
                  <div>
                    <span>📱</span>
                    <input name="phone" onChange={handleChange} />
                  </div>
                </InputGroup>

                <InputGroup>
                  <label>CPF</label>
                  <div>
                    <span>🪪</span>
                    <input name="cpf" onChange={handleChange} />
                  </div>
                </InputGroup>
              </Row>

              <InputGroup>
                <label>Nome de Usuário</label>
                <div>
                  <span>👤</span>
                  <input name="username" onChange={handleChange} />
                </div>
              </InputGroup>

              <InputGroup>
                <label>Senha</label>
                <div>
                  <span>🔒</span>
                  <input type="password" name="password" onChange={handleChange} />
                </div>
              </InputGroup>

              <button type="submit">Cadastrar</button>

              <FooterText>
                Já tem uma conta?{" "}
                <span onClick={() => navigate("/login")}>
                  Entrar
                </span>
              </FooterText>
            </Form>
          </FormWrapper>
        </Left>

        <Right>
          <img src="/images/lp-background.jpg" />
        </Right>
      </Container>
    </>
  );
}