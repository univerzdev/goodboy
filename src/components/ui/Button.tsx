"use client";

import Image from "next/image";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import styled, { css, keyframes } from "styled-components";
import { buttonSizes, buttonVariants, type ButtonVariant, type ControlSize } from "@/styles/components";
import { typography } from "@/styles/typography";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ControlSize;
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "xl", loading = false, disabled, children, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $loading={loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <LoadingIcon aria-hidden="true">
            <Image src="/icons/loading.svg" alt="" width={20} height={20} />
          </LoadingIcon>
        )}
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ControlSize;
  $loading: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  transition:
    background-color 120ms ease,
    opacity 120ms ease;

  ${typography.text.md.medium}

  ${({ $size }) => {
    const size = buttonSizes[$size];
    return css`
      padding: ${size.py} ${size.px};
      gap: ${size.gap};
    `;
  }}

  ${({ $variant, $loading }) => {
    const variant = buttonVariants[$variant];
    return css`
      background: ${$loading ? variant.loading : variant.base};
      color: ${variant.text};

      &:focus-visible {
        outline: 2px solid ${variant.active};
        outline-offset: 2px;
      }

      &:hover {
        background: ${variant.hover};
      }

      &:active {
        background: ${variant.active};
      }

      &:disabled {
        background: ${variant.disabled};
        opacity: 0.32;
        cursor: not-allowed;
      }
    `;
  }}
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  animation: ${spin} 1.6s linear infinite;
`;

export default Button;
