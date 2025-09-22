import Script from "next/script";

export const AdSenseScript = () => {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1241486495309147"
        crossOrigin="anonymous"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-1241486495309147",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  );
};
