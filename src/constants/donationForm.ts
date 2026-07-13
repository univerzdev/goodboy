import type { CountryOption } from "@/components/form/types";

export const DONATION_AMOUNTS = [5, 10, 20, 30, 50, 100];

export const COUNTRY_OPTIONS: CountryOption[] = [
  {
    code: "SK",
    dialCode: "+421",
    flagSrc: "/icons/flag-sk.svg",
  },
  {
    code: "CZ",
    dialCode: "+420",
    flagSrc: "/icons/flag-cz.svg",
  },
];
