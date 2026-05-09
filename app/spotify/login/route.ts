import { getAuthUrl } from "@/lib/spotify/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const state = crypto.randomUUID()
  const authUrl = getAuthUrl(state)

  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  cookieStore.set("spotify_state", state, {
    httpOnly: true,
    maxAge: 3600,
    path: "/",
  })

  return NextResponse.redirect(authUrl)
}