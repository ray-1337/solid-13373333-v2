import '../css/Reset.css';
import '../css/Base.css';

import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

export default function CDEVApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  );
}