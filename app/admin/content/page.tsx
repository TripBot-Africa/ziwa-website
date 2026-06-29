"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  image_url: string | null;
  pdf_url: string | null;
  video_url: string | null;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
};

export default function AdminContentPage() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Campaign",
    excerpt: "",
    content: "",
    status: "published",
    video_url: "",
    featured: true,
    seo_title: "",
    seo_description: "",
    image_url: "",
    pdf_url: "",
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
    const res = await fetch("/api/admin-posts");
    const json = await res.json();

    if (!res.ok) {
      setMessage(json.error || "Failed to load publications.");
      return;
    }

    setPosts(json.posts || []);
  }

  async function uploadFile(bucket: string, file: File | null, slug: string) {
    if (!file) return null;

    const ext = file.name.split(".").pop();
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  }

  function addFormat(type: "h2" | "h3" | "bold" | "quote" | "bullet") {
    const insert =
      type === "h2"
        ? "\n\n## Big Section Heading\n\n"
        : type === "h3"
          ? "\n\n### Subheading\n\n"
          : type === "bold"
            ? "**bold text**"
            : type === "quote"
              ? "\n\n> Important quote here\n\n"
              : "\n\n- First point\n- Second point\n- Third point\n\n";

    setForm({ ...form, content: form.content + insert });
  }

  function resetForm() {
    setEditingId(null);
    setForm({
      title: "",
      category: "Campaign",
      excerpt: "",
      content: "",
      status: "published",
      video_url: "",
      featured: true,
      seo_title: "",
      seo_description: "",
      image_url: "",
      pdf_url: "",
    });
    setImageFile(null);
    setPdfFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (pdfInputRef.current) pdfInputRef.current.value = "";
  }

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const slug = makeSlug(form.title);
      const uploadedImage = await uploadFile("post-images", imageFile, slug);
      const uploadedPdf = await uploadFile("post-pdfs", pdfFile, slug);

      const res = await fetch("/api/admin-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title: form.title.trim(),
          slug,
          category: form.category,
          excerpt: form.excerpt.trim(),
          content: form.content.trim(),
          status: form.status,
          image_url: uploadedImage || form.image_url || null,
          pdf_url: uploadedPdf || form.pdf_url || null,
          video_url: form.video_url.trim() || null,
          featured: form.featured,
          seo_title: form.seo_title.trim() || form.title.trim(),
          seo_description: form.seo_description.trim() || form.excerpt.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setMessage(json.error || "Failed to save publication.");
        setLoading(false);
        return;
      }

      setMessage(
        editingId
          ? "Publication updated successfully."
          : "Publication published successfully."
      );

      resetForm();
      fetchPosts();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload or save failed.");
    }

    setLoading(false);
  }

  function editPost(post: Post) {
    setEditingId(post.id);
    setForm({
      title: post.title || "",
      category: post.category || "Campaign",
      excerpt: post.excerpt || "",
      content: post.content || "",
      status: post.status || "draft",
      video_url: post.video_url || "",
      featured: Boolean(post.featured),
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      image_url: post.image_url || "",
      pdf_url: post.pdf_url || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this publication permanently?")) return;

    const res = await fetch(`/api/admin-posts?id=${id}`, { method: "DELETE" });
    const json = await res.json();

    if (!res.ok) {
      setMessage(json.error || "Failed to delete publication.");
      return;
    }

    setMessage("Publication deleted.");
    fetchPosts();
  }

  async function logout() {
    await fetch("/api/admin-logout", { method: "POST" });
    window.location.href = "/login";
  }

  if (checkingAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100">
        <p className="text-xl font-black text-green-800">
          Checking admin access...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-gradient-to-br from-green-950 via-green-900 to-black p-8 text-white shadow-2xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-green-300">
            ZIWA Admin Publishing Centre
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Publish Campaigns That Move Zimbabwe
          </h1>

          <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-green-50 sm:text-xl">
            Create urgent campaigns, policy statements, articles, images, PDFs
            and public notices directly from the ZIWA dashboard.
          </p>

          <button
            onClick={logout}
            className="mt-8 rounded-xl bg-red-700 px-6 py-4 text-sm font-black text-white shadow-lg hover:bg-red-800"
          >
            LOGOUT
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <form
            onSubmit={submitPost}
            className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-3xl font-black tracking-tight text-green-900 sm:text-4xl">
                {editingId ? "Edit Publication" : "Create New Publication"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-4 py-2 text-sm font-black"
                >
                  CANCEL
                </button>
              )}
            </div>

            {message && (
              <div className="mt-5 rounded-xl bg-zinc-100 p-4 font-black text-zinc-800">
                {message}
              </div>
            )}

            <div className="mt-6 grid gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Powerful headline title"
                className="rounded-xl border-2 border-zinc-300 p-4 text-xl font-black outline-none focus:border-green-800"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
                >
                  <option>Campaign</option>
                  <option>Article</option>
                  <option>Policy</option>
                  <option>Statement</option>
                  <option>News</option>
                </select>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <label className="flex items-center gap-3 rounded-xl border-2 border-zinc-300 p-4 font-black">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Mark as featured on website
              </label>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
              />

              {form.image_url && !imageFile && (
                <img
                  src={form.image_url}
                  alt="Current post"
                  className="h-48 w-full rounded-xl object-cover"
                />
              )}

              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
              />

              <input
                value={form.video_url}
                onChange={(e) =>
                  setForm({ ...form, video_url: e.target.value })
                }
                placeholder="Video URL optional"
                className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
              />

              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm({ ...form, excerpt: e.target.value })
                }
                placeholder="Short summary"
                className="min-h-[100px] rounded-xl border-2 border-zinc-300 p-4 text-lg font-bold"
              />

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => addFormat("h2")} className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-black text-white">BIG HEADING</button>
                <button type="button" onClick={() => addFormat("h3")} className="rounded-lg bg-zinc-800 px-3 py-2 text-sm font-black text-white">SUBHEADING</button>
                <button type="button" onClick={() => addFormat("bold")} className="rounded-lg bg-green-800 px-3 py-2 text-sm font-black text-white">BOLD</button>
                <button type="button" onClick={() => addFormat("quote")} className="rounded-lg bg-green-700 px-3 py-2 text-sm font-black text-white">QUOTE</button>
                <button type="button" onClick={() => addFormat("bullet")} className="rounded-lg bg-green-600 px-3 py-2 text-sm font-black text-white">BULLETS</button>
              </div>

              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                required
                placeholder="Write full publication here..."
                className="min-h-[380px] rounded-xl border-2 border-zinc-300 p-4 text-lg font-semibold leading-8"
              />

              <input
                value={form.seo_title}
                onChange={(e) =>
                  setForm({ ...form, seo_title: e.target.value })
                }
                placeholder="SEO title optional"
                className="rounded-xl border-2 border-zinc-300 p-4 font-bold"
              />

              <textarea
                value={form.seo_description}
                onChange={(e) =>
                  setForm({ ...form, seo_description: e.target.value })
                }
                placeholder="SEO description optional"
                className="min-h-[90px] rounded-xl border-2 border-zinc-300 p-4 font-bold"
              />

              <button
                disabled={loading}
                className="rounded-xl bg-green-800 px-6 py-5 text-lg font-black text-white shadow-lg hover:bg-green-900 disabled:bg-zinc-500"
              >
                {loading
                  ? "SAVING..."
                  : editingId
                    ? "UPDATE PUBLICATION"
                    : "SAVE PUBLICATION"}
              </button>
            </div>
          </form>

          <div className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-green-900 sm:text-4xl">
              Existing Publications
            </h2>

            <div className="mt-6 grid gap-4">
              {posts.length === 0 ? (
                <p className="text-lg font-black text-zinc-600">
                  No content yet.
                </p>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-zinc-200 p-5 shadow-sm"
                  >
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="mb-4 h-44 w-full rounded-xl object-cover"
                      />
                    )}

                    <p className="text-xs font-black uppercase tracking-widest text-green-700">
                      {post.category} • {post.status}{" "}
                      {post.featured ? "• Featured" : ""}
                    </p>

                    <h3 className="mt-2 text-2xl font-black leading-tight text-zinc-950">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-zinc-500">
                      /{post.slug}
                    </p>

                    <p className="mt-3 text-sm font-semibold leading-6 text-zinc-700">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        onClick={() => editPost(post)}
                        className="rounded-lg bg-green-800 px-4 py-2 text-sm font-black text-white"
                      >
                        EDIT
                      </button>

                      <button
                        onClick={() => deletePost(post.id)}
                        className="rounded-lg bg-red-700 px-4 py-2 text-sm font-black text-white"
                      >
                        DELETE
                      </button>

                      {post.pdf_url && (
                        <a
                          href={post.pdf_url}
                          target="_blank"
                          className="rounded-lg border px-4 py-2 text-sm font-black"
                        >
                          PDF
                        </a>
                      )}
                    </div>
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