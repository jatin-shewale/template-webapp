import { ListeningArchetype, ARCHETYPES, GenreDNA, MoodSpectrum, AlterEgo, getAlterEgo } from "./archetypes"

export type SpotifyTrack = {
  id: string
  name: string
  artists: string[]
  album: string
  popularity: number
  duration_ms: number
  preview_url: string | null
}

export type SpotifyAudioFeatures = {
  acousticness: number
  danceability: number
  energy: number
  instrumentalness: number
  liveness: number
  loudness: number
  speechiness: number
  tempo: number
  valence: number
}

export type SpotifyArtist = {
  id: string
  name: string
  genres: string[]
  popularity: number
  followers: number
}

export type SpotifyAlbum = {
  id: string
  name: string
  artists: string[]
  release_date: string
  total_tracks: number
}

export type PersonalityResult = {
  archetype: ListeningArchetype
  genreDNA: GenreDNA[]
  moodSpectrum: MoodSpectrum
  alterEgo: AlterEgo
  topArtists: SpotifyArtist[]
  topTracks: SpotifyTrack[]
  stats: {
    totalMinutesListened: number
    uniqueArtists: number
    uniqueGenres: number
  }
  musicalReading?: {
    reading: string
    personalizedArchetype: string
    mainCharacterEnergy: string
    signatureReason: string
  }
}

const GENRE_COLORS: Record<string, string> = {
  pop: "#FF6B6B",
  "dance pop": "#4ECDC4",
  "electronic": "#45B7D1",
  "hip hop": "#96CEB4",
  "rap": "#FFEAA7",
  "rock": "#DDA0DD",
  "indie": "#98D8C8",
  "alternative": "#F7DC6F",
  "jazz": "#BB8FCE",
  "blues": "#85C1E9",
  "classical": "#F8C471",
  "country": "#82CCDD",
  "folk": "#A3E4D7",
  "metal": "#E74C3C",
  "punk": "#F39C12",
  "r&b": "#EC7063",
  "soul": "#D7BDE2",
  "reggae": "#58D68D",
  "latin": "#F9E79F",
  "k-pop": "#FF9AA2",
  "ambient": "#C39BD3",
  "techno": "#85C1E9",
  "house": "#5D6D7E",
  "funk": "#D6DBDF",
  "gospel": "#A2D9F5",
  "singer-songwriter": "#E6B0AA",
  "punk rock": "#D98880",
  "indie pop": "#7FB3D5",
  "indie rock": "#85C1E9",
}

function getRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function calculateMoodSpectrum(audioFeatures: SpotifyAudioFeatures[]): MoodSpectrum {
  if (audioFeatures.length === 0) {
    return {
      energy: 0.5,
      danceability: 0.5,
      acousticness: 0.5,
      valence: 0.5,
      instrumentalness: 0.5,
      speechiness: 0.5
    }
  }

  return {
    energy: Math.round((audioFeatures.reduce((sum, f) => sum + f.energy, 0) / audioFeatures.length) * 100),
    danceability: Math.round((audioFeatures.reduce((sum, f) => sum + f.danceability, 0) / audioFeatures.length) * 100),
    acousticness: Math.round((audioFeatures.reduce((sum, f) => sum + f.acousticness, 0) / audioFeatures.length) * 100),
    valence: Math.round((audioFeatures.reduce((sum, f) => sum + f.valence, 0) / audioFeatures.length) * 100),
    instrumentalness: Math.round((audioFeatures.reduce((sum, f) => sum + f.instrumentalness, 0) / audioFeatures.length) * 100),
    speechiness: Math.round((audioFeatures.reduce((sum, f) => sum + f.speechiness, 0) / audioFeatures.length) * 100)
  }
}

export function calculateGenreDNA(artists: SpotifyArtist[]): GenreDNA[] {
  const genreMap = new Map<string, number>()

  artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreMap.set(genre, (genreMap.get(genre) || 0) + 1)
    })
  })

  const sortedGenres = Array.from(genreMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const total = sortedGenres.reduce((sum, [, count]) => sum + count, 0)

  return sortedGenres.map(([genre, count]) => ({
    genre,
    percentage: Math.round((count / total) * 100),
    color: GENRE_COLORS[genre] || getRandomColor()
  }))
}

export function findArchetype(moodSpectrum: MoodSpectrum, genreDNA: GenreDNA[]): ListeningArchetype {
  const scores = ARCHETYPES.map(archetype => {
    const targetFeatures = archetype.audioFeatures
    let score = 0

    score += 100 - Math.abs(moodSpectrum.energy - targetFeatures.energy) * 100
    score += 100 - Math.abs(moodSpectrum.danceability - targetFeatures.danceability) * 100
    score += 100 - Math.abs(moodSpectrum.acousticness - targetFeatures.acousticness) * 100
    score += 100 - Math.abs(moodSpectrum.valence - targetFeatures.valence) * 100

    const genreMatch = genreDNA.some(g =>
      archetype.name.toLowerCase().includes(g.genre.substring(0, 3)) ||
      g.genre.includes(archetype.id.split("-")[1] || "")
    )
    if (genreMatch) score += 50

    return { archetype, score }
  })

  const best = scores.sort((a, b) => b.score - a.score)[0]
  return best.archetype
}

export function analyzePersonality(
  topArtists: SpotifyArtist[],
  topTracks: { track: SpotifyTrack; audioFeatures: SpotifyAudioFeatures }[],
  recentlyPlayed: SpotifyTrack[]
): PersonalityResult {
  const audioFeatures = topTracks.map(t => t.audioFeatures)

  const moodSpectrum = calculateMoodSpectrum(audioFeatures)
  const genreDNA = calculateGenreDNA(topArtists)
  const archetype = findArchetype(moodSpectrum, genreDNA)
  const alterEgo = getAlterEgo(archetype)

  const totalMinutesListened = topTracks.reduce((sum, t) => sum + t.track.duration_ms, 0) / 60000

  return {
    archetype,
    genreDNA,
    moodSpectrum,
    alterEgo,
    topArtists,
    topTracks: topTracks.map(t => t.track),
    stats: {
      totalMinutesListened: Math.round(totalMinutesListened),
      uniqueArtists: new Set(topArtists.map(a => a.id)).size,
      uniqueGenres: genreDNA.length
    }
  }
}