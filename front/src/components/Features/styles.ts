import styled from "styled-components";

export const Section = styled.section`
  padding: 60px;
  display: flex;
  justify-content: space-around;
  background: #f9f9f9;
`;

export const Item = styled.div`
  text-align: center;
  max-width: 280px;
`;

export const Icon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

// flex aqui para centralizar o conteúdo do container
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
`;

export const Title = styled.h4`
  font-weight: 600;
  font-size: 25px;
  color: #1a1a1a;
`;

export const Description = styled.p`
  font-size: 18px;
  color: #6b6b6b;
  margin-top: 4px;
`;
