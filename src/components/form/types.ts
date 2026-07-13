export type DonationType = "task" | "foundation";

export type PhoneCountryCode = "SK" | "CZ";

export type SubmissionState = "idle" | "submitting" | "success" | "error";

export type ShelterSelection = {
  id: number;
  name: string;
};

export type DonationFormValues = {
  donationType: DonationType;
  shelter: ShelterSelection | null;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: PhoneCountryCode;
  phoneNumber: string;
  consent: boolean;
};

export type StepIndex = 1 | 2 | 3;

export type CountryOption = {
  code: PhoneCountryCode;
  dialCode: string;
  flagSrc: string;
};
