"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { contributeToShelter } from "@/api/shelters/client";
import { COUNTRY_OPTIONS } from "@/constants/donationForm";
import type { DonationFormValues, StepIndex } from "@/components/form/types";
import { t } from "@/lib/i18n";
import { useDonationFormStore } from "@/store/donationFormStore";
import { createDonationFormSchema } from "@/components/form/validation";

const INITIAL_FORM_VALUES: DonationFormValues = {
  donationType: "foundation",
  shelter: null,
  amount: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneCountry: "SK",
  phoneNumber: "",
  consent: false,
};

const STEP_FIELDS: Record<StepIndex, Array<keyof DonationFormValues>> = {
  1: ["donationType", "amount", "shelter"],
  2: ["firstName", "lastName", "email", "phoneCountry", "phoneNumber"],
  3: ["consent"],
};

export const useDonationForm = () => {
  const {
    step,
    values,
    submissionState,
    submissionMessage,
    setValues,
    nextStep,
    prevStep,
    setStep,
    setSubmissionState,
    resetSubmissionState,
    resetForm: resetFormStore,
  } = useDonationFormStore();

  const schema = useMemo(() => createDonationFormSchema(t), []);

  const formMethods = useForm<DonationFormValues, undefined, DonationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: values,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const register: typeof formMethods.register = (name, options) => {
    const registration = formMethods.register(name, options);

    return {
      ...registration,
      onChange: async (event) => {
        registration.onChange(event);

        if (formMethods.getFieldState(name).invalid) {
          await formMethods.trigger(name);
        }
      },
    };
  };

  const form = {
    ...formMethods,
    register,
  };

  const watchedValues = useWatch({ control: formMethods.control });
  const selectedPhoneCountry = useWatch({ control: formMethods.control, name: "phoneCountry" });

  useEffect(() => {
    if (!watchedValues) {
      return;
    }

    setValues(watchedValues as Partial<DonationFormValues>);
  }, [setValues, watchedValues]);

  const selectedCountry = useMemo(
    () => COUNTRY_OPTIONS.find((country) => country.code === selectedPhoneCountry) ?? COUNTRY_OPTIONS[0],
    [selectedPhoneCountry]
  );

  const goToNextStep = async () => {
    resetSubmissionState();
    const fields = STEP_FIELDS[step];
    const isValid = await formMethods.trigger(fields);

    if (!isValid) {
      return;
    }

    nextStep();
  };

  const goToPreviousStep = () => {
    resetSubmissionState();
    prevStep();
  };

  const goToStep = (targetStep: StepIndex) => {
    if (targetStep >= step) {
      return;
    }

    resetSubmissionState();
    setStep(targetStep);
  };

  const submitForm = formMethods.handleSubmit(async () => {
    const isValid = await formMethods.trigger(STEP_FIELDS[3]);
    if (!isValid) {
      return;
    }

    setSubmissionState("submitting");

    try {
      const currentValues = formMethods.getValues();
      const payload = {
        contributors: [
          {
            firstName: currentValues.firstName.trim(),
            lastName: currentValues.lastName.trim(),
            email: currentValues.email.trim(),
            phone: currentValues.phoneNumber.trim(),
          },
        ],
        shelterID: currentValues.shelter?.id ?? 0,
        value: currentValues.amount,
      };

      await contributeToShelter(payload);
      setSubmissionState("success", t("form.status.submitSuccess"));
    } catch {
      setSubmissionState("error", t("form.status.submitError"));
    }
  });

  const resetForm = () => {
    formMethods.reset(INITIAL_FORM_VALUES);
    resetFormStore();
  };

  return {
    form,
    step,
    values,
    submissionState,
    submissionMessage,
    selectedCountry,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitForm,
    resetSubmissionState,
    resetForm,
  };
};
