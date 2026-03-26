import { GasStation } from '@/hooks/useGasRealtime';

export const PriceTable = ({ stations }: { stations: GasStation[] }) => (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-gas-card">
        <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-[10px] font-bold uppercase text-slate-500">
                <tr>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Station</th>
                    <th className="px-6 py-4">Diesel</th>
                    <th className="px-6 py-4">Unleaded 91</th>
                    <th className="px-6 py-4 text-right">Area</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
                {stations.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-gas-orange" />
                                <span className="font-bold text-white uppercase">{s.brand}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-medium">{s.location}</td>
                        <td className="px-6 py-4 font-mono font-bold text-gas-orange">
                            {Number(s.diesel_price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-white">
                            {Number(s.gasoline_price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500 text-xs">{s.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);