import React from "react";

export default function NavBar({ setSearch }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="Navbar">
      <input className="SearchBar" type="text" onChange={handleChange} />
    </div>
  );
}
