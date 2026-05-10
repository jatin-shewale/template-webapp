import SpotifyWebApi from "spotify-web-api-node"

const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "https://127.0.0.1:3000/spotify/callback"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: redirectUri,
})

export const getSpotifyApi = (accessToken?: string) => {
  const client = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: redirectUri,
  })
  
  if (accessToken) {
    client.setAccessToken(accessToken)
  }
  return client
}

export const getAuthUrl = (state: string) => {
  const scopes = [
    "user-top-read",
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-read-private",
    "user-follow-read",
  ]

  return spotifyApi.createAuthorizeURL(scopes, state)
}

export default spotifyApi
