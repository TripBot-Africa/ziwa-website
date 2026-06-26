const resources = [
  {
    title: "Membership Recruitment Register",
    type: "PDF Form",
    description:
      "Printable national recruitment register for provincial, ward, village, market, farm and mining area membership drives.",
  },
  {
    title: "ZIWA Housing Demolitions Statement",
    type: "Statement",
    description:
      "Official ZIWA position on demolitions, land barons, housing waiting lists and affected informal workers.",
  },
  {
    title: "Artisanal Mining Policy Brief",
    type: "Policy Brief",
    description:
      "ZIWA proposal for documenting, registering and formalising artisanal miners into regulated economic participation.",
  },
  {
    title: "Fair Markets for Farmers Policy Brief",
    type: "Policy Brief",
    description:
      "A policy proposal on direct market access, demand forecasting and fair prices for farmers.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-400">
            ZIWA Resources
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Resource Library
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-200">
            Download ZIWA forms, statements, policy briefs, recruitment
            material and public documents.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-black uppercase text-green-700">
                {item.type}
              </p>

              <h2 className="mt-4 text-2xl font-black text-zinc-950">
                {item.title}
              </h2>

              <p className="mt-5 leading-8 text-zinc-700">
                {item.description}
              </p>

              <a
                href="#"
                className="mt-6 inline-block rounded-lg bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900"
              >
                Download / View
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}