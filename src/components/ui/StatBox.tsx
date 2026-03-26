interface StatBoxProps {
    label: string;
    value: number;
    trend: string;
    icon: string;
}

export const StatBox = ({ label, value, trend, icon }: StatBoxProps) => (
    <div className="bg-gas-card border border-slate-700 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{icon}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-black text-white">₱{value.toFixed(2)}</div>
        <div className="text-[10px] font-bold text-gas-orange mt-1">{trend} vs last week</div>
    </div>
);