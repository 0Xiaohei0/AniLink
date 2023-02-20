import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WatchlistPage from "./Pages/WatchlistPage";
import DataExportPage from "./Pages/DataExportPage";
import axios from "axios";
import { getWatchlist, setWatchlist } from "./Data/Watchlist";
import { getUser, isLoggedin } from "./Data/User";

function App() {
  window.addEventListener("storage", () => {
    console.log("Change to local storage!");
    syncWatchlist();
  });

  async function syncWatchlist() {
    if (isLoggedin()) {
      console.log("syncing watchlist for user" + getUser().sub);
      const r = await axios.put(
        process.env.REACT_APP_BACKEND_URL + "/watchlist",
        {
          uId: getUser().sub,
          watchlistData: getWatchlist(),
        }
      );
      console.log(r.data);
      //toast.success(`cloud sync successful`);
    }
  }

  async function fetchWatchlist() {
    const r = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/watchlist",
      {
        uId: getUser().sub,
        watchlistData: getWatchlist(),
      },
      { crossDomain: true }
    );
    setWatchlist(r.data.watchlistData);
    toast.success(`Logged in as ${getUser().name}`);
    toast(r.data.message);
    toast(`Loaded ${r.data.watchlistData.length} shows`);
  }

  useEffect(() => {
    if (isLoggedin()) {
      fetchWatchlist();
    }
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
