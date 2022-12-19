import React from "react";
import "../public/css/styles.css";
import { AppProps } from "next/app";
import { StyleProvider, ThemePicker } from "vcc-ui";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
  );
}
