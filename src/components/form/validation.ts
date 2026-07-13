import { z } from "zod";
import type { TranslationKey } from "@/lib/i18n";

type Translate = (key: TranslationKey) => string;

const phoneNumberPattern = /^(?:\d\s*){9}$/;

export const createDonationFormSchema = (translate: Translate) =>
  z
    .object({
      donationType: z.enum(["task", "foundation"]),
      shelter: z
        .object({
          id: z.number().int().positive(),
          name: z.string().trim().min(1),
        })
        .nullable(),
      amount: z.number().min(1, translate("form.validation.amountMin")),
      firstName: z
        .string()
        .trim()
        .max(20, translate("form.validation.firstNameMax"))
        .refine((value) => value.length === 0 || value.length >= 2, translate("form.validation.firstNameMin")),
      lastName: z
        .string()
        .trim()
        .min(2, translate("form.validation.lastNameMin"))
        .max(30, translate("form.validation.lastNameMax")),
      email: z.string().trim().email(translate("form.validation.emailInvalid")),
      phoneCountry: z.enum(["SK", "CZ"]),
      phoneNumber: z.string().trim().regex(phoneNumberPattern, translate("form.validation.phoneInvalid")),
      consent: z.boolean().refine((value) => value, translate("form.validation.consentRequired")),
    })
    // In case of donationType being "task", the shelter field must be selected
    .superRefine((values, context) => {
      if (values.donationType === "task" && !values.shelter) {
        context.addIssue({
          code: "custom",
          path: ["shelter"],
          message: translate("form.validation.shelterRequired"),
        });
      }
    });

export type DonationFormSchema = z.infer<ReturnType<typeof createDonationFormSchema>>;
