export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            About ZIWA
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Zimbabwe Informal Workers Association
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8">
            ZIWA is a national workers association representing Zimbabwe&apos;s
            informal and subsistence economy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 p-7 shadow-sm">
            <h2 className="text-2xl font-black text-green-800">Our Vision</h2>
            <p className="mt-4 leading-7 text-zinc-700">
              A Zimbabwe where every informal worker has dignity, fair access
              to markets, lawful economic participation and protection from
              exploitation.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-7 shadow-sm">
            <h2 className="text-2xl font-black text-green-800">Our Mission</h2>
            <p className="mt-4 leading-7 text-zinc-700">
              To unite, empower and advocate for informal workers through
              representation, policy influence, capacity building and economic
              formalisation.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-7 shadow-sm">
            <h2 className="text-2xl font-black text-green-800">Our Values</h2>
            <p className="mt-4 leading-7 text-zinc-700">
              Unity, fairness, accountability, dignity, inclusion, development
              and national economic transformation.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-zinc-50 p-8">
          <h2 className="text-3xl font-black text-green-800">
            Who We Represent
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-zinc-700">
            ZIWA represents subsistence farmers, street vendors, cross-border
            traders, transporters, artisanal miners, artisanal workers, market
            traders, domestic workers, self-employed workers and informal
            workers across all sectors of Zimbabwe&apos;s economy.
          </p>
        </div>
      </section>
    </main>
  );
}