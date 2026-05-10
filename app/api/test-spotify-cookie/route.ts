import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const isHttps = process.env.NODE_ENV === "production" || request.url.startsWith("https://")

    const fakeToken = "BQA2rkNumqsg8ZEo6-dci421bqJtxPUCygllqWSH9INBoSsSTf9WqEZ_Xh6v_WcY4kAcWNWsA0Ht79UA79kRakTHA99Du4AirgEJ8wtVO9N95q-jqJ1gmLY0yWWPZkXzxy94CqRt5rTGbA7oc8_svZNXxB81bPfVVqtF_w4l6CdjGYyljpdCLz3"

    cookieStore.set("spotify_access_token", fakeToken, {
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    })

    return NextResponse.redirect(new URL("/wrapped", request.url))
  } catch (error) {
    return NextResponse.json({ error: String(error) })
  }
}
