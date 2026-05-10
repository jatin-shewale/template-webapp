import { getAuthUrl } from "@/lib/spotify/client"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const state = crypto.randomUUID()
  const authUrl = getAuthUrl(state)

  const cookieStore = await cookies()
  const isHttps = process.env.NODE_ENV === "production" || request.url.startsWith("https://")

  cookieStore.set("spotify_state", state, {
    httpOnly: true,
    secure: isHttps,
    maxAge: 3600,
    path: "/",
  })

  return NextResponse.redirect(authUrl)
}