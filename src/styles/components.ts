import { colors } from "@/styles/colors";

export type ControlSize = "sm" | "md" | "lg" | "xl";

export type ButtonVariant = "primary" | "secondary" | "destructive";

type Spacing = {
  py: string;
  px: string;
  gap: string;
};

type InputSpacing = {
  py: string;
  px: string;
};

type ButtonColors = {
  base: string;
  hover: string;
  active: string;
  loading: string;
  disabled: string;
  text: string;
  border: string;
};

export const buttonSizes: Record<ControlSize, Spacing> = {
  // xl: 16px 32px, gap 8px
  xl: { py: "1rem", px: "2rem", gap: "0.5rem" },
  // lg: 14px 24px, gap 8px
  lg: { py: "0.875rem", px: "1.5rem", gap: "0.5rem" },
  // md: 6px 12px, gap 4px
  md: { py: "0.375rem", px: "0.75rem", gap: "0.25rem" },
  // sm: 4px 8px, gap 4px
  sm: { py: "0.25rem", px: "0.5rem", gap: "0.25rem" },
};

export const inputSizes: Record<ControlSize, InputSpacing> = {
  // xl: 18px 16px
  xl: { py: "1.125rem", px: "1rem" },
  // lg: 14px 16px
  lg: { py: "0.875rem", px: "1rem" },
  // md: 8px 12px
  md: { py: "0.5rem", px: "0.75rem" },
  // sm: 4px 6px
  sm: { py: "0.25rem", px: "0.375rem" },
};

export const buttonVariants: Record<ButtonVariant, ButtonColors> = {
  primary: {
    base: colors.action.primary.base,
    hover: colors.action.primary.hover,
    active: colors.action.primary.active,
    loading: colors.action.primary.loading,
    disabled: colors.action.primary.disabled,
    text: colors.inverse,
    border: colors.action.primary.base,
  },
  secondary: {
    base: colors.action.secondary.base,
    hover: colors.action.secondary.hover,
    active: colors.action.secondary.active,
    loading: colors.action.secondary.loading,
    disabled: colors.action.secondary.disabled,
    text: colors.primary,
    border: colors.action.secondary.active,
  },
  destructive: {
    base: colors.action.destructive.base,
    hover: colors.action.destructive.hover,
    active: colors.action.destructive.active,
    loading: colors.action.destructive.loading,
    disabled: colors.action.destructive.disabled,
    text: colors.inverse,
    border: colors.action.destructive.base,
  },
};
