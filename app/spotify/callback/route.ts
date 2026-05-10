import { getSpotifyApi } from "@/lib/spotify/client"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    const errorParam = searchParams.get("error")
    console.error("Spotify returned an error:", errorParam)
    return NextResponse.redirect(new URL(`/?error=${errorParam || "no_code"}`, request.url))
  }

  try {
    console.log("Exchanging code for token, code:", code?.substring(0, 20) + "...")
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    })

    const data = await response.json()
    console.log("Spotify token response status:", response.status, "data:", JSON.stringify(data).substring(0, 200))

    console.log("Spotify token response:", {
      ok: response.ok,
      hasAccessToken: !!data.access_token,
      hasRefreshToken: !!data.refresh_token
    })

    if (!response.ok) {
      console.error("Spotify Token Error:", data)
      throw new Error("Failed to get token")
    }

    const cookieStore = await cookies()
    const isHttps = process.env.NODE_ENV === "production" || request.url.startsWith("https://")

    // 1. Use the proper Next.js 15+ await cookies() API
    cookieStore.set("spotify_access_token", data.access_token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    })

    if (data.refresh_token) {
      cookieStore.set("spotify_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: "lax",
        path: "/",
        maxAge: 2592000,
      })
    }

    // 2. Bulletproof Cross-Site Cookie Fix: Return 200 OK with HTML redirect
    // Chrome sometimes drops Set-Cookie headers on 30x redirects that immediately
    // follow a cross-site navigation (like returning from Spotify).
    const html = `
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=/wrapped">
          <title>Authenticating...</title>
        </head>
        <body style="background-color: #020617; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;">
          <h2>Authenticating with Spotify...</h2>
          <script>window.location.href = "/wrapped";</script>
        </body>
      </html>
    `

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Spotify callback error:", error)
    return NextResponse.redirect(new URL("/?error=spotify_error", request.url))
  }
}
