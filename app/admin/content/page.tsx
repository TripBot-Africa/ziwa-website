"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  created_at: string;
};

export default function AdminContentPage() {
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "Article",
    excerpt: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    const hasAdminSession = document.cookie
      .split("; ")
      .some((cookie) => cookie === "ziwa_admin_session=active");

    if (!hasAdminSession) {
      window.location.href = "/login";
      return;
    }

    setCheckingAccess(false);
    fetchPosts();
  }, []);

  function makeSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  }

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const slug = makeSlug(form.title);

    const { error } = await supabase.from("posts").insert({
      title: form.title,
      slug,
      category: form.category,
      excerpt: form.excerpt,
      content: form.content,
      status: form.status,
    });

    if (error) {
      setMessage("Failed to save post. Check title/slug or Supabase table.");
    } else {
      setMessage("Post saved successfully.");
      setForm({
        title: "",
        category: "Article",
        excerpt: "",
        content: "",
        status: "draft",
      });
      fetchPosts();
    }

    setLoading(false);
  }

  async function logout() {
    await fetch("/api/admin-logout", { method: "POST" });
    window.location.href = "/login";
  }

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100">
        <p className="font-black text-green-800">Checking admin access...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 rounded-3xl bg-green-900 p-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-black uppercase text-green-200">
              ZIWA Admin
            </p>
            <h1 className="mt-3 text-4xl font-black">Content Dashboard</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-green-50">
              Write and publish ZIWA articles, policies, campaigns and
              statements without touching website code.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-700 px-5 py-3 text-sm font-black text-white hover:bg-red-800"
          >
            LOGOUT
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={submitPost}
            className="rounded-3xl bg-white p-6 shadow-lg"
          >
            <h2 className="text-2xl font-black text-green-800">
              Create New Content
            </h2>

            {message && (
              <div className="mt-5 rounded-xl bg-zinc-100 p-4 font-bold">
                {message}
              </div>
            )}

            <div className="mt-6 grid gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Title"
                className="rounded-lg border p-4"
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="rounded-lg border p-4"
              >
                <option>Article</option>
                <option>Policy</option>
                <option>Campaign</option>
                <option>Statement</option>
                <option>News</option>
              </select>

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="rounded-lg border p-4"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm({ ...form, excerpt: e.target.value })
                }
                placeholder="Short summary"
                className="min-h-[90px] rounded-lg border p-4"
              />

              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                required
                placeholder="Write full article, policy or campaign here..."
                className="min-h-[260px] rounded-lg border p-4"
              />

              <button
                disabled={loading}
                className="rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900 disabled:bg-zinc-500"
              >
                {loading ? "SAVING..." : "SAVE CONTENT"}
              </button>
            </div>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-black text-green-800">
              Existing Content
            </h2>

            <div className="mt-6 grid gap-4">
              {posts.length === 0 ? (
                <p className="font-bold text-zinc-600">No content yet.</p>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-zinc-200 p-5"
                  >
                    <p className="text-xs font-black uppercase text-green-700">
                      {post.category} • {post.status}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{post.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600">/{post.slug}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-700">
                      {post.excerpt}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}