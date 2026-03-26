import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { GasStation } from '@/api/types';

export const useGasRealtime = () => {
  const [stations, setStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStations = async () => {
    try {
      const { data, error } = await supabase
        .from('stations')
        .select('*');

      if (error) throw error;

      if (data) {
        const formatted = data.map(s => ({
          ...s,
          gasoline_price: Number(s.gasoline_price) || 0,
          diesel_price: Number(s.diesel_price) || 0,
          lat: Number(s.lat) || 14.5995, // Default to Manila if missing
          lng: Number(s.lng) || 120.9842
        })) as GasStation[];
        setStations(formatted);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
    const channel = supabase
      .channel('realtime-sulo')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stations' }, fetchStations)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { stations, loading };
};