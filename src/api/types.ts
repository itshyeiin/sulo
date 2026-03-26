export interface GasStation {
  id: string;
  brand: string;
  location: string;
  city: string;
  gasoline_price: number;
  diesel_price: number;
  premium_price: number;
  lat: number;
  lng: number;
  updated_at: string;
}