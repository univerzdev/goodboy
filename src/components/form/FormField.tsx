"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

type FormFieldProps = {
  label: string;
  fieldId?: string;
  errorId?: string;
  required?: boolean;
  optionalText?: string;
  error?: string;
  children: ReactNode;
};

const FormField = ({ label, fieldId, errorId, required = false, optionalText, error, children }: FormFieldProps) => {
  return (
    <FieldRoot>
      {label ? (
        <Label htmlFor={fieldId} $error={Boolean(error)}>
          {label}
          {!required && optionalText ? <OptionalText>{optionalText}</OptionalText> : null}
        </Label>
      ) : null}
      {children}
      {error ? (
        <FieldError id={errorId} role="alert" aria-live="polite">
          {error}
        </FieldError>
      ) : null}
    </FieldRoot>
  );
};

const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Label = styled.label<{ $error: boolean }>`
  ${typography.text.sm.medium}
  color: ${({ $error }) => ($error ? colors.semantic.error : colors.primary)};
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
`;

const OptionalText = styled.span`
  color: ${colors.quaternary};
`;

const FieldError = styled.span`
  display: block;
  margin-top: 4px;
  ${typography.text.sm.medium}
  font-weight: 400;
  color: ${colors.semantic.error};
`;

export default FormField;
