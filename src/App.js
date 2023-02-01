import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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
      //toast.success(`cloud sync successful`);
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
    setWatchlist(r.data.watchlistData);

    navigate("/");
    toast.success(`Logged in as ${getUser().name}`);
    toast(r.data.message);
    toast(`Loaded ${r.data.watchlistData.length} shows`);
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
    <>
      <ToastContainer position="bottom-right" />
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
      </Routes>{" "}
    </>
  );
}

export default App;
