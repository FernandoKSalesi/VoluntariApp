import { useNavigate } from "react-router-dom";
import { Section, Content, Title, Subtitle, Buttons, Icon } from "./styles";
import { Container } from "../Container";
import { Button } from "../Button";
import { Heart, ArrowRight } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <Section>
      <Container>
        <Content>
          <Icon>
            <Heart size={48} color="#ff2d2d" fill="#ff2d2d" />
          </Icon>
          <Title>Transforme vidas através do voluntariado</Title>
          <Subtitle>
            Conecte-se com causas que importam e faça a diferença na sua comunidade.
          </Subtitle>

          <Buttons>
            <Button 
              variant="primary" 
              onClick={() => navigate("/events")}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              Explorar Eventos <ArrowRight size={20} />
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Cadastrar-se
            </Button>
          </Buttons>
        </Content>
      </Container>
    </Section>
  );
}
