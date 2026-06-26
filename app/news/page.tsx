const news = [
  {
    category: "PRESS RELEASE",
    title: "ZIWA Calls for Fair Housing Policies",
    date: "June 2026",
    summary:
      "ZIWA calls for orderly urban development, protection of livelihoods, accountability for illegal land sales, and practical solutions for affected communities.",
  },
  {
    category: "CAMPAIGN",
    title: "National Membership Recruitment Begins",
    date: "Coming Soon",
    summary:
      "ZIWA is launching a nationwide membership recruitment programme across all provinces of Zimbabwe.",
  },
  {
    category: "POLICY",
    title: "Formalisation of Artisanal Mining",
    date: "June 2026",
    summary:
      "ZIWA proposes documentation, regulation and support for artisanal miners as part of sustainable economic development.",
  },
  {
    category: "AGRICULTURE",
    title: "Fair Markets for Subsistence Farmers",
    date: "June 2026",
    summary:
      "ZIWA advocates for direct market access, demand forecasting and fair producer prices for Zimbabwean farmers.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-400">
            ZIWA Newsroom
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Latest News & Announcements
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-200">
            Stay informed with official ZIWA news, policy announcements,
            campaigns, press releases and organisational updates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {news.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-black text-green-800">
                  {item.category}
                </span>

                <span className="text-sm font-bold text-zinc-500">
                  {item.date}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black">
                {item.title}
              </h2>

              <p className="mt-5 leading-8 text-zinc-700">
                {item.summary}
              </p>

              <button className="mt-8 rounded-lg bg-green-800 px-6 py-3 font-black text-white transition hover:bg-green-900">
                Read Full Article
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}