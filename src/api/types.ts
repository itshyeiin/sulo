export interface GasStation {
  id: string;
  brand: string;
  location: string;
  city: string;
  gasoline_price: number;
  diesel_price: number;
  premium_price: number;
  lat: number; // Ensure these are present
  lng: number; 
  updated_at: string;
}