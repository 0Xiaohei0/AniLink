import React from "react";
import NavBar from "../Components/Navbar";
import CoverCardList from "../Components/CoverCardList";
import { useState } from "react";

function SearchPage() {
  const [search, setSearch] = useState("k-on");
  return (
    <div>
      <NavBar setSearch={setSearch}></NavBar>
      <CoverCardList search={search}></CoverCardList>
    </div>
  );
}

export default SearchPage;
