import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const color = "#1c3474";
  const title = "13373333";
  const imageURL = "/og.v2.webp";
  const description = "you are what you eat";
  const siteName = "what should i put here";
  const twitterSite = "@ray__1337";

  return (
    <>
      <Html>
        <Head>
          <meta name="robots" content="index, follow"/>
          <meta name="google" content="notranslate"/>
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
          <NextScript />
        </body>
      </Html>
    </>
  );
};