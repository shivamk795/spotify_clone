import { useState, useEffect } from "react";
import useAuth from "../useAuth";
import Player from "./Player";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { useStateProvider } from "../Context/StateProvider";
import TopNav from "./TopNav";
import Playlists from "./Playlist";
import Searches from "./Searches";
const spotifyApi = new SpotifyWebApi({
  clientId: "3f2774bc406c42d5892156eec8d0019c",
});

export default function Dashboard() {
  const [{ token, searchres, currentPlaying }] = useStateProvider();
  const accessToken = useAuth(token);
  const [search, setSearch] = useState("");
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  useEffect(() => {
    setPlayingTrack({ uri: currentPlaying });
  }, [currentPlaying]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }
  // console.log(playingTrack);
  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <Container
      className="d-flex flex-column p-2 bg-dark m-0 p-0"
      style={{
        height: "100vh",
        background: "linear-gradient(transparent, rgba(0, 0, 0, 1)",
      }}
    >
      <TopNav />
      <div className="flex-grow-1 my-2 " style={{ overflowY: "auto" }}>
        <Searches
          chooseTrack={chooseTrack}
          lyrics={lyrics}
          searchres={searchres}
        />
        {!searchres && <Playlists />}
      </div>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </Container>
  );
}
