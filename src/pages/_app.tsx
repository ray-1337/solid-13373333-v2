import '../css/Reset.css';
import '@mantine/core/styles.css';
import '../css/Base.css';

import Head from 'next/head';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { MantineProvider } from '@mantine/core';
import { useEffect, useState, createContext } from 'react';

export const NonceContext = createContext<string | undefined>(undefined);

type AppExtendedProps = { nonce?: string };

type AppPostProps = AppExtendedProps & AppProps;

const WebsiteApp = ({ Component, pageProps, nonce }: AppPostProps) => {
  const websiteTitle = "greatest \"web developer\" that's ever lived.";

  const [nonceState, setNonceState] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (nonce) setNonceState(nonce);
  }, [nonce]);

  return (
    <NonceContext.Provider value={nonceState}>
      <Head>
        { process.env.NODE_ENV === "development" && (<link rel="preload stylesheet" href={"/preview.css"} as={"style"} nonce={nonceState}></link>) }

        <link rel={"preload stylesheet"} as={"style"} nonce={nonceState} href={"https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"}/>

        <title>{websiteTitle}</title>

        <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, shrink-to-fit=no, initial-scale=1.0" />
      </Head>
      
      <MantineProvider getStyleNonce={() => nonceState as string}>
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