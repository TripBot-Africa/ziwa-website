const sectors = [
  "Subsistence Farmer",
  "Street Vendor",
  "Cross-Border Trader",
  "Transporter",
  "Artisanal Miner",
  "Artisanal Worker",
  "Market Trader",
  "Domestic Worker",
  "Self-Employed Worker",
  "Other",
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            Membership
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Join ZIWA
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8">
            Become part of Zimbabwe's growing movement for informal workers,
            farmers, traders, transporters, artisans and miners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-black text-green-800">
            Membership Application
          </h2>

          <form className="mt-8 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-lg border p-4"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-lg border p-4"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-lg border p-4"
            />

            <input
              type="text"
              placeholder="Province"
              className="rounded-lg border p-4"
            />

            <input
              type="text"
              placeholder="District"
              className="rounded-lg border p-4"
            />

            <select className="rounded-lg border p-4">
              <option>Select Sector</option>

              {sectors.map((sector) => (
                <option key={sector}>{sector}</option>
              ))}
            </select>

            <textarea
              placeholder="Tell us about yourself"
              className="col-span-full min-h-[140px] rounded-lg border p-4"
            />

            <button
              type="submit"
              className="col-span-full rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900"
            >
              SUBMIT APPLICATION
            </button>
          </form>
        </div>

        <div className="mt-10 rounded-3xl bg-black p-8 text-white">
          <h2 className="text-2xl font-black">
            Why Join ZIWA?
          </h2>

          <ul className="mt-6 space-y-3">
            <li>✓ Representation and advocacy</li>
            <li>✓ Policy participation</li>
            <li>✓ National campaigns</li>
            <li>✓ Economic empowerment initiatives</li>
            <li>✓ Training and capacity building</li>
            <li>✓ Networking opportunities</li>
          </ul>
        </div>
      </section>
    </main>
  );
}