import { create } from "zustand";
import type { DonationFormValues, StepIndex, SubmissionState } from "@/components/form/types";

type DonationFormStore = {
  step: StepIndex;
  values: DonationFormValues;
  submissionState: SubmissionState;
  submissionMessage: string;
  setStep: (step: StepIndex) => void;
  nextStep: () => void;
  prevStep: () => void;
  setValues: (values: Partial<DonationFormValues>) => void;
  setSubmissionState: (state: SubmissionState, message?: string) => void;
  resetSubmissionState: () => void;
  resetForm: () => void;
};

const defaultValues: DonationFormValues = {
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

export const useDonationFormStore = create<DonationFormStore>((set) => ({
  step: 1,
  values: defaultValues,
  submissionState: "idle",
  submissionMessage: "",
  setStep: (step) => set({ step }),
  nextStep: () =>
    set((state) => ({
      step: state.step < 3 ? ((state.step + 1) as StepIndex) : state.step,
    })),
  prevStep: () =>
    set((state) => ({
      step: state.step > 1 ? ((state.step - 1) as StepIndex) : state.step,
    })),
  setValues: (values) =>
    set((state) => ({
      values: {
        ...state.values,
        ...values,
      },
    })),
  setSubmissionState: (submissionState, submissionMessage = "") => set({ submissionState, submissionMessage }),
  resetSubmissionState: () => set({ submissionState: "idle", submissionMessage: "" }),
  resetForm: () =>
    set({
      step: 1,
      values: defaultValues,
      submissionState: "idle",
      submissionMessage: "",
    }),
}));
