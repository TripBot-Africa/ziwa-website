const volunteerAreas = [
  "Membership Recruitment",
  "Community Mobilisation",
  "Research & Policy",
  "Media & Communications",
  "Legal Support",
  "ICT & Digital Support",
  "Training & Workshops",
  "Provincial Coordination",
];

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-green-800 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-200">
            Volunteer With ZIWA
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Help Build The Movement
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8">
            ZIWA welcomes volunteers who want to support informal workers,
            strengthen communities and contribute to national economic
            transformation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {volunteerAreas.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="text-lg font-black text-green-800">{area}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-zinc-50 p-8">
          <h2 className="text-2xl font-black text-green-800">
            Volunteer Interest Form
          </h2>

          <form className="mt-8 grid gap-5 md:grid-cols-2">
            <input className="rounded-lg border p-4" placeholder="Full Name" />
            <input className="rounded-lg border p-4" placeholder="Phone / WhatsApp" />
            <input className="rounded-lg border p-4" placeholder="Province" />
            <select className="rounded-lg border p-4">
              <option>Select Volunteer Area</option>
              {volunteerAreas.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>

            <textarea
              className="col-span-full min-h-[140px] rounded-lg border p-4"
              placeholder="Tell us how you would like to assist ZIWA"
            />

            <button
              type="button"
              className="col-span-full rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900"
            >
              SUBMIT VOLUNTEER INTEREST
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}