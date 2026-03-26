import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

// CRITICAL: We must EXPORT this so PriceCard and PriceTable can use it
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

export const useGasRealtime = () => {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStations = async () => {
    const { data } = await supabase
      .from('stations')
      .select('*')
      .order('diesel_price', { ascending: true });
    
    if (data) {
      // Fix for Error TS7006: Adding explicit type to 's'
      const formatted = data.map((s: any) => ({
        ...s,
        gasoline_price: Number(s.gasoline_price),
        diesel_price: Number(s.diesel_price),
        lat: Number(s.lat),
        lng: Number(s.lng)
      })) as GasStation[];
      setStations(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStations();
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stations' }, () => {
        fetchStations();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { stations, loading };
};