import React from 'react';
import { GasStation } from '@/hooks/useGasRealtime';
import { cn } from '@/utils/cn';

interface PriceCardProps {
    station: GasStation;
    isBestValue?: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({ station, isBestValue }) => {
    const fuels = [
        { name: 'Gasoline', price: station.gasoline_price },
        { name: 'Diesel', price: station.diesel_price },
        { name: 'Premium', price: station.premium_price },
    ];

    return (
        <div className={cn(
            "relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md",
            isBestValue ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200"
        )}>
            {isBestValue && (
                <div className="absolute top-0 right-0 bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-tighter">
                    Best NCR Price
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{station.brand}</h3>
                <p className="text-sm text-slate-500 font-medium">{station.location}, {station.city}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {fuels.map((f) => (
                    <div key={f.name} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{f.name}</span>
                        <span className="font-mono text-xl font-black text-slate-800 tracking-tighter">
                            ₱{Number(f.price).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-[10px] font-bold text-slate-400 text-right uppercase">
                Last Sync: {new Date(station.updated_at).toLocaleTimeString()}
            </p>
        </div>
    );
};