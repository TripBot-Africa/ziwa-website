import Link from "next/link";
import { supabase } from "@/app/lib/supabaseClient";

export const dynamic = "force-dynamic";

const campaigns = [
  {
    status: "Active Campaign",
    title: "Protect Informal Livelihoods",
    description:
      "A national campaign calling for fair treatment, humane policy enforcement and protection of informal workers affected by demolitions, displacement and economic exclusion.",
  },
  {
    status: "Policy Campaign",
    title: "Fair Markets for Farmers",
    description:
      "Promoting direct access to markets, national demand forecasting and fair prices for subsistence and small-scale farmers.",
  },
  {
    status: "Reform Campaign",
    title: "Formalise Artisanal Mining",
    description:
      "Calling for registration, regulated claims, cooperatives, environmental responsibility and lawful economic participation for artisanal miners.",
  },
  {
    status: "National Campaign",
    title: "Fast-Track Housing Waiting Lists",
    description:
      "Demanding transparent housing waiting lists, serviced land allocation timelines and accountability against land barons.",
  },
];

export default async function CampaignsPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const publishedCampaigns =
    posts?.filter((post) => post.category === "Campaign") || [];

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="bg-red-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase text-red-100">
            ZIWA Campaigns
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            National Campaigns
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8">
            ZIWA campaigns for fair policies, protected livelihoods, economic
            inclusion and practical reforms affecting Zimbabwe&apos;s informal
            and subsistence workers.
          </p>
        </div>
      </section>

      {publishedCampaigns.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-green-700">
            Latest Published Campaigns
          </p>

          <h2 className="mt-3 text-4xl font-black text-zinc-950">
            Official ZIWA Publications
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {publishedCampaigns.map((post) => (
              <Link
                key={post.id}
                href={`/campaigns/${post.slug}`}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="h-64 w-full object-cover"
                  />
                )}

                <div className="p-7">
                  <p className="text-xs font-black uppercase text-green-700">
                    {post.category} • Published
                  </p>

                  <h3 className="mt-4 text-2xl font-black text-zinc-950">
                    {post.title}
                  </h3>

                  <p className="mt-5 leading-8 text-zinc-700">
                    {post.excerpt || post.summary}
                  </p>

                  <span className="mt-6 inline-block rounded-lg bg-green-800 px-5 py-3 text-sm font-black text-white">
                    Read Campaign
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-widest text-green-700">
          Core Campaign Areas
        </p>

        <h2 className="mt-3 text-4xl font-black text-zinc-950">
          ZIWA Standing Campaigns
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <article
              key={campaign.title}
              className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-black uppercase text-green-700">
                {campaign.status}
              </p>

              <h2 className="mt-4 text-2xl font-black text-zinc-950">
                {campaign.title}
              </h2>

              <p className="mt-5 leading-8 text-zinc-700">
                {campaign.description}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-block rounded-lg bg-green-800 px-5 py-3 text-sm font-black text-white hover:bg-green-900"
              >
                Support Campaign
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}