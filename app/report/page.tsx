const issueTypes = [
  "Illegal Land Sales",
  "Market Harassment",
  "Demolitions / Evictions",
  "Worker Exploitation",
  "Corruption",
  "Transport Challenges",
  "Mining Challenges",
  "Cross-Border Trade Challenges",
  "Other",
];

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-red-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-red-100">
            Report an Issue
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Tell ZIWA What Is Happening
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8">
            Use this page to report issues affecting informal workers,
            communities, livelihoods and public policy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
          <h2 className="text-2xl font-black text-green-800">
            Issue Report Form
          </h2>

          <form className="mt-8 grid gap-5">
            <input className="rounded-lg border p-4" placeholder="Full Name" />
            <input className="rounded-lg border p-4" placeholder="Phone / WhatsApp" />
            <input className="rounded-lg border p-4" placeholder="Province" />
            <input className="rounded-lg border p-4" placeholder="District / Area" />

            <select className="rounded-lg border p-4">
              <option>Select Issue Type</option>
              {issueTypes.map((issue) => (
                <option key={issue}>{issue}</option>
              ))}
            </select>

            <textarea
              className="min-h-[160px] rounded-lg border p-4"
              placeholder="Describe the issue"
            />

            <button
              type="button"
              className="rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900"
            >
              SUBMIT ISSUE REPORT
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}