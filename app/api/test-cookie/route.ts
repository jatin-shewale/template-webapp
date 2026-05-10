import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.set("test_cookie_1", "value1", { path: "/" })
    cookieStore.set("test_cookie_2", "value2", { path: "/" })
    return NextResponse.redirect(new URL("/?test=1", request.url))
  } catch (error) {
    return NextResponse.json({ error: String(error) })
  }
}
