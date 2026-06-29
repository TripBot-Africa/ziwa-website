import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function Campaign({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

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

        <h1 className="mt-4 text-6xl font-black leading-tight text-zinc-900">
          {post.title}
        </h1>

        <p className="mt-8 text-xl leading-9 text-zinc-600">
          {post.excerpt}
        </p>

        <hr className="my-10" />

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />

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