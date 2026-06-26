const events = [
  {
    title: "National Membership Recruitment Drive",
    date: "Coming Soon",
    location: "All Provinces",
    description:
      "ZIWA will announce recruitment activities across provinces, districts, markets, farms, transport ranks and communities.",
  },
  {
    title: "Housing & Livelihoods Policy Dialogue",
    date: "Coming Soon",
    location: "Online / Hybrid",
    description:
      "A policy engagement on housing demolitions, land allocation, informal workers and urban development.",
  },
  {
    title: "Fair Markets for Farmers Campaign Launch",
    date: "Coming Soon",
    location: "To Be Announced",
    description:
      "A national campaign focused on fair market access, direct supply systems and better prices for farmers.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            ZIWA Events
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Events & Activities
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8">
            Follow upcoming ZIWA meetings, campaigns, recruitment drives,
            policy dialogues and community activities.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-black uppercase text-green-700">
                {event.date}
              </p>

              <h2 className="mt-4 text-2xl font-black">{event.title}</h2>

              <p className="mt-3 font-bold text-red-700">{event.location}</p>

              <p className="mt-5 leading-8 text-zinc-700">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}