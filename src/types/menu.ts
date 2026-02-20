export interface MenuItem {
  name: string;
  desc: string;
  varenr: string;
  prices: string[];
}

export interface Business {
  name: string;
  address: string;
  phone: string;
  email: string;
  cvr: string;
  hours: string;
  pickup: boolean;
  delivery: boolean;
  reviews: number;
  appStore: string;
  googlePlay: string;
  smiley: string;
  mapUrl: string;
}

export interface MenuData {
  business: Business;
  categoryImages: Record<string, string>;
  menu: Record<string, MenuItem[]>;
}

export interface CartItem extends MenuItem {
  id: string;
  category: string;
  selectedPrice: string;
  quantity: number;
  extras?: Array<{ name: string; price: number | null }>;
  removedIncluded?: string[];
}