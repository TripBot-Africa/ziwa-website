import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Campaign Not Found | ZIWA",
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: `https://www.ziwa.online/campaigns/${post.slug}`,
      siteName: "ZIWA",
      images: post.image_url
        ? [
            {
              url: post.image_url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <main className="bg-white">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="h-[500px] w-full object-cover"
        />
      )}

      <article className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-black uppercase tracking-widest text-green-700">
          {post.category}
        </p>

        <h1 className="mt-4 text-5xl font-black leading-tight text-zinc-900 sm:text-6xl">
          {post.title}
        </h1>

        <p className="mt-8 text-xl leading-9 text-zinc-600">{post.excerpt}</p>

        <hr className="my-10" />

        <div className="whitespace-pre-line text-lg font-medium leading-9 text-zinc-800">
          {post.content}
        </div>

        {post.pdf_url && (
          <a
            href={post.pdf_url}
            target="_blank"
            className="mt-10 inline-block rounded-xl bg-green-800 px-8 py-4 font-black text-white"
          >
            Download PDF
          </a>
        )}
      </article>
    </main>
  );
}