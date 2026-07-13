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
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  background: ${colors.secondary};
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
    color: ${colors.quaternary};
  }

  &:hover {
    background: ${colors.action.secondary.hover};
    border-color: ${colors.action.secondary.hover};
  }

  &:focus {
    border: 1px solid ${colors.action.primary.active};
    box-shadow: 0 0 0 2px #3730a33d;
  }

  &[aria-invalid="true"] {
    border: 1px solid ${colors.semantic.error};
    box-shadow: none;
  }

  &[aria-invalid="true"]:focus {
    border: 1px solid ${colors.semantic.error};
    box-shadow: 0 0 0 2px #f43f5e3d;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Input;
