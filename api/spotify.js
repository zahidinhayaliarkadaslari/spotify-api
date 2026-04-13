import fetch from "node-fetch";

let access_token = process.env.SPOTIFY_ACCESS_TOKEN;

export default async function handler(req, res) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (response.status === 204) {
    return res.json({ isPlaying: false });
  }

  const data = await response.json();

  res.json({
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists[0].name,
    albumArt: data.item.album.images[0].url,
  });
}
