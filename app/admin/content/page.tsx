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
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data as Post[]);
  }

  async function uploadFile(bucket: string, file: File | null, slug: string) {
    if (!file) return null;

    const ext = file.name.split(".").pop();
    const fileName = `${slug}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
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

      const payload = {
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
        published_at:
          form.status === "published" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      const result = editingId
        ? await supabase.from("posts").update(payload).eq("id", editingId)
        : await supabase.from("posts").insert(payload);

      if (result.error) {
        setMessage("Failed to save. Check Supabase table, columns or storage.");
      } else {
        setMessage(editingId ? "Content updated successfully." : "Content published successfully.");
        resetForm();
        fetchPosts();
      }
    } catch {
      setMessage("Upload failed. Check that post-images and post-pdfs buckets are public.");
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
    const confirmed = confirm("Delete this content permanently?");
    if (!confirmed) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      setMessage("Failed to delete content.");
    } else {
      setMessage("Content deleted.");
      fetchPosts();
    }
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
            <p className="text-sm font-black uppercase text-green-200">ZIWA Admin</p>
            <h1 className="mt-3 text-4xl font-black">Publishing Dashboard</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-green-50">
              Create, edit, publish, feature and manage ZIWA campaigns, policies,
              articles, statements, images and PDFs.
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
          <form onSubmit={submitPost} className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-black text-green-800">
                {editingId ? "Edit Publication" : "Create New Publication"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-4 py-2 text-sm font-black"
                >
                  CANCEL EDIT
                </button>
              )}
            </div>

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
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-lg border p-4"
              >
                <option>Campaign</option>
                <option>Article</option>
                <option>Policy</option>
                <option>Statement</option>
                <option>News</option>
              </select>

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="rounded-lg border p-4"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <label className="flex items-center gap-3 rounded-lg border p-4 font-bold">
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
                className="rounded-lg border p-4"
              />

              {form.image_url && !imageFile && (
                <img
                  src={form.image_url}
                  alt="Current post"
                  className="h-40 w-full rounded-xl object-cover"
                />
              )}

              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="rounded-lg border p-4"
              />

              {form.pdf_url && !pdfFile && (
                <a
                  href={form.pdf_url}
                  target="_blank"
                  className="text-sm font-black text-green-800"
                >
                  View current PDF →
                </a>
              )}

              <input
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                placeholder="Video URL optional"
                className="rounded-lg border p-4"
              />

              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Short summary"
                className="min-h-[90px] rounded-lg border p-4"
              />

              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                placeholder="Write full publication here..."
                className="min-h-[320px] rounded-lg border p-4"
              />

              <input
                value={form.seo_title}
                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                placeholder="SEO title optional"
                className="rounded-lg border p-4"
              />

              <textarea
                value={form.seo_description}
                onChange={(e) =>
                  setForm({ ...form, seo_description: e.target.value })
                }
                placeholder="SEO description optional"
                className="min-h-[80px] rounded-lg border p-4"
              />

              <button
                disabled={loading}
                className="rounded-lg bg-green-800 px-6 py-4 font-black text-white hover:bg-green-900 disabled:bg-zinc-500"
              >
                {loading
                  ? "SAVING..."
                  : editingId
                    ? "UPDATE PUBLICATION"
                    : "SAVE PUBLICATION"}
              </button>
            </div>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-black text-green-800">
              Existing Publications
            </h2>

            <div className="mt-6 grid gap-4">
              {posts.length === 0 ? (
                <p className="font-bold text-zinc-600">No content yet.</p>
              ) : (
                posts.map((post) => (
                  <article key={post.id} className="rounded-2xl border border-zinc-200 p-5">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="mb-4 h-44 w-full rounded-xl object-cover"
                      />
                    )}

                    <p className="text-xs font-black uppercase text-green-700">
                      {post.category} • {post.status} {post.featured ? "• Featured" : ""}
                    </p>

                    <h3 className="mt-2 text-lg font-black">{post.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600">/{post.slug}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-700">
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