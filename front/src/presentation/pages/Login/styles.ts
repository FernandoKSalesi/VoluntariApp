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
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 36px;
    margin-bottom: 10px;
  }

  p {
    color: #777;
    margin-bottom: 30px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 420px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;

  button {
    background: #ff2d2d;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
    font-weight: 500;
  }

  div {
    display: flex;
    align-items: center;
    background: #f2f2f2;
    border-radius: 10px;
    padding: 12px;
    gap: 10px;

    span {
      opacity: 0.6;
    }

    input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    display: flex;
    gap: 6px;
    font-size: 14px;
  }

  .link {
    color: red;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const FooterText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #777;

  span {
    color: red;
    cursor: pointer;
    font-weight: 500;
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