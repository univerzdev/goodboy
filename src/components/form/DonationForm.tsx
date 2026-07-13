"use client";

import Image from "next/image";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import styled, { css, keyframes } from "styled-components";
import { useDonationForm } from "@/hooks/useDonationForm";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import StepOne from "@/components/form/steps/StepOne";
import StepTwo from "@/components/form/steps/StepTwo";
import StepThree from "@/components/form/steps/StepThree";
import { DonationFormValues, StepIndex } from "@/components/form/types";
import { t } from "@/lib/i18n";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/form/ProgressBar";
import Footer from "@/components/ui/footer/Footer";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { UseFormReturn } from "react-hook-form";

type StepComponentProps = {
  form: UseFormReturn<DonationFormValues, undefined, DonationFormValues>;
  dialCode: string;
};

const DONATION_FORM_ID = "donation-form";

const STEP_COMPONENTS: Record<StepIndex, ({ form, dialCode }: StepComponentProps) => ReactElement> = {
  1: ({ form }) => <StepOne form={form} />,
  2: ({ form }) => <StepTwo form={form} />,
  3: ({ form, dialCode }) => <StepThree form={form} dialCode={dialCode} />,
};

const STEP_LABELS = [t("form.stepLabels.one"), t("form.stepLabels.two"), t("form.stepLabels.three")];
const SUCCESS_MESSAGE_DELAY_MS = 1200;

const DonationForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const scrollToTop = useScrollToTop();
  const {
    form,
    step,
    submissionState,
    submissionMessage,
    selectedCountry,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitForm,
    resetForm,
  } = useDonationForm();

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop, step]);

  useEffect(() => {
    if (submissionState !== "success") {
      return;
    }

    let postRedirectResetTimeout: number | undefined;

    const pauseTimeout = window.setTimeout(() => {
      queryClient.removeQueries({ queryKey: ["shelter-results"] });
      router.push("/o-projekte");

      postRedirectResetTimeout = window.setTimeout(() => {
        resetForm();
      }, 0);
    }, SUCCESS_MESSAGE_DELAY_MS);

    return () => {
      window.clearTimeout(pauseTimeout);

      if (postRedirectResetTimeout !== undefined) {
        window.clearTimeout(postRedirectResetTimeout);
      }
    };
  }, [queryClient, router, submissionState, resetForm]);

  const ActiveStepComponent = STEP_COMPONENTS[step];

  return (
    <FormStack>
      <TopProgressBar
        steps={STEP_LABELS}
        currentStep={step}
        ariaLabel={t("form.progressAria")}
        onStepClick={(targetStep) => goToStep(targetStep as StepIndex)}
      />

      <FormElement id={DONATION_FORM_ID} noValidate>
        <StepTransition key={step}>
          <ActiveStepComponent form={form} dialCode={selectedCountry.dialCode} />
        </StepTransition>

        {submissionState === "error" || submissionState === "success" ? (
          <Notice $state={submissionState}>{submissionMessage}</Notice>
        ) : null}
      </FormElement>

      <BottomBlock>
        <Actions>
          <Button type="button" variant="secondary" onClick={goToPreviousStep} disabled={step === 1}>
            <ButtonArrow aria-hidden="true">
              <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
            </ButtonArrow>
            {t("form.buttons.back")}
          </Button>

          {step < 3 ? (
            <Button type="button" onClick={goToNextStep}>
              {t("form.buttons.next")}
              <ButtonArrow aria-hidden="true">
                <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} />
              </ButtonArrow>
            </Button>
          ) : (
            <Button type="button" onClick={submitForm} loading={submissionState === "submitting"}>
              {t("form.buttons.submit")}
            </Button>
          )}
        </Actions>

        <FooterDivider>
          <Footer showSocials={step === 1} />
        </FooterDivider>
      </BottomBlock>
    </FormStack>
  );
};

const stepEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  min-height: 964px;
`;

const TopProgressBar = styled(ProgressBar)`
  margin-bottom: 40px;
`;

const FormElement = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
`;

const StepTransition = styled.div`
  animation: ${stepEnter} 320ms ease;
`;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FooterDivider = styled.div`
  border-top: 1px solid ${colors.quintarny};
  padding-top: 24px;
`;

const Notice = styled.div<{ $state: "success" | "error" }>`
  border-radius: 8px;
  padding: 16px;
  ${typography.text.sm.medium}

  ${({ $state }) =>
    $state === "success"
      ? css`
          background: ${colors.semantic.success};
          color: ${colors.inverse};
        `
      : css`
          background: ${colors.semantic.error};
          color: ${colors.inverse};
        `}
`;

const Actions = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ButtonArrow = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`;

export default DonationForm;
