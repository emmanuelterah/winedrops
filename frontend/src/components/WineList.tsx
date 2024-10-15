import React from 'react';
import { GroupedWine } from '../types/Wine';

interface WineListProps {
  wines: GroupedWine[];
  top10PercentIndex: number;
  bottom10PercentIndex: number;
}

const WineList: React.FC<WineListProps> = React.memo(({ wines, top10PercentIndex, bottom10PercentIndex }) => (
  <table className="wine-list">
    <thead>
      <tr>
        <th>Wine Name</th>
        <th>Vintage</th>
        <th>Revenue</th>
        <th>Bottles Sold</th>
        <th>Orders</th>
      </tr>
    </thead>
    <tbody>
      {wines.map((wine, index) => {
        const rowClass =
          index <= top10PercentIndex ? "top-10" : index >= bottom10PercentIndex ? "bottom-10" : "";
        return (
          <tr key={wine.name + wine.vintage} className={rowClass}>
            <td>{wine.name}</td>
            <td>{wine.vintage}</td>
            <td>£{wine.revenue.toFixed(2)}</td>
            <td>{wine.bottlesSold}</td>
            <td>{wine.ordersCount}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
));

export default WineList;
