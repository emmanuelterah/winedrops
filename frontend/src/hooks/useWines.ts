import { useState, useEffect } from 'react';
import { GroupedWine } from '../types/Wine';

const useWines = (sortMethod: "revenue" | "bottlesSold" | "ordersCount") => {
  const [wines, setWines] = useState<GroupedWine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWines = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/wines?sort=${sortMethod}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: GroupedWine[] = await response.json();
        setWines(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, [sortMethod]);

  return { wines, loading, error };
};

export default useWines;
