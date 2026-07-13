"use client";

import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useFormState } from "react-hook-form";
import { useWatch } from "react-hook-form";
import styled, { css } from "styled-components";
import { useSheltersQuery } from "@/api/shelters/queries";
import { DONATION_AMOUNTS } from "@/constants/donationForm";
import type { DonationFormValues } from "@/components/form/types";
import { t } from "@/lib/i18n";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormField from "@/components/form/FormField";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";

type StepOneProps = {
  form: UseFormReturn<DonationFormValues, undefined, DonationFormValues>;
};

const FIELD_IDS = {
  SHELTER: "donation-shelter",
  SHELTER_ERROR: "donation-shelter-error",
  AMOUNT_CONTAINER: "donation-amount",
  AMOUNT_INPUT: "donation-amount-input",
  AMOUNT_ERROR: "donation-amount-error",
} as const;

const StepOne = ({ form }: StepOneProps) => {
  const { errors } = useFormState({ control: form.control });
  const { data: shelters = [], isLoading, isError } = useSheltersQuery();
  const projectTitle = t("form.stepOne.projectTitle");
  const selectedDonationType = useWatch({ control: form.control, name: "donationType" });
  const selectedShelter = useWatch({ control: form.control, name: "shelter" });

  return (
    <StepRoot>
      <Headline>{t("form.stepOne.title")}</Headline>
      <StepContent>
        <Controller
          control={form.control}
          name="donationType"
          render={({ field }) => (
            <TypeSwitcher
              role="radiogroup"
              aria-label={t("form.stepOne.helpTypeAria")}
              onKeyDown={(event) => {
                if (
                  event.key !== "ArrowLeft" &&
                  event.key !== "ArrowRight" &&
                  event.key !== "ArrowUp" &&
                  event.key !== "ArrowDown"
                ) {
                  return;
                }

                event.preventDefault();
                field.onChange(field.value === "task" ? "foundation" : "task");
              }}
            >
              <TypeButton
                ref={field.value === "task" ? field.ref : undefined}
                type="button"
                role="radio"
                aria-checked={field.value === "task"}
                aria-label={t("form.stepOne.optionTask")}
                $active={field.value === "task"}
                onClick={() => field.onChange("task")}
                onBlur={field.onBlur}
              >
                {t("form.stepOne.optionTask")}
              </TypeButton>

              <TypeButton
                ref={field.value === "foundation" ? field.ref : undefined}
                type="button"
                role="radio"
                aria-checked={field.value === "foundation"}
                aria-label={t("form.stepOne.optionFoundation")}
                $active={field.value === "foundation"}
                onClick={() => field.onChange("foundation")}
                onBlur={field.onBlur}
              >
                {t("form.stepOne.optionFoundation")}
              </TypeButton>
            </TypeSwitcher>
          )}
        />

        <SectionBlock>
          <SectionHeading>{projectTitle === "form.stepOne.projectTitle" ? "O projekte" : projectTitle}</SectionHeading>
          <FormField
            label={t("form.stepOne.shelterLabel")}
            fieldId={FIELD_IDS.SHELTER}
            errorId={FIELD_IDS.SHELTER_ERROR}
            required={selectedDonationType === "task"}
            optionalText={` ${t("form.stepOne.optional")}`}
            error={errors.shelter?.message}
          >
            <Controller
              control={form.control}
              name="shelter"
              render={({ field }) => (
                <SelectWrap>
                  <Select
                    $placeholder={!selectedShelter}
                    id={FIELD_IDS.SHELTER}
                    aria-describedby={FIELD_IDS.SHELTER_ERROR}
                    value={field.value ? String(field.value.id) : ""}
                    onChange={(event) => {
                      const selectedId = Number(event.target.value);

                      if (!selectedId) {
                        field.onChange(null);
                        return;
                      }

                      const selected = shelters.find((shelter) => shelter.id === selectedId);
                      field.onChange(selected ? { id: selected.id, name: selected.name } : null);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-invalid={Boolean(errors.shelter)}
                  >
                    <option value="">{t("form.stepOne.shelterPlaceholder")}</option>
                    {isLoading ? <option disabled>{t("form.stepOne.shelterLoading")}</option> : null}
                    {isError ? <option disabled>{t("form.stepOne.shelterError")}</option> : null}
                    {!isLoading && !isError && shelters.length === 0 ? (
                      <option disabled>{t("form.stepOne.shelterEmpty")}</option>
                    ) : null}
                    {!isLoading && !isError
                      ? shelters.map((shelter) => (
                          <option value={shelter.id} key={shelter.id}>
                            {shelter.name}
                          </option>
                        ))
                      : null}
                  </Select>
                  <SelectChevron aria-hidden="true">
                    <Image src="/icons/chevron.svg" alt="" width={16} height={16} />
                  </SelectChevron>
                </SelectWrap>
              )}
            />
          </FormField>
        </SectionBlock>

        <Controller
          control={form.control}
          name="amount"
          render={({ field }) => {
            const amountValue = field.value > 0 ? String(field.value) : "";
            const amountWidth = `${Math.max(amountValue.length, 1)}ch`;

            return (
              <SectionBlock>
                <SectionHeading>{t("form.stepOne.amountLabel")}</SectionHeading>
                <FormField
                  label=""
                  fieldId={FIELD_IDS.AMOUNT_INPUT}
                  errorId={FIELD_IDS.AMOUNT_ERROR}
                  required
                  error={errors.amount?.message}
                >
                  <AmountInputRow id={FIELD_IDS.AMOUNT_CONTAINER}>
                    <AmountInput
                      id={FIELD_IDS.AMOUNT_INPUT}
                      type="number"
                      min={1}
                      inputMode="numeric"
                      aria-describedby={FIELD_IDS.AMOUNT_ERROR}
                      aria-label={t("form.stepOne.amountLabel")}
                      placeholder="0"
                      value={amountValue}
                      style={{ width: amountWidth }}
                      onChange={(event) => {
                        const rawValue = event.target.value;
                        const parsedValue = rawValue === "" ? 0 : Number(rawValue);
                        const nextValue = Number.isNaN(parsedValue) ? 0 : parsedValue;
                        field.onChange(nextValue);

                        if (nextValue >= 1) {
                          form.clearErrors("amount");
                        }
                      }}
                      onBlur={field.onBlur}
                      aria-invalid={Boolean(errors.amount)}
                    />
                    <EuroIconWrap aria-hidden="true">
                      <Image src="/icons/euro.svg" alt="" width={24} height={24} />
                    </EuroIconWrap>
                  </AmountInputRow>

                  <QuickAmounts>
                    {DONATION_AMOUNTS.map((value) => (
                      <QuickAmountButton
                        key={value}
                        type="button"
                        $active={field.value === value}
                        onClick={() => {
                          field.onChange(value);
                          form.clearErrors("amount");
                        }}
                      >
                        {value} €
                      </QuickAmountButton>
                    ))}
                  </QuickAmounts>
                </FormField>
              </SectionBlock>
            );
          }}
        />
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
  gap: 40px;
`;

const Headline = styled.h1`
  ${typography.heading.lg}
`;

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionHeading = styled.h2`
  margin: 0;
  color: ${colors.primary};
  ${typography.text.md.semibold}
`;

const TypeSwitcher = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 4px;
  border: 1px solid ${colors.quintarny};
  border-radius: 12px;
  background: ${colors.background};
`;

const TypeButton = styled.button<{ $active: boolean }>`
  ${typography.text.sm.medium}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border: 0;
  border-radius: 8px;
  background: ${colors.background};
  color: ${colors.primary};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;

  &:focus-visible {
    outline: 2px solid ${colors.action.primary.base};
    outline-offset: -2px;
  }

  ${({ $active }) =>
    $active
      ? css`
          background: ${colors.action.primary.base};
          color: ${colors.inverse};
        `
      : null}
`;

const SelectWrap = styled.div`
  position: relative;
`;

const Select = styled.select<{ $placeholder: boolean }>`
  width: 100%;
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  background: ${colors.secondary};
  padding: 14px 44px 14px 16px;
  ${typography.text.md.regular}
  font-family: var(--font-inter), sans-serif;
  font-style: normal;
  letter-spacing: 0;
  vertical-align: middle;
  color: ${({ $placeholder }) => ($placeholder ? colors.quaternary : colors.primary)};
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;

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
`;

const SelectChevron = styled.span`
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%) rotate(90deg);
  display: inline-flex;
  pointer-events: none;
`;

const AmountInputRow = styled.div`
  display: inline-flex;
  align-self: center;
  align-items: flex-end;
  gap: 10px;
  width: fit-content;
  margin-inline: auto;
  padding: 10px 32px;
  border-bottom: 2px solid ${colors.action.primary.base};

  &:has(input[aria-invalid="true"]) {
    border-bottom-color: ${colors.semantic.error};
  }
`;

const AmountInput = styled(Input)`
  min-width: 1ch;
  flex: 0 0 auto;
  align-self: flex-end;
  position: relative;
  top: 12px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  padding: 0;
  font-size: 60px;
  line-height: 1;
  appearance: textfield;
  text-align: center;

  &:hover {
    background: transparent;
    border: 0;
    border-color: transparent;
    box-shadow: none;
  }

  &:focus {
    border: 0;
    box-shadow: none;
  }

  &[aria-invalid="true"] {
    border: 0;
    border-bottom-color: transparent;
    box-shadow: none;
  }

  &[aria-invalid="true"]:hover,
  &[aria-invalid="true"]:focus {
    border: 0;
    border-color: transparent;
    box-shadow: none;
  }

  &::placeholder {
    color: ${colors.quaternary};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const EuroIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const QuickAmounts = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
`;

const QuickAmountButton = styled(Button).attrs({ variant: "secondary", size: "lg" })<{ $active: boolean }>`
  width: 100%;
  border: 0;

  &:hover {
    background: ${colors.action.primary.base};
    color: ${colors.inverse};
  }

  ${({ $active }) =>
    $active
      ? css`
          background: ${colors.action.primary.base};
          color: ${colors.inverse};
        `
      : null}
`;

export default StepOne;
