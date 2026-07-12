import { css } from "styled-components";

export const typography = {
  heading: {
    // 60px / 72px / -0.3px
    xl: css`
      font-weight: 400;
      font-size: 3.75rem;
      line-height: 4.5rem;
      letter-spacing: -0.005em;
    `,

    // 48px / 56px / -0.3px
    lg: css`
      font-weight: 700;
      font-size: 3rem;
      line-height: 3.5rem;
      letter-spacing: -0.00625em;
    `,
  },

  text: {
    sm: {
      // 14px / 20px / 0px
      medium: css`
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.25rem;
        letter-spacing: 0;
      `,
    },

    md: {
      // 16px / 24px / 0px
      medium: css`
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: 0;
      `,

      // 16px / 24px / 0px
      semibold: css`
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: 0;
      `,

      // 16px / 24px / 0px
      regular: css`
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5rem;
        letter-spacing: 0;
      `,
    },
  },
} as const;
