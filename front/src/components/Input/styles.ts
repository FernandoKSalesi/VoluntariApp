import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #111;
  }
`;

interface InputWrapperProps {
  $disabled?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 10px;
  padding: 12px;
  gap: 10px;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:focus-within {
    border-color: #ff2d2d;
    background: #fff;
  }

  .icon {
    color: #111;
    opacity: 0.6;
  }

  ${(props) => props.$disabled && css`
    background: #e0e0e0;
    cursor: not-allowed;
    opacity: 0.8;
  `}
`;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
  color: #111;

  &::placeholder {
    color: #777;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
