import { NextRequest, NextResponse } from 'next/server';
import { cdnURL } from "../config";

export const config = {
  matcher: '/:path*',
}
 
export function middleware(request: NextRequest) {
  const nonce = `nonce-${crypto.randomUUID()}`;

  const scriptCSP = ['script-src', "'self'", nonce, cdnURL];

  const styleCSP = ['style-src', "'self'", "https://fonts.googleapis.com/css2", nonce, cdnURL];

  if (process.env.NODE_ENV === "development") {
    scriptCSP.push("'unsafe-eval'");

    styleCSP.push("'unsafe-inline'");
  };

  const csp = [
    ['default-src', "'self'", nonce, cdnURL],
    scriptCSP, styleCSP,
    ['connect-src', "'self'", nonce],
    ['img-src', "'self'", nonce, cdnURL],
    ['base-uri',  "'self'", nonce],
    ['form-action', "'self'", nonce],
    ['font-src', "'self'", "https://fonts.gstatic.com/s/", nonce, cdnURL],
    ['object-src', "'none'"],
    ['frame-ancestors', "'none'"],
    ['block-all-mixed-content'],
    ['upgrade-insecure-requests']
  ];

  const finalCSP = csp.reduce((prev, [directive, ...policy]) => {
    return `${prev}${directive} ${policy.filter(Boolean).join(' ')};`
  }, '');
 
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', finalCSP);
 
  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
};