import React from "react";

export default function FoundersSection() {
  return (
    <section className="max-w-6xl mx-auto my-12 px-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display leading-tight font-extrabold text-fire">
          Meet the Founders
        </h2>
        <p className="mt-2 text-real max-w-2xl mx-auto">
          Two leaders. One vision — to create digital experiences that not only
          look exceptional but deliver measurable business results. Here’s a
          glimpse into their philosophies and what fuels their work.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid gap-8 md:grid-cols-2 items-stretch">
        {/* Founder 1 */}
        <article className="shadow-lg scheme-card rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold font-display leading-snug text-fire">
                  CH. Nazim
                </h3>
                <p className="text-sm font-serif leading-relaxed text-real">
                  Founder & Head of Google Ads Strategy
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-medium">
                CN
              </div>
            </div>

            <p className="text-ice leading-relaxed">
              I believe the most powerful campaigns are born from a deep
              understanding of both data and human behavior. My focus is on
              building ad strategies that are agile, data-driven, and designed
              to scale sustainably — without losing sight of the people behind
              the clicks.
            </p>

            <blockquote className="mt-6 pl-4 text-real small-card">
              “Every ad is a conversation. The better you listen, the better you
              speak.”
            </blockquote>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Nazim leads the Google Ads division, crafting strategies that
              maximize ROI through precise targeting, compelling creatives, and
              continuous optimization.
            </p>
          </div>
        </article>

        {/* Founder 2 */}
        <article className="bg-blend-color-burn backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex scheme-card items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-fire font-display leading-snug">
                  Ayaz Ahmad
                </h3>
                <p className="text-sm font-serif leading-relaxed text-real text-real">
                  Founder & Head of Development
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-700 font-medium">
                AA
              </div>
            </div>

            <p className="text-ice leading-relaxed">
              For me, development is more than writing code — it’s about solving
              problems elegantly and building systems thatgray-900 last. Every
              website, app, and integration we create must be fast, secure, and
              ready to adapt to the ever-changing digital landscape.
            </p>

            <blockquote className="mt-6 pl-4 small-card text-real">
              “The best code isn’t the most complex — it’s the code that simply
              works, every time.”
            </blockquote>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Ayaz heads the development team, ensuring every project is
              delivered with precision, scalability, and a focus on performance
              from day one.
            </p>
          </div>
        </article>
      </div>

      {/* Closing Statement */}
      <div className="mt-10 text-center text-sm text-gray-500">
        <p>
          Founded with a commitment to quality, transparency, and results —
          we’re here to help brands grow with strategies and solutions that
          stand the test of time.
        </p>
      </div>
    </section>
  );
}
