import { css } from "@emotion/react";

export const globalStyles = css`
  @import-normalize;
  :root {
    --font-family: "Roboto Mono", monospace;
    --font-size: 1.125rem;
    --font-size-small: 0.875em;
    --font-line-height: 1.5;
    --font-color: #050d0a;
    --font-weight: 400;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    background-color: #fafafa;
    margin: 0;
    font-family: var(--font-family);
    font-size: var(--font-size);
    line-height: var(--font-line-height);
    font-weight: var(--font-weight);
    color: var(--font-color);
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body fieldset {
    border: 0px;
    padding: 0px;
    margin: 0px;
  }
`;
