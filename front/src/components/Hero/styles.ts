import styled from "styled-components";

export const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 60px;
  color: white;

  // gradiente que controla o escurecimento da imagem no plano de fundo
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
    url("/images/lp-background-2.jpg") center/cover no-repeat;
`;

export const Content = styled.div`
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 18px;
`;

export const Subtitle = styled.p`
  margin-bottom: 25px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
`;

export const Icon = styled.div`
  font-size: 50px;
  margin-bottom: 12px;
`;
