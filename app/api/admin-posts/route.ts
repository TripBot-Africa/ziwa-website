import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

function isAdmin(request: Request) {
  return (request.headers.get("cookie") || "").includes(
    "ziwa_admin_session=active"
  );
}

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data || [] });
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const payload = {
    title: body.title,
    slug: body.slug || makeSlug(body.title),
    category: body.category,
    excerpt: body.excerpt,
    content: body.content,
    status: body.status,
    image_url: body.image_url || null,
    pdf_url: body.pdf_url || null,
    video_url: body.video_url || null,
    featured: body.featured || false,
    seo_title: body.seo_title || body.title,
    seo_description: body.seo_description || body.excerpt,
    published_at:
      body.status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const query = body.id
    ? supabaseAdmin.from("posts").update(payload).eq("id", body.id).select().single()
    : supabaseAdmin.from("posts").insert(payload).select().single();

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ post: data });
}

export async function DELETE(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing post id" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}