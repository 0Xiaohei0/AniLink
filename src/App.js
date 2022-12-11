import "./App.css";
import NavBar from "./Components/Navbar";
import CoverCardList from "./Components/CoverCardList";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("k-on");
  return (
    <div>
      <NavBar setSearch={setSearch}></NavBar>
      <CoverCardList search={search}></CoverCardList>
    </div>
  );
}

export default App;
