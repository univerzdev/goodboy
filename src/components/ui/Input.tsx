"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

Input.displayName = "Input";

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #f3f4f6;
  color: ${colors.primary};
  outline: none;
  font-family: var(--font-inter), sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  vertical-align: middle;
  padding: 16px;

  ${typography.text.md.regular}

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    background: #e5e7eb;
    border-color: #e5e7eb;
  }

  &:focus {
    border: 1px solid #3730a3;
    box-shadow: 0 0 0 2px #3730a33d;
  }

  &[aria-invalid="true"] {
    border: 1px solid #be123c;
    box-shadow: none;
  }

  &[aria-invalid="true"]:focus {
    border: 1px solid #be123c;
    box-shadow: 0 0 0 2px #f43f5e3d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Input;
