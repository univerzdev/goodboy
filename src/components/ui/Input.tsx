"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { inputSizes, type ControlSize } from "@/styles/components";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  uiSize?: ControlSize;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ uiSize = "md", ...props }, ref) => {
  return <StyledInput ref={ref} $size={uiSize} {...props} />;
});

Input.displayName = "Input";

type StyledInputProps = {
  $size: ControlSize;
};

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: 1px solid ${colors.action.secondary.active};
  border-radius: 0.5rem;
  background: ${colors.inverse};
  color: ${colors.primary};
  outline: none;

  ${typography.text.md.regular}

  ${({ $size }) => {
    const size = inputSizes[$size];
    return css`
      padding: ${size.py} ${size.px};
    `;
  }}

  &::placeholder {
    color: ${colors.tertiary};
  }

  &:focus {
    border-color: ${colors.action.primary.base};
    box-shadow: 0 0 0 0.125rem rgba(79, 70, 229, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Input;
