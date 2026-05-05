import { useNavigate } from "react-router-dom";
import { HeaderWrapper, Content, Logo, Nav } from "./styles";
import { Container } from "../Container";
import { Button } from "../Button";
import { Heart, Calendar, User } from "lucide-react";

export function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Container>
        <Content>
          <Logo 
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <Heart size={28} color="#ff2d2d" fill="#ff2d2d" /> VoluntariApp
          </Logo>

          <Nav>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
              <Calendar size={20} /> Eventos
            </span>
            <span style={{ cursor: "pointer" }}>Organizar</span>
            <span 
              onClick={() => navigate("/profile")}
              style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
            >
              <User size={20} /> Perfil
            </span>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Entrar
            </Button>
          </Nav>
        </Content>
      </Container>
    </HeaderWrapper>
  );
}
