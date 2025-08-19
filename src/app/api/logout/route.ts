import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = NextResponse.json({ success: true });
    console.log("Logout API called");

    res.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0, // Cookieを削除するためにmaxAgeを0に設定
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}