export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-400">
            Contact ZIWA
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Talk To Us
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">
            Contact ZIWA for membership, policy submissions, media enquiries,
            campaigns, worker issues and general communication.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-2xl bg-green-800 p-7 text-white">
          <h2 className="text-2xl font-black">General Enquiries</h2>
          <p className="mt-4 font-bold">info@ziwa.online</p>
          <p className="mt-2 font-bold">www.ziwa.online</p>
        </div>

        <div className="rounded-2xl bg-black p-7 text-white">
          <h2 className="text-2xl font-black">Legal / Director</h2>
          <p className="mt-4 font-bold">legal@ziwa.online</p>
          <p className="mt-2 font-bold">director@ziwa.online</p>
        </div>

        <div className="rounded-2xl bg-red-700 p-7 text-white">
          <h2 className="text-2xl font-black">Phone / WhatsApp</h2>
          <p className="mt-4 font-bold">+263 78 486 5777</p>
          <p className="mt-2 font-bold">
            WhatsApp Messages Only: +263 77 001 502
          </p>
          <p className="mt-2 text-sm font-semibold">
            Please use WhatsApp messages only on the second number.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
          <h2 className="text-2xl font-black text-green-800">
            Send A Message
          </h2>

          <form className="mt-8 grid gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="rounded-lg border p-4"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-lg border p-4"
            />

            <input
              type="text"
              placeholder="Phone / WhatsApp"
              className="rounded-lg border p-4"
            />

            <textarea
              placeholder="Your Message"
              className="min-h-[150px] rounded-lg border p-4"
            />

            <button
              type="submit"
              className="rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}