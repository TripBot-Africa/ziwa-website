 import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("ziwa_admin_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}