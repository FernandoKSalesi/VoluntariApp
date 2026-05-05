import { Section, Title, Subtitle } from "./styles";
import { Container } from "../Container";
import { Button } from "../Button";

export function FeaturedEvents() {
  return (
    <Section>
      <Container>
        <Title>Eventos em Destaque</Title>
        <Subtitle>Junte-se a ações que estão acontecendo agora</Subtitle>

        {/* Nas próximas sprints será introduzido a criação de eventos, 
        então será possível visualizar eventos no landing page */}

        <Button variant="outline">Ver Todos os Eventos →</Button>
      </Container>
    </Section>
  );
}
