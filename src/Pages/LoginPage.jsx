import "./LoginPage.css";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { getWatchlist, setWatchlist } from "../Data/Watchlist";
import { getUser, setUser } from "../Data/User";

function LoginPage() {
  const navigate = useNavigate();
  async function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    setUser(jwtDecode(response.credential));
    const r = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/watchlist",
      {
        uId: getUser().sub,
        watchlistData: getWatchlist(),
      },
      { crossDomain: true }
    );
    setWatchlist(r.data.watchlistData);

    navigate("/");
    toast.success(`Logged in as ${getUser().name}`);
    toast(r.data.message);
    toast(`Loaded ${r.data.watchlistData.length} shows`);
  }
  useEffect(() => {
    try {
      console.log("login useeffect");
      /*global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        type: "icon",
        shape: "square",
        text: "signin_with",
      });
    } catch (error) {}
  });
  return (
    <div className="container">
      <h1>Sign in</h1>
      <div className="social-login">
        <div id="signInDiv"></div>
      </div>
    </div>
  );
}

export default LoginPage;
