import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

function isAdmin(request: Request) {
  return (request.headers.get("cookie") || "").includes(
    "ziwa_admin_session=active"
  );
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const file = formData.get("file") as File | null;
  const bucket = String(formData.get("bucket") || "");
  const slug = String(formData.get("slug") || "ziwa-file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!["post-images", "post-pdfs"].includes(bucket)) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const fileName = `${slug}-${Date.now()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

  return NextResponse.json({ url: data.publicUrl });
}