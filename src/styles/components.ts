import { colors } from "@/styles/colors";

export type ControlSize = "sm" | "md" | "lg" | "xl";

export type ButtonVariant = "primary" | "secondary" | "destructive";

type Spacing = {
  py: string;
  px: string;
  gap: string;
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
  xl: { py: "16px", px: "32px", gap: "8px" },
  lg: { py: "14px", px: "24px", gap: "8px" },
  md: { py: "6px", px: "12px", gap: "4px" },
  sm: { py: "4px", px: "8px", gap: "4px" },
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
