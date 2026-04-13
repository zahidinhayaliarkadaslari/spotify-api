export default async function handler(req, res) {
  try {
    const access_token = process.env.SPOTIFY_ACCESS_TOKEN;

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const data = await response.json();

    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists?.[0]?.name,
      albumArt: data.item?.album?.images?.[0]?.url,
    });
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
}

