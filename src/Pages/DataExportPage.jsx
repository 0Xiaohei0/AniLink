import React from "react";
import { getWatchlist } from "../Data/Watchlist";

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
  return (
    <section>
      <h1>Data Export</h1>
      <button onClick={exportWatchlist}>Export as json</button>
    </section>
  );
}

export default DataExportPage;
