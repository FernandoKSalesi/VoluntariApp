// src/presentation/components/Hero.tsx
import styled from "styled-components";
import { Container } from "../styles/container";

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 60px;
  color: white;

  // gradiente que controla o escurecimento da imagem no plano de fundo
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
    url("/images/lp-background-2.jpg") center/cover no-repeat;
`;

const Content = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 18px;
`;

const Subtitle = styled.p`
  margin-bottom: 25px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  background: #ff0000;
  color: white;
  padding: 16px 32px;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
`;

const SecondaryButton = styled.button`
  background: white;
  color: #111;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 17px;
`;

const Icon = styled.div`
  font-size: 50px;
  margin-bottom: 12px;
`;

export function Hero() {
  return (
    <Section>
      <Container>
        <Content>
        <Icon>❤️</Icon>
        <Title> Transforme vidas através do voluntariado</Title>
        <Subtitle>
          Conecte-se com causas que importam e faça a diferença na sua comunidade.
        </Subtitle>

        <Buttons>
          <PrimaryButton>Explorar Eventos ➜ </PrimaryButton>
          <SecondaryButton>Cadastrar-se</SecondaryButton>
        </Buttons>
      </Content>
      </Container>
    </Section>
  );
}