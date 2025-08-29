import Script from "next/script";

export const AdSenseScript = () => {
  return (
    <section>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1241486495309147"
        crossOrigin="anonymous"
      ></script>

      <div>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1241486495309147"
          data-ad-slot="1234567890"
          data-ad-format="auto"
        ></ins>
      </div>
    </section>
  );
};
