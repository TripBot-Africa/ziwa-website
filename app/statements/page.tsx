const statements = [
  {
    category: "Statement",
    title: "ZIWA Statement on Housing Demolitions",
    date: "June 2026",
    summary:
      "ZIWA calls for justice, accountability and humane alternatives in response to national housing demolitions.",
  },
  {
    category: "Policy",
    title: "Fair Market Access for Subsistence Farmers",
    date: "June 2026",
    summary:
      "A modern agricultural market system connecting farmers directly to retailers, markets and national demand forecasts.",
  },
  {
    category: "Policy",
    title: "Formalisation of Artisanal Mining",
    date: "June 2026",
    summary:
      "ZIWA proposes documentation, regulated claims, cooperatives and taxation pathways for artisanal miners.",
  },
];

export default function StatementsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-400">
            Official Publications
          </p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Statements & Campaigns
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">
            Read ZIWA&apos;s official statements, policy positions, campaigns
            and national submissions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {statements.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-black uppercase text-green-700">
                {item.category}
              </p>
              <h2 className="mt-4 text-xl font-black leading-7">
                {item.title}
              </h2>
              <p className="mt-3 text-sm font-semibold text-zinc-500">
                {item.date}
              </p>
              <p className="mt-5 leading-7 text-zinc-700">{item.summary}</p>
              <a
                href="#"
                className="mt-6 inline-block font-black text-green-800"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}