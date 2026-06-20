export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  image: string;
  categories: string[]; // e.g. ["main-course", "signature"]
  tag?: 'Best Seller' | 'Signature' | 'New' | '';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
