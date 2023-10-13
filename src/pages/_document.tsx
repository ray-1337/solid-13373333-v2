import Document, { Html, Head, Main, NextScript, type DocumentContext, type DocumentInitialProps } from 'next/document';
import Script from "next/script";

type WebDocumentProps = DocumentInitialProps & { nonce: string };

const WebDocument = (props: WebDocumentProps) => {
  const color = "#1c3474";
  const title = "13373333";
  const imageURL = "/og.v2.webp";
  const description = "you are what you eat";
  const siteName = "what should i put here";
  const twitterSite = "@ray__1337";

  return (
    <Html>
      <Head nonce={props.nonce}>
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="theme-color" content={color} />
        <meta name="og:title" content={title} />
        <meta name="og:url" content={"/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"/"} />
        <meta name="og:image:url" content={imageURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageURL} />
        <meta name="twitter:site" content={twitterSite} />
        <meta property="og:site_name" content={siteName} />
        <meta name="og:description" content={description} />
      </Head>
      <body>
        <Main />

        <NextScript nonce={props.nonce}/>

        <Script nonce={props.nonce} src="https://static.cloudflareinsights.com/beacon.min.js" defer={true} data-cf-beacon='{"token": "a50eee92fa594c1291d10ef3b1b7766b"}'/>
      </body>
    </Html>
  );
};

WebDocument.getInitialProps = async (ctx: DocumentContext): Promise<WebDocumentProps> => {
  const initialProps = await Document.getInitialProps(ctx);

  const nonce = ctx.req?.headers?.['x-nonce'] as string;

  return {
    ...initialProps,
    nonce,
  };
};

export default WebDocument;