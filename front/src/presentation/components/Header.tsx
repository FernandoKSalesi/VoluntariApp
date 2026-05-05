import styled from "styled-components";
import { Container } from "../styles/container";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 30.8px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Button = styled.button`
  background: #ff2d2d;
  color: white;
  font-weight: 400;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

export function Header() {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Container>
        <Content>
          <Logo onClick={() => navigate("/")}>
            ❤️ VoluntariApp
          </Logo>

          <Nav>
            <span>📅 Eventos</span>
            <span>Organizar</span>
            <span onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
               👤 Perfil
            </span>

            <Button onClick={() => navigate("/login")}>
              Entrar
            </Button>
          </Nav>
        </Content>
      </Container>
    </HeaderWrapper>
  );
}