// src/presentation/components/Features.tsx
import styled from "styled-components";
import {Container} from "../styles/container";

const Section = styled.section`
  padding: 60px;
  display: flex;
  justify-content: space-around;
  background: #f9f9f9;
`;

const Item = styled.div`
  text-align: center;
  max-width: 280px;
`;

const Icon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

// flex aqui para centralizar o conteúdo do container
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
`;

const Title = styled.h4`
  font-weight: 600;
  font-size: 25px;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 18px;
  color: #6b6b6b;
  margin-top: 4px;
`;

export function Features() {
  return (
    <Section>
      <Container>
        <Content>
          <Item>
            <Icon>❤️</Icon>
            <Title>Causas Autênticas</Title>
            <Description>Eventos verificados com impacto real na comunidade</Description>
          </Item>

          <Item>
            <Icon>👥</Icon>
            <Title>Comunidade Ativa</Title>
            <Description>Conecte-se com pessoas que compartilham seus valores</Description>
          </Item>

          <Item>
            <Icon>📍</Icon>
            <Title>Perto de Você</Title>
            <Description>Encontre oportunidades na sua região</Description>
          </Item>
        </Content>
      </Container>
    </Section>
  );
}