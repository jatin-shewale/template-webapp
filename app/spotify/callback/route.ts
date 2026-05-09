import { getSpotifyApi } from "@/lib/spotify/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = request.cookies.get("spotify_state")?.value

  if (!code) {
    const errorParam = searchParams.get("error")
    console.error("Spotify returned an error:", errorParam)
    return NextResponse.redirect(new URL(`/?error=${errorParam || "no_code"}`, request.url))
  }

  if (state !== storedState) {
    return NextResponse.redirect(new URL("/?error=invalid_state", request.url))
  }

  try {
    const spotifyApi = getSpotifyApi()
    const data = await spotifyApi.authorizationCodeGrant(code)

    const { access_token, refresh_token } = data.body
    
    // Use Next.js native cookies API for guaranteed setting
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()

    cookieStore.set("spotify_access_token", access_token, {
      httpOnly: true,
      maxAge: 3500,
      path: "/",
    })

    cookieStore.set("spotify_refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    })

    return NextResponse.redirect(new URL("/wrapped", request.url))
  } catch (error) {
    console.error("Spotify callback error:", error)
    return NextResponse.redirect(new URL("/?error=spotify_error", request.url))
  }
}