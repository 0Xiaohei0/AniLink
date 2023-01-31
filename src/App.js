import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WatchlistPage from "./Pages/WatchlistPage";
import DataExportPage from "./Pages/DataExportPage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { getWatchlist, setWatchlist } from "./Data/Watchlist";
import { getUser, isLoggedin, setUser } from "./Data/User";

function App() {
  window.addEventListener("storage", () => {
    console.log("Change to local storage!");
    syncWatchlist();
  });

  async function syncWatchlist() {
    if (isLoggedin()) {
      console.log("syncing watchlist for user" + getUser().sub);
      const r = await axios.put("http://localhost:3000/watchlist", {
        uId: getUser().sub,
        watchlistData: getWatchlist(),
      });
      console.log(r.data);
    }
  }
  const navigate = useNavigate();
  async function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    setUser(jwtDecode(response.credential));
    const r = await axios.post(
      "http://localhost:3000/watchlist",
      {
        uId: getUser().sub,
        watchlistData: getWatchlist(),
      },
      { crossDomain: true }
    );
    console.log(r.data);
    setWatchlist(r.data.watchlistData);
    console.log(r.data.message);

    navigate("/");
  }

  useEffect(() => {
    try {
      /*global google */
      google.accounts.id.initialize({
        client_id:
          "63142776086-cjme36l60pq8m1hp0erirsqftbmu80e8.apps.googleusercontent.com",
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
    <Routes>
      <Route
        path="/"
        element={
          <>
            <WatchlistPage />
            <SearchPage />
          </>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/dataExport" element={<DataExportPage />} />
    </Routes>
  );
}

export default App;
