import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, CreditCard, Lock } from "lucide-react";

import {
  Container,
  Left,
  Right,
  Form,
  Row,
  FooterText,
  FormWrapper
} from "./styles";

import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/usuarios", form);
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
              <Input
                label="Nome completo"
                name="name"
                placeholder="Seu nome completo"
                icon={User}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                icon={Mail}
                onChange={handleChange}
              />

              <Row>
                <Input
                  label="Telefone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  icon={Phone}
                  onChange={handleChange}
                />

                <Input
                  label="CPF"
                  name="cpf"
                  placeholder="000.000.000-00"
                  icon={CreditCard}
                  onChange={handleChange}
                />
              </Row>

              <Input
                label="Nome de Usuário"
                name="username"
                placeholder="@usuario"
                icon={User}
                onChange={handleChange}
              />

              <Input
                label="Senha"
                name="password"
                type="password"
                placeholder="********"
                icon={Lock}
                onChange={handleChange}
              />

              <Button type="submit" style={{ width: "100%", padding: "14px", borderRadius: "10px" }}>
                Cadastrar
              </Button>

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
          <img src="/images/lp-background.jpg" alt="Background" />
        </Right>
      </Container>
    </>
  );
}
