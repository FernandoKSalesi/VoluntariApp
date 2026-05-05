import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { Container, InputWrapper, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export function Input({ label, icon: Icon, ...props }: InputProps) {
  return (
    <Container>
      <label>{label}</label>
      <InputWrapper $disabled={props.disabled}>
        {Icon && <Icon size={20} className="icon" />}
        <StyledInput {...props} />
      </InputWrapper>
    </Container>
  );
}
