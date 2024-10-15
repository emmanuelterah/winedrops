export interface Wine {
    name: string;
    vintage: number;
    revenue: number; // Total revenue from all orders for this wine
    bottlesSold: number; // Total bottles sold for this wine
    ordersCount: number; // Total number of orders for this wine
  }
  
  export interface GroupedWine extends Wine {
    uniquePrices: number[]; // Prices at which the wine is sold
  }
  