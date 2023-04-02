import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { Form } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../Context/StateProvider";
import { reducerCases } from "../Context/Constants";
export default function TopNav() {
  const [{ accessToken }] = useStateProvider();
  const [{ userInfo, searchres }, dispatch] = useStateProvider();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    !searchres && setSearch("");
  }, [searchres]);

  const spotifyApi = new SpotifyWebApi({
    clientId: "3f2774bc406c42d5892156eec8d0019c",
    accessToken: accessToken,
  });

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults(null);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        console.log(res.body.tracks.items);
        if (cancel) return;
        setSearchResults(
          res.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => (cancel = true);
  }, [search, accessToken]);
  useEffect(() => {
    const searchres = searchResults;
    dispatch({ type: reducerCases.SET_SEARCHRES, searchres });
  }, [searchResults]);

  useEffect(() => {
    accessToken &&
      spotifyApi.getMe().then(
        function (data) {
          const userInfo = {
            userId: data.body.id,
            userUrl: data.body.external_urls.spotify,
            name: data.body.display_name,
          };
          dispatch({ type: reducerCases.SET_USER, userInfo });
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);
  return (
    <div className="d-flex justify-content-between align-items-center fixed-top p-2 vh-15 sticky-top">
      {" "}
      <div className="search__bar d-flex align-items-center">
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="avatar bg-black d-flex align-items-center justify-content-between p-2 rounded-pill">
        <a
          className=" d-flex align-items-center justify-content-between fw-semibold text-decoration-none text-white gap-2"
          href={userInfo?.userUrl}
        >
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </div>
  );
}
