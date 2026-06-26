const leadership = [
  {
    title: "National Executive Council",
    description:
      "Provides strategic leadership, policy direction and national coordination of the Association.",
  },
  {
    title: "Provincial Executive Committees",
    description:
      "Coordinate ZIWA programmes and membership across Zimbabwe's provinces.",
  },
  {
    title: "District Coordinators",
    description:
      "Lead recruitment, member engagement and local campaigns within districts.",
  },
  {
    title: "Ward Representatives",
    description:
      "Represent members at ward level and coordinate community activities.",
  },
  {
    title: "Sector Committees",
    description:
      "Represent the interests of farmers, vendors, transporters, miners, traders and other sectors.",
  },
  {
    title: "Youth & Women's Committees",
    description:
      "Promote youth participation, women's empowerment and inclusive leadership.",
  },
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            Leadership
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            National Leadership Structure
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8">
            ZIWA is committed to transparent, democratic and accountable
            leadership from the national level to local communities.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {leadership.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-black text-green-800">
                {item.title}
              </h2>

              <p className="mt-4 leading-8 text-zinc-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-zinc-100 p-8">
          <h2 className="text-2xl font-black text-green-800">
            Leadership Appointments
          </h2>

          <p className="mt-5 leading-8 text-zinc-700">
            National, Provincial, District and Ward leadership appointments
            will be published on this page as they are confirmed in accordance
            with the Constitution of the Zimbabwe Informal Workers Association
            (ZIWA).
          </p>
        </div>
      </section>
    </main>
  );
}