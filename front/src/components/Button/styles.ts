import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline';
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 16px 32px;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  border: none;

  ${(props) => props.$variant === 'primary' && css`
    background: #ff0000;
    color: white;
  `}

  ${(props) => props.$variant === 'secondary' && css`
    background: white;
    color: #111;
  `}

  ${(props) => props.$variant === 'outline' && css`
    background: transparent;
    border: 2px solid #000000;
    color: #000;
  `}
`;
