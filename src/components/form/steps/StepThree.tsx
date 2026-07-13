"use client";

import type { UseFormReturn } from "react-hook-form";
import { useFormState } from "react-hook-form";
import styled from "styled-components";
import FormField from "@/components/form/FormField";
import type { DonationFormValues } from "@/components/form/types";
import { t } from "@/lib/i18n";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

type StepThreeProps = {
  form: UseFormReturn<DonationFormValues, undefined, DonationFormValues>;
  dialCode: string;
};

const FIELD_IDS = {
  CONSENT: "donation-consent",
  CONSENT_ERROR: "donation-consent-error",
} as const;

const StepThree = ({ form, dialCode }: StepThreeProps) => {
  const { errors, touchedFields, submitCount } = useFormState({ control: form.control });
  const values = form.getValues();
  const showConsentError = Boolean(touchedFields.consent) || submitCount > 0;

  return (
    <StepRoot>
      <Headline>{t("form.stepThree.title")}</Headline>
      <StepContent>
        <SummaryTitle>{t("form.stepThree.summaryTitle")}</SummaryTitle>

        <SummaryGrid>
          <SummaryLabel>{t("form.stepThree.helpTypeLabel")}</SummaryLabel>
          <SummaryValue>
            {values.donationType === "task" ? t("form.stepThree.helpTypeTask") : t("form.stepThree.helpTypeFoundation")}
          </SummaryValue>

          <SummaryLabel>{t("form.stepThree.shelterLabel")}</SummaryLabel>
          <SummaryValue>{values.shelter?.name || t("form.stepThree.shelterEmpty")}</SummaryValue>

          <SummaryLabel>{t("form.stepThree.amountLabel")}</SummaryLabel>
          <SummaryValue>{values.amount} €</SummaryValue>
        </SummaryGrid>

        <SectionDivider aria-hidden="true" />

        <SummaryGrid>
          <SummaryLabel>{t("form.stepThree.fullNameLabel")}</SummaryLabel>
          <SummaryValue>
            {[values.firstName, values.lastName].filter(Boolean).join(" ") || t("form.stepThree.fullNameEmpty")}
          </SummaryValue>

          <SummaryLabel>{t("form.stepThree.emailLabel")}</SummaryLabel>
          <SummaryValue>{values.email}</SummaryValue>

          <SummaryLabel>{t("form.stepThree.phoneLabel")}</SummaryLabel>
          <SummaryValue>
            {dialCode} {values.phoneNumber}
          </SummaryValue>
        </SummaryGrid>

        <SectionDivider aria-hidden="true" />

        <FormField
          label=""
          errorId={FIELD_IDS.CONSENT_ERROR}
          required
          error={showConsentError ? errors.consent?.message : undefined}
        >
          <ConsentLabel htmlFor={FIELD_IDS.CONSENT}>
            <ConsentCheckbox
              id={FIELD_IDS.CONSENT}
              type="checkbox"
              aria-describedby={showConsentError ? FIELD_IDS.CONSENT_ERROR : undefined}
              aria-invalid={showConsentError ? Boolean(errors.consent) : false}
              {...form.register("consent")}
            />
            {t("form.stepThree.consentLabel")}
          </ConsentLabel>
        </FormField>
      </StepContent>
    </StepRoot>
  );
};

const StepRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Headline = styled.h1`
  color: ${colors.primary};
  ${typography.heading.lg}
`;

const SummaryTitle = styled.h2`
  margin: 0;
  color: ${colors.primary};
  ${typography.text.md.semibold}
`;

const SummaryGrid = styled.dl`
  margin: 0;
  padding: 16px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
`;

const SectionDivider = styled.div`
  padding: 16px 0;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: ${colors.quintarny};
  }
`;

const SummaryLabel = styled.dt`
  margin: 0;
  color: #374151;
  ${typography.text.md.regular}
`;

const SummaryValue = styled.dd`
  margin: 0;
  text-align: right;
  color: ${colors.primary};
  ${typography.text.md.semibold}
`;

const ConsentLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.tertiary};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const ConsentCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${colors.quaternary};
  background: ${colors.background};
  appearance: none;
  -webkit-appearance: none;
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 1px;
    width: 12px;
    height: 12px;
    background-image: url("/icons/check.svg");
    background-size: 12px 12px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
  }

  &:checked {
    border-color: ${colors.action.primary.base};
    background: #4f46e533;
  }

  &:checked::after {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${colors.action.primary.active};
    outline-offset: 2px;
  }

  &[aria-invalid="true"] {
    border-color: ${colors.semantic.error};
  }
`;

export default StepThree;
