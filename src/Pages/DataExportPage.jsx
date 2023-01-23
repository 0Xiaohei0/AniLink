import React from "react";
import { getWatchlist } from "../Data/Watchlist";
import { useState } from "react";
import { setWatchlist } from "../Data/Watchlist";

function DataExportPage() {
  function exportWatchlist() {
    let storedWatchlist = getWatchlist();
    const fileData = JSON.stringify(storedWatchlist);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "watchlist.json";
    link.href = url;
    link.click();
  }

  const [files, setFiles] = useState("");

  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };
  const importWatchlist = () => {
    console.log(typeof files);
    setWatchlist(files);
  };

  return (
    <div>
      <section>
        <h1>Data Export</h1>
        <button onClick={exportWatchlist}>Export as json</button>
      </section>
      <section>
        <h1>Data Import</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={importWatchlist}>Import</button>
      </section>
    </div>
  );
}

export default DataExportPage;
