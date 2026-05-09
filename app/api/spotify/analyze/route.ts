import { getSpotifyApi } from "@/lib/spotify/client"
import { analyzePersonality, SpotifyArtist, SpotifyTrack, SpotifyAudioFeatures } from "@/lib/personality/analyzer"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value
  console.log("Analyze Route - All Cookies:", request.cookies.getAll().map(c => c.name))
  console.log("Analyze Route - Access Token Found:", !!accessToken)

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const spotifyApi = getSpotifyApi(accessToken)

    const [topArtistsRes, topTracksRes] = await Promise.all([
      spotifyApi.getMyTopArtists({ limit: 50, time_range: "long_term" }),
      spotifyApi.getMyTopTracks({ limit: 50, time_range: "long_term" }),
    ])

    const topArtists: SpotifyArtist[] = topArtistsRes.body.items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      genres: artist.genres || [],
      popularity: artist.popularity,
      followers: artist.followers?.total || 0,
    }))

    const topTracks: SpotifyTrack[] = topTracksRes.body.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a: any) => a.name),
      album: track.album.name,
      popularity: track.popularity,
      duration_ms: track.duration_ms,
      preview_url: track.preview_url,
    }))

    const trackIds = topTracks.map(t => t.id)
    const audioFeaturesRes = await spotifyApi.getAudioFeaturesForTracks(trackIds)

    const audioFeaturesWithTracks = topTracks.map((track, i) => ({
      track,
      audioFeatures: audioFeaturesRes.body.audio_features[i] || {
        acousticness: 0.5,
        danceability: 0.5,
        energy: 0.5,
        instrumentalness: 0.5,
        liveness: 0.5,
        loudness: 0.5,
        speechiness: 0.5,
        tempo: 120,
        valence: 0.5,
      } as SpotifyAudioFeatures,
    }))

    const result = analyzePersonality(
      topArtists,
      audioFeaturesWithTracks.filter((t): t is { track: SpotifyTrack; audioFeatures: SpotifyAudioFeatures } =>
        !!t.audioFeatures
      ),
      []
    )

    // Add Gemini Reading
    const { generateMusicalReading } = await import("@/lib/gemini")
    result.musicalReading = await generateMusicalReading(result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Spotify analyze error:", error)
    return NextResponse.json({ error: "Failed to analyze personality" }, { status: 500 })
  }
}