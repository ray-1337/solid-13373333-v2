import '../css/Reset.css';
import '../css/Base.css';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

export default function CDEVApp({ Component, pageProps }: AppProps) {
  const websiteTitle = "second hand embarrassment";

  return (
    <>
      <Head>
        { process.env.NODE_ENV === "development" && (<link rel="preload stylesheet" href={"/preview.css"} as={"style"}></link>) }

        <title>{websiteTitle}</title>

        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0" />
      </Head>
      
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}