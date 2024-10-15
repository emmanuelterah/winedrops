import React from 'react';

interface SortingOptionsProps {
  sortMethod: "revenue" | "bottlesSold" | "ordersCount";
  setSortMethod: React.Dispatch<React.SetStateAction<"revenue" | "bottlesSold" | "ordersCount">>;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ sortMethod, setSortMethod }) => (
  <div className="sorting-options">
    <label>Sort by: </label>
    <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value as "revenue" | "bottlesSold" | "ordersCount")}>
      <option value="revenue">Revenue</option>
      <option value="bottlesSold">Total Bottles Sold</option>
      <option value="ordersCount">Total Orders</option>
    </select>
  </div>
);

export default SortingOptions;
