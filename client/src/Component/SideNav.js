import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { MdHomeFilled, MdOutlineLogout } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { useStateProvider } from "../Context/StateProvider";
import { reducerCases } from "../Context/Constants";
export default function SideNav() {
  const [{ userplaylist, searchres }, dispatch] = useStateProvider();
  const [upshow, setUpshow] = useState(false);
  const home = () => {
    let userplaylist = false;
    let searchres = null;
    dispatch({ type: reducerCases.SET_UPLAY, userplaylist });
    dispatch({ type: reducerCases.SET_SEARCHRES, searchres });
  };
  const logout = () => {
    window.location = "/";
  };
  const uplaylist = () => {
    let userplaylist = !upshow;
    setUpshow(!upshow);

    console.log(userplaylist);
    dispatch({ type: reducerCases.SET_UPLAY, userplaylist });
  };

  return (
    <div className="d-flex flex-column bg-black w-10 text-white vw-30 p-3">
      <Container>
        <div className="d-flex flex-column">
          <div className="text-center">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="spotify"
              width="150"
              height="80"
              display="block"
            />
          </div>
          <ul
            className="d-flex flex-column p-4 gap-3"
            style={{ listStyleType: "none" }}
          >
            <li>
              <MdHomeFilled />
              {/* <span>Home</span> */}
              <a
                className="p-1 --bs-tertiary-color rounded text-decoration-none text-white pointer"
                onClick={home}
                style={{ cursor: "pointer" }}
              >
                Home
              </a>
            </li>
            <li>
              <IoLibrary />
              <span style={{ cursor: "pointer" }} onClick={uplaylist}>
                Your Library
              </span>
            </li>
            <li className="">
              <MdOutlineLogout />
              <span style={{ cursor: "pointer" }} onClick={logout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
