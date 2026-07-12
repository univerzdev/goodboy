"use client";

import { createGlobalStyle } from "styled-components";
import { colors } from "@/styles/colors";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${colors.background};
    color: ${colors.primary};
    font-family: var(--font-inter), sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0;
  }
`;

export default GlobalStyles;
