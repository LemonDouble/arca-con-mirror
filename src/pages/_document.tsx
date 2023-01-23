import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {

    const GA_MEASUREMENT_ID = "G-FGMMR0W69K"

  return (
    <Html lang="ko">
        <Head>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
