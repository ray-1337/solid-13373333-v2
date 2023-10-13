import '../css/Reset.css';
import '../css/Base.css';

import Head from 'next/head';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { MantineProvider } from '@mantine/core';
import { useEffect, useRef, createContext } from 'react';

export const NonceContext = createContext<string | undefined>(undefined);

type AppExtendedProps = { nonce?: string };

type AppPostProps = AppExtendedProps & AppProps;

const WebsiteApp = ({ Component, pageProps, nonce }: AppPostProps) => {
  const websiteTitle = "second hand embarrassment";

  const nonceRef = useRef(nonce);

  useEffect(() => {
    if (nonce) {
      nonceRef.current = nonce;
    }
  }, [nonce]);

  return (
    <NonceContext.Provider value={nonceRef.current}>
      <Head>
        { process.env.NODE_ENV === "development" && (<link rel="preload stylesheet" href={"/preview.css"} as={"style"} nonce={nonceRef.current}></link>) }


        <title>{websiteTitle}</title>

        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0" />
      </Head>
      
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </NonceContext.Provider>
  );
};

WebsiteApp.getInitialProps = async (Context: AppContext): Promise<AppInitialProps & AppExtendedProps> => {
  const props = await App.getInitialProps(Context);
  const { ctx } = Context;
  const nonce = ctx.req?.headers?.['x-nonce'] as string | undefined;

  return { ...props, nonce };
};

export default WebsiteApp;