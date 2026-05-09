import { NextResponse } from "next/server"
import { ARCHETYPES, getAlterEgo } from "@/lib/personality/archetypes"
import { analyzePersonality, SpotifyArtist, SpotifyTrack, SpotifyAudioFeatures } from "@/lib/personality/analyzer"

export async function GET() {
  const demoArtists: SpotifyArtist[] = [
    { id: "1", name: "Radiohead", genres: ["alternative rock", "art rock", "electronic"], popularity: 85, followers: 5000000 },
    { id: "2", name: "Kendrick Lamar", genres: ["hip hop", "rap", "conscious hip hop"], popularity: 88, followers: 6000000 },
    { id: "3", name: "Björk", genres: ["electronic", "art pop", "experimental"], popularity: 75, followers: 1500000 },
    { id: "4", name: "Bon Iver", genres: ["indie folk", "indie rock", "alternative"], popularity: 78, followers: 2000000 },
    { id: "5", name: "Daft Punk", genres: ["electronic", "house", "dance"], popularity: 82, followers: 3500000 },
    { id: "6", name: "Arcade Fire", genres: ["indie rock", "alternative", "baroque pop"], popularity: 76, followers: 1800000 },
    { id: "7", name: "FKA twigs", genres: ["art pop", "electronic", "r&b"], popularity: 72, followers: 800000 },
    { id: "8", name: "Tame Impala", genres: ["psychedelic rock", "indie pop", "electronic"], popularity: 80, followers: 2500000 },
  ]

  const demoTracks: { track: SpotifyTrack; audioFeatures: SpotifyAudioFeatures }[] = [
    { track: { id: "1", name: "Pyramid Song", artists: ["Radiohead"], album: "Amnesiac", popularity: 75, duration_ms: 330000, preview_url: null }, audioFeatures: { acousticness: 0.3, danceability: 0.4, energy: 0.5, instrumentalness: 0.1, liveness: 0.1, loudness: -10, speechiness: 0.05, tempo: 90, valence: 0.3 } },
    { track: { id: "2", name: "DNA.", artists: ["Kendrick Lamar"], album: "DAMN.", popularity: 85, duration_ms: 240000, preview_url: null }, audioFeatures: { acousticness: 0.05, danceability: 0.8, energy: 0.9, instrumentalness: 0.01, liveness: 0.3, loudness: -6, speechiness: 0.8, tempo: 160, valence: 0.6 } },
    { track: { id: "3", name: "Bachelorette", artists: ["Björk"], album: "Homogenic", popularity: 70, duration_ms: 310000, preview_url: null }, audioFeatures: { acousticness: 0.2, danceability: 0.5, energy: 0.6, instrumentalness: 0.3, liveness: 0.2, loudness: -8, speechiness: 0.1, tempo: 120, valence: 0.4 } },
    { track: { id: "4", name: "Holocene", artists: ["Bon Iver"], album: "Bon Iver", popularity: 78, duration_ms: 350000, preview_url: null }, audioFeatures: { acousticness: 0.7, danceability: 0.3, energy: 0.4, instrumentalness: 0.2, liveness: 0.1, loudness: -12, speechiness: 0.05, tempo: 85, valence: 0.3 } },
    { track: { id: "5", name: "Get Lucky", artists: ["Daft Punk"], album: "Random Access Memories", popularity: 88, duration_ms: 260000, preview_url: null }, audioFeatures: { acousticness: 0.4, danceability: 0.9, energy: 0.8, instrumentalness: 0.05, liveness: 0.3, loudness: -7, speechiness: 0.1, tempo: 115, valence: 0.8 } },
    { track: { id: "6", name: "Everything Now", artists: ["Arcade Fire"], album: "Everything Now", popularity: 74, duration_ms: 240000, preview_url: null }, audioFeatures: { acousticness: 0.3, danceability: 0.6, energy: 0.7, instrumentalness: 0.1, liveness: 0.2, loudness: -8, speechiness: 0.1, tempo: 120, valence: 0.6 } },
    { track: { id: "7", name: "cellophane", artists: ["FKA twigs"], album: "LP1", popularity: 70, duration_ms: 280000, preview_url: null }, audioFeatures: { acousticness: 0.2, danceability: 0.7, energy: 0.5, instrumentalness: 0.3, liveness: 0.1, loudness: -9, speechiness: 0.2, tempo: 100, valence: 0.4 } },
    { track: { id: "8", name: "The Less I Know The Better", artists: ["Tame Impala"], album: "Currents", popularity: 84, duration_ms: 230000, preview_url: null }, audioFeatures: { acousticness: 0.1, danceability: 0.8, energy: 0.7, instrumentalness: 0.2, liveness: 0.2, loudness: -7, speechiness: 0.1, tempo: 125, valence: 0.7 } },
  ]

  const result = analyzePersonality(demoArtists, demoTracks, [])

  return NextResponse.json(result)
}