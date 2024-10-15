import React from 'react';

interface WineSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const WineSearch: React.FC<WineSearchProps> = ({ searchQuery, setSearchQuery }) => (
  <div className="wine-search">
    <input
      type="text"
      value={searchQuery}
      placeholder="Search by wine name or vintage"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

export default WineSearch;
