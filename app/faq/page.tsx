const faqs = [
  {
    question: "What is ZIWA?",
    answer:
      "ZIWA is the Zimbabwe Informal Workers Association, a national organisation representing informal workers, subsistence farmers, vendors, traders, transporters, miners, artisans and self-employed workers.",
  },
  {
    question: "Who can join ZIWA?",
    answer:
      "Any Zimbabwean informal worker, self-employed person, small trader, farmer, transporter, artisanal miner, artisan, domestic worker or supporter of informal workers may join.",
  },
  {
    question: "Is there a joining fee?",
    answer:
      "There are currently no subscription payments being collected. ZIWA is focusing on national recruitment, organisation and awareness.",
  },
  {
    question: "What does ZIWA do?",
    answer:
      "ZIWA advocates for fair policies, protects livelihoods, supports formalisation, promotes market access and gives informal workers a national voice.",
  },
  {
    question: "How do I join?",
    answer:
      "You can join through the online membership form, WhatsApp contact, or printed recruitment registers distributed by ZIWA recruiters.",
  },
  {
    question: "Does ZIWA have offices?",
    answer:
      "ZIWA is building national and provincial structures. Official office or coordinator details will be published only when formally confirmed.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-green-400">
            Frequently Asked Questions
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Questions About ZIWA
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-200">
            Clear answers for members, supporters, informal workers and the
            public.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-xl font-black text-green-800">
                {faq.question}
              </h2>

              <p className="mt-4 leading-8 text-zinc-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}