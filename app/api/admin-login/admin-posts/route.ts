import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes("ziwa_admin_session=active");
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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data });
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = makeSlug(body.title);

  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert({
      title: body.title,
      slug,
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
      published_at: body.status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}