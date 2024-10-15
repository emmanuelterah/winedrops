// src/components/App.tsx
import "./App.css";
import React, { useState } from "react";
import useWines from "./hooks/useWines";
import { GroupedWine } from "./types/Wine";
import SortingOptions from "./components/SortingOptions";
import WineSearch from "./components/WineSearch";
import WineList from "./components/WineList";

const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<"revenue" | "bottlesSold" | "ordersCount">("revenue");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch wine data using the custom hook
  const { wines, loading, error } = useWines(sortMethod);

  // Normalize string: remove diacritics (accents), lower case, remove special characters, and trim spaces
  const normalizeString = (str: string): string => {
    return str
      .normalize("NFD") // Decompose accented characters into base characters and diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
      .toLowerCase()
      .replace(/[\s,.'’]+/g, " ") // Replace spaces, commas, periods, apostrophes with a single space
      .trim(); // Trim whitespace
  };

  // Filter wines based on the search query
  const filteredWines = wines.filter((wine) => {
    const normalizedQuery = normalizeString(searchQuery);
    const normalizedName = normalizeString(wine.name);
    const normalizedVintage = normalizeString(wine.vintage.toString());

    // Check if the normalized query is included in the normalized name or vintage
    return (
      normalizedName.includes(normalizedQuery) || normalizedVintage.includes(normalizedQuery)
    );
  });

  // Sorting wines by the selected sort method
  const sortedWines = [...filteredWines].sort((a, b) => b[sortMethod] - a[sortMethod]);

  // Get top and bottom 10% indexes for highlighting
  const top10PercentIndex = Math.floor(sortedWines.length * 0.1) - 1;
  const bottom10PercentIndex = sortedWines.length - top10PercentIndex;

  return (
    <div className="app-container">
      <h1>Best Selling Wines</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      {!loading && !error && (
        <>
          <SortingOptions sortMethod={sortMethod} setSortMethod={setSortMethod} />
          <WineSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <WineList
            wines={sortedWines}
            top10PercentIndex={top10PercentIndex}
            bottom10PercentIndex={bottom10PercentIndex}
          />
        </>
      )}
    </div>
  );
};

export default App;
