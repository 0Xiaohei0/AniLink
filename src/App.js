import "./App.css";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
