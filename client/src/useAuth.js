import { useState, useEffect } from "react";
import axios from "axios";
import { reducerCases } from "./Context/Constants";
import { useStateProvider } from "./Context/StateProvider";
export default function useAuth(code) {
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [{ accessToken }, dispatch] = useStateProvider();
  const [tkn, setTkn] = useState();
  useEffect(() => {
    code &&
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then((res) => {
          let accessToken = res.data.accessToken;
          dispatch({ type: reducerCases.SET_ACCESSTOKEN, accessToken });
          setTkn(accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, "/");
        })
        .catch((err) => {
          console.log(err);
        });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          let accessToken = res.data.accessToken;
          setTkn(accessToken);
          dispatch({ type: reducerCases.SET_ACCESSTOKEN, accessToken });
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return tkn;
}
