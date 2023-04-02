import React, { useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Component/Dashboard";
import Spotify from "./Spotify";
import { reducerCases } from "./Context/Constants";
import { useStateProvider } from "./Context/StateProvider";
const code = new URLSearchParams(window.location.search).get("code");
// console.log("code- ", code);
function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("code");
    dispatch({ type: reducerCases.SET_TOKEN, token });
  }, [dispatch, token]);

  return code ? <Spotify /> : <Login />;
}

export default App;
