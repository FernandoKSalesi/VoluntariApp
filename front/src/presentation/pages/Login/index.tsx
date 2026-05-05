import {
  Container,
  Left,
  Right,
  Form,
  InputGroup,
  Row,
  FooterText,
  FormWrapper,
} from "./styles";
import { useState } from "react";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />

      <Container>
        <Left>
          <h1>Bem-vindo de volta</h1>
          <p>Entre para continuar fazendo a diferença</p>

          <FormWrapper>
           <Form onSubmit={handleLogin}>
            <InputGroup>
              <label>Email</label>
              <div>
                <span>📧</span>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </InputGroup>

            <InputGroup>
              <label>Senha</label>
              <div>
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </InputGroup>

            <Row>
              <label>
                <input type="checkbox" />
                Lembrar-me
              </label>

              <span className="link">Esqueceu a senha?</span>
            </Row>

            <button type="submit">Entrar</button>

            <FooterText>
              Não tem uma conta?{" "}
              <span onClick={() => navigate("/register")}>
                Cadastre-se
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