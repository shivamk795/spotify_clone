import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "../Context/StateProvider";
import { reducerCases } from "../Context/Constants";
import Card from "react-bootstrap/Card";
// const spotifyApi = new SpotifyWebApi({
//   clientId: "3f2774bc406c42d5892156eec8d0019c",
// });
export default function Playlists() {
  const [
    { accessToken, userInfo, userplaylist, playlists, currentPlaying },
    dispatch,
  ] = useStateProvider();
  const [uplay, setUplay] = useState([]);
  const [newrel, setNewrel] = useState([]);
  const spotifyApi = new SpotifyWebApi({
    clientId: "3f2774bc406c42d5892156eec8d0019c",
    accessToken: accessToken,
  });
  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  useEffect(() => {
    accessToken &&
      spotifyApi
        .getFeaturedPlaylists({
          limit: 8,
          offset: 1,
          country: "IN",
        })
        .then(
          function (data) {
            const playlists = data.body;

            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    accessToken &&
      spotifyApi.getNewReleases({ limit: 8, offset: 0, country: "IN" }).then(
        function (data) {
          setNewrel(data.body.albums.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);
  useEffect(() => {
    userplaylist &&
      spotifyApi.getUserPlaylists(userInfo.userId).then(
        function (data) {
          setUplay(data.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [userplaylist, accessToken]);

  const play = (uri) => {
    let currentPlaying = uri;
    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
  };
  return (
    <div>
      {userplaylist && (
        <>
          <span className=" my-2 text-light p-2 fw-bold fs-3">
            Your Playlist
          </span>
          <ul className=" my-2 text-light d-flex p-2 list-group list-group-horizontal overflow-auto">
            {uplay == [] && (
              <div className="text-white">Your Playlist Is Empty</div>
            )}
            {uplay.map(({ name, id, images, uri }) => {
              return (
                <li
                  className="d-flex flex-column p-2 text-center justify-content-between align-items-center"
                  key={id}
                  onClick={() => play(uri)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className=" rounded"
                    src={images[0].url}
                    style={{ height: "140px", width: "140px" }}
                  />
                  {name.trim()}
                </li>
              );
            })}
            {/* <li>csdc</li> */}
          </ul>
        </>
      )}
      <span className=" my-2 text-light p-2 fw-bold fs-3">New Releases</span>
      <ul className=" my-2 text-light d-flex p-2 list-group list-group-horizontal overflow-auto">
        {newrel &&
          newrel.map(({ name, id, images, uri }) => {
            return (
              <li
                className="d-flex flex-column p-2 text-center justify-content-between align-items-center"
                key={id}
                onClick={() => play(uri)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className=" rounded"
                  src={images[0].url}
                  style={{ height: "140px", width: "140px" }}
                />
                {name.replace(/ *\([^)]*\) */g, "").trim()}
              </li>
            );
          })}
      </ul>
      <span className=" my-2 text-light p-2 fw-bold fs-3">Top Hits</span>
      <ul className=" my-2 text-light d-flex p-2 list-group list-group-horizontal overflow-auto">
        {playlists &&
          playlists.playlists.items.map(({ name, id, images, uri }) => {
            return (
              <li
                className="d-flex flex-column p-2 text-center justify-content-between align-items-center"
                key={id}
                onClick={() => play(uri)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className=" rounded"
                  src={images[0].url}
                  style={{ height: "140px", width: "140px" }}
                />
                {name.trim()}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
