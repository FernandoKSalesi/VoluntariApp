// src/presentation/components/FeaturedEvents.tsx
import styled from "styled-components";
import {Container} from "../styles/container";

const Section = styled.section`
  padding: 60px;
  text-align: center;
  background: #fff;
`;

const Title = styled.h2`
  margin-bottom: 18px;
  font-size: 45px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin-bottom: 32px;
  color: #666;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: 2px solid #000000;
  border-radius: 8px;
  background: transparent;
  font-weight: 400;
  font-size: 18px;
`;

export function FeaturedEvents() {
  return (
    <Section>
      <Container>
        <Title>Eventos em Destaque</Title>
        <Subtitle>Junte-se a ações que estão acontecendo agora</Subtitle>

        {/* Nas próximas sprints será introduzido a criação de eventos, 
        então será possível visualizar eventos no landing page */}

        <Button>Ver Todos os Eventos →</Button>
      </Container>
    </Section>
  );
}