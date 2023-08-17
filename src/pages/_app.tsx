import '../css/Reset.css';
import '../css/Base.css';

import { AppProps } from 'next/app';

export default function CDEVApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}