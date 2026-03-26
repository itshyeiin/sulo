import { GasStation } from '@/hooks/useGasRealtime';

export const calculateAverages = (stations: GasStation[]) => {
  if (stations.length === 0) return { diesel: 0, gasoline: 0 };
  
  const totals = stations.reduce((acc, curr) => ({
    diesel: acc.diesel + Number(curr.diesel_price),
    gasoline: acc.gasoline + Number(curr.gasoline_price),
  }), { diesel: 0, gasoline: 0 });

  return {
    diesel: totals.diesel / stations.length,
    gasoline: totals.gasoline / stations.length,
  };
};