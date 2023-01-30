import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WatchlistPage from "./Pages/WatchlistPage";
import DataExportPage from "./Pages/DataExportPage";
import jwtDecode from "jwt-decode";

function App() {
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "63142776086-cjme36l60pq8m1hp0erirsqftbmu80e8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
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
