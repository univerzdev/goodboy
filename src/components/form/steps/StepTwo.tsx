"use client";

import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useFormState } from "react-hook-form";
import { useWatch } from "react-hook-form";
import styled from "styled-components";
import { COUNTRY_OPTIONS } from "@/constants/donationForm";
import FormField from "@/components/form/FormField";
import type { DonationFormValues } from "@/components/form/types";
import { t } from "@/lib/i18n";
import Input from "@/components/ui/Input";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { formatPhoneNumber } from "@/utils/helpers";

type StepTwoProps = {
  form: UseFormReturn<DonationFormValues, undefined, DonationFormValues>;
};

const FIELD_IDS = {
  FIRST_NAME: "donation-first-name",
  FIRST_NAME_ERROR: "donation-first-name-error",
  LAST_NAME: "donation-last-name",
  LAST_NAME_ERROR: "donation-last-name-error",
  EMAIL: "donation-email",
  EMAIL_ERROR: "donation-email-error",
  PHONE_COUNTRY: "donation-phone-country",
  PHONE: "donation-phone-number",
  PHONE_ERROR: "donation-phone-number-error",
} as const;

const StepTwo = ({ form }: StepTwoProps) => {
  const { errors } = useFormState({ control: form.control });
  const selectedPhoneCountry = useWatch({ control: form.control, name: "phoneCountry" });
  const selectedCountry =
    COUNTRY_OPTIONS.find((country) => country.code === selectedPhoneCountry) ?? COUNTRY_OPTIONS[0];
  const selectedCountryLabel = t(`form.stepTwo.countries.${selectedCountry.code}`);

  return (
    <StepRoot>
      <Headline>{t("form.stepTwo.title")}</Headline>
      <StepContent>
        <SectionTitle>{t("form.stepTwo.sectionTitle")}</SectionTitle>

        <Grid>
          <FormField
            label={t("form.stepTwo.firstNameLabel")}
            fieldId={FIELD_IDS.FIRST_NAME}
            errorId={FIELD_IDS.FIRST_NAME_ERROR}
            optionalText={` ${t("form.stepOne.optional")}`}
            error={errors.firstName?.message}
          >
            <Input
              id={FIELD_IDS.FIRST_NAME}
              placeholder={t("form.stepTwo.firstNamePlaceholder")}
              aria-describedby={FIELD_IDS.FIRST_NAME_ERROR}
              aria-invalid={Boolean(errors.firstName)}
              {...form.register("firstName")}
            />
          </FormField>

          <FormField
            label={t("form.stepTwo.lastNameLabel")}
            fieldId={FIELD_IDS.LAST_NAME}
            errorId={FIELD_IDS.LAST_NAME_ERROR}
            required
            error={errors.lastName?.message}
          >
            <Input
              id={FIELD_IDS.LAST_NAME}
              placeholder={t("form.stepTwo.lastNamePlaceholder")}
              aria-describedby={FIELD_IDS.LAST_NAME_ERROR}
              aria-invalid={Boolean(errors.lastName)}
              {...form.register("lastName")}
            />
          </FormField>
        </Grid>

        <FormField
          label={t("form.stepTwo.emailLabel")}
          fieldId={FIELD_IDS.EMAIL}
          errorId={FIELD_IDS.EMAIL_ERROR}
          required
          error={errors.email?.message}
        >
          <Input
            id={FIELD_IDS.EMAIL}
            placeholder={t("form.stepTwo.emailPlaceholder")}
            aria-describedby={FIELD_IDS.EMAIL_ERROR}
            aria-invalid={Boolean(errors.email)}
            {...form.register("email")}
          />
        </FormField>

        <FormField
          label={t("form.stepTwo.phoneLabel")}
          fieldId={FIELD_IDS.PHONE}
          errorId={FIELD_IDS.PHONE_ERROR}
          required
          error={errors.phoneNumber?.message}
        >
          <PhoneRow>
            <CountrySelect>
              <FlagWrap>
                <Image src={selectedCountry.flagSrc} alt={selectedCountryLabel} width={20} height={14} />
              </FlagWrap>
              <SelectChevron aria-hidden="true">
                <Image src="/icons/chevron.svg" alt="" width={16} height={16} />
              </SelectChevron>

              <Controller
                control={form.control}
                name="phoneCountry"
                render={({ field }) => (
                  <CountryDropdown
                    id={FIELD_IDS.PHONE_COUNTRY}
                    name={field.name}
                    value={field.value}
                    ref={field.ref}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                    onBlur={field.onBlur}
                    aria-label={t("form.stepTwo.countryAria")}
                    aria-invalid={Boolean(errors.phoneCountry)}
                  >
                    {COUNTRY_OPTIONS.map((country) => (
                      <option
                        key={country.code}
                        value={country.code}
                        aria-label={t(`form.stepTwo.countries.${country.code}`)}
                      >
                        {t(`form.stepTwo.countries.${country.code}`)}
                      </option>
                    ))}
                  </CountryDropdown>
                )}
              />
            </CountrySelect>

            <PhoneInputWrap>
              <DialCode>{selectedCountry.dialCode}</DialCode>
              <PhoneInput
                id={FIELD_IDS.PHONE}
                placeholder={t("form.stepTwo.phonePlaceholder")}
                inputMode="numeric"
                aria-describedby={FIELD_IDS.PHONE_ERROR}
                aria-invalid={Boolean(errors.phoneNumber)}
                {...form.register("phoneNumber", {
                  onChange: (event) => {
                    event.target.value = formatPhoneNumber(event.target.value);
                  },
                })}
              />
            </PhoneInputWrap>
          </PhoneRow>
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
  ${typography.heading.lg}
`;

const SectionTitle = styled.h2`
  margin: 0;
  ${typography.text.md.semibold}
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

const PhoneRow = styled.div`
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 16px;
`;

const CountrySelect = styled.div`
  position: relative;
`;

const FlagWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 999px;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`;

const CountryDropdown = styled.select`
  width: 100%;
  height: 56px;
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  padding: 16px 18px;
  ${typography.text.md.regular}
  font-family: var(--font-inter), sans-serif;
  font-style: normal;
  letter-spacing: 0;
  vertical-align: middle;
  background: ${colors.secondary};
  color: transparent;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  text-shadow: 0 0 0 transparent;

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
  left: 46px;
  transform: translateY(-50%) rotate(90deg);
  display: inline-flex;
  pointer-events: none;
`;

const PhoneInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  background: ${colors.secondary};
  padding-left: 12px;

  &:hover {
    background: ${colors.action.secondary.hover};
    border-color: ${colors.action.secondary.hover};
  }

  &:focus-within {
    border: 1px solid ${colors.action.primary.active};
    box-shadow: 0 0 0 2px #3730a33d;
  }

  &:has(input[aria-invalid="true"]) {
    border: 1px solid ${colors.semantic.error};
    box-shadow: none;
  }

  &:has(input[aria-invalid="true"]):focus-within {
    border: 1px solid ${colors.semantic.error};
    box-shadow: 0 0 0 2px #f43f5e3d;
  }
`;

const DialCode = styled.span`
  ${typography.text.md.regular}
  color: ${colors.tertiary};
`;

const PhoneInput = styled(Input)`
  border: 0;
  box-shadow: none;
  background: transparent;
  padding-left: 0;

  &:hover {
    background: transparent;
    border-color: transparent;
  }

  &:focus {
    box-shadow: none;
    border-color: transparent;
  }

  &[aria-invalid="true"] {
    border: 0;
    box-shadow: none;
  }

  &[aria-invalid="true"]:focus {
    border: 0;
    box-shadow: none;
  }
`;

export default StepTwo;
