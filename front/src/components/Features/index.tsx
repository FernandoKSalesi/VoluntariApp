import { Section, Item, Icon, Content, Title, Description } from "./styles";
import { Container } from "../Container";
import { Heart, Users, MapPin } from "lucide-react";

export function Features() {
  return (
    <Section>
      <Container>
        <Content>
          <Item>
            <Icon>
              <Heart size={32} color="#ff2d2d" />
            </Icon>
            <Title>Causas Autênticas</Title>
            <Description>Eventos verificados com impacto real na comunidade</Description>
          </Item>

          <Item>
            <Icon>
              <Users size={32} color="#1a1a1a" />
            </Icon>
            <Title>Comunidade Ativa</Title>
            <Description>Conecte-se com pessoas que compartilham seus valores</Description>
          </Item>

          <Item>
            <Icon>
              <MapPin size={32} color="#1a1a1a" />
            </Icon>
            <Title>Perto de Você</Title>
            <Description>Encontre oportunidades na sua região</Description>
          </Item>
        </Content>
      </Container>
    </Section>
  );
}
