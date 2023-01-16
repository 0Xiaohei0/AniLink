import "./App.css";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import WatchlistPage from "./Pages/WatchlistPage";

function App() {
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
    </Routes>
  );
}

export default App;
