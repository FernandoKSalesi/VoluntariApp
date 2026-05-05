import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 420px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex: 1;
  }
`;

export const FooterText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #777;

  span {
    color: red;
    cursor: pointer;
  }
`;

export const Right = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
