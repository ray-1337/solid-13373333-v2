import type { AppProps } from 'next/app';
import '@/css/Reset.css';
import '@/css/Base.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<> <Component {...pageProps} /> </>);
}