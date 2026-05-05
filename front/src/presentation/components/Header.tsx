import styled from "styled-components";
import { Container } from "../styles/container"; // talvez não precise desse container, é só pra landing page centralizar

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
`;

export function Header() {
  return (
    <HeaderWrapper>
      <Container>
        <Content>
          <Logo>❤️ VoluntariApp</Logo>

          <Nav>
            <span>📅 Eventos</span>
            <span>Organizar</span>
            <span>👤 Perfil</span>
            <Button>Entrar</Button>
          </Nav>
        </Content>
      </Container>
    </HeaderWrapper>
  );
}