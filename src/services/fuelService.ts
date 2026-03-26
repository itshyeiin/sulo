import { supabase } from '@/utils/supabase';

export const fuelService = {
  updatePrice: async (stationId: string, fuelType: string, newPrice: number) => {
    const column = fuelType.toLowerCase() + '_price'; // e.g. 'diesel_price'
    
    const { error } = await supabase
      .from('stations')
      .update({ 
        [column]: newPrice,
        last_updated: new Date().toISOString()
      })
      .eq('id', stationId);

    if (error) throw error;
  }
};