import styled from "styled-components";

export const Container = styled.div`
  padding: 40px 80px;

  h1 {
    margin-bottom: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 20px;
`;

export const Card = styled.div`
  background: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: red;
    cursor: pointer;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background: #e0e0e0;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex: 1;
  }
`;

export const SideCard = styled.div`
  width: 280px;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 12px;
  text-align: center;

  .avatar {
    background: red;
    color: white;
    font-size: 40px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
  }

  .stats {
    margin-top: 20px;
    text-align: left;

    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
`;