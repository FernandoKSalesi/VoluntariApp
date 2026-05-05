import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import {
  Container,
  Left,
  Right,
  Form,
  Row,
  FooterText,
  FormWrapper,
  ErrorMessage,
} from "./styles";

import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Erro ao fazer login. Tente novamente.");
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
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Senha"
                type="password"
                placeholder="********"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Row>
                <label>
                  <input type="checkbox" />
                  Lembrar-me
                </label>

                {/* <span className="link">Esqueceu a senha?</span> */}
              </Row>

              <Button type="submit" style={{ width: "100%", padding: "14px", borderRadius: "10px" }}>
                Entrar
              </Button>

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
          <img src="/images/lp-background.jpg" alt="Background" />
        </Right>
      </Container>
    </>
  );
}
