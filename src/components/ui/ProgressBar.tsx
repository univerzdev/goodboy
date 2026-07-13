"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

export type ProgressBarProps = {
  steps: string[];
  currentStep?: number;
  ariaLabel?: string;
  onStepClick?: (step: number) => void;
  className?: string;
};

type StepState = "completed" | "active" | "upcoming";

type StepItemProps = {
  $state: StepState;
};

const ProgressBar = ({ steps, currentStep = 1, ariaLabel = "Progress", onStepClick, className }: ProgressBarProps) => {
  return (
    <Root className={className} aria-label={ariaLabel} $steps={steps.length}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const state: StepState =
          stepNumber < currentStep ? "completed" : stepNumber === currentStep ? "active" : "upcoming";
        const isClickable = state === "completed" && Boolean(onStepClick);

        return (
          <ProgressFragment key={step}>
            <StepHeader
              type="button"
              onClick={isClickable ? () => onStepClick?.(stepNumber) : undefined}
              $clickable={isClickable}
              disabled={!isClickable}
              aria-current={state === "active" ? "step" : undefined}
            >
              <StepCircle $state={state}>
                {state === "completed" ? <Image src="/icons/check.svg" alt="" width={16} height={16} /> : stepNumber}
              </StepCircle>
              <StepLabel $state={state}>{step}</StepLabel>
            </StepHeader>

            {index < steps.length - 1 ? <Connector $state={state} aria-hidden="true" /> : null}
          </ProgressFragment>
        );
      })}
    </Root>
  );
};

const Root = styled.nav<{ $steps: number }>`
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: ${({ $steps }) =>
    Array.from({ length: $steps }, (_, index) => (index < $steps - 1 ? "auto minmax(32px, 1fr)" : "auto")).join(" ")};
  column-gap: 0;
  width: 100%;
`;

const ProgressFragment = styled.div`
  display: contents;
`;

const StepHeader = styled.button<{ $clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: max-content;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  user-select: none;
  -webkit-user-select: none;

  ${({ $clickable }) =>
    $clickable
      ? css`
          cursor: pointer;
        `
      : css`
          cursor: default;
          opacity: 1;
        `}
`;

const StepCircle = styled.div<StepItemProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid ${colors.quintarny};
  flex: 0 0 auto;
  ${typography.text.md.regular}
  color: ${colors.primary};

  ${({ $state }) => {
    if ($state === "active") {
      return css`
        background: ${colors.action.primary.base};
        color: ${colors.inverse};
        border-color: ${colors.action.primary.base};
      `;
    }

    if ($state === "completed") {
      return css`
        background: ${colors.background};
        border-color: ${colors.action.primary.base};
        color: ${colors.action.primary.base};
      `;
    }

    return css`
      background: ${colors.background};
      border-color: ${colors.quintarny};
      color: ${colors.quintarny};
    `;
  }}
`;

const StepLabel = styled.span<StepItemProps>`
  min-width: 0;
  white-space: nowrap;
  ${typography.text.md.regular}

  ${({ $state }) => {
    if ($state === "active") {
      return css`
        color: ${colors.primary};
      `;
    }

    if ($state === "completed") {
      return css`
        color: ${colors.primary};
      `;
    }

    return css`
      color: ${colors.quintarny};
    `;
  }}
`;

const Connector = styled.div<StepItemProps>`
  width: 100%;
  min-width: 0;
  padding-left: 8px;
  padding-right: 16px;
  align-self: center;

  &::before {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background: ${colors.quintarny};
  }

  ${({ $state }) =>
    $state === "completed"
      ? css`
          &::before {
            background: ${colors.quintarny};
          }
        `
      : null}
`;

export default ProgressBar;
