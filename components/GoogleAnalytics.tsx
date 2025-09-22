import Script from "next/script";
export function GoogleAnalytics() {
  return (
    <>
      <Script
        async src="https://www.googletagmanager.com/gtag/js?id=G-LMSZERLKC8"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
          gtag('config', 'G-LMSZERLKC8');
          `,
        }}
      />
    </>
  );
}
