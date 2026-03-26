import { useMemo, useState, lazy, Suspense } from "react";
import { useGasRealtime } from "@/hooks/useGasRealtime";
import { PriceTable } from "@/components/ui/PriceTable";

// Lazy load the map to prevent "Invalid Hook Call" from crashing the whole app
const FuelMap = lazy(() =>
    import("@/components/ui/FuelMap").then((module) => ({
        default: module.FuelMap,
    })),
);

export const Home = () => {
    const { stations, loading } = useGasRealtime();
    const [view, setView] = useState<"map" | "list">("list");

    const stats = useMemo(() => {
        if (stations.length === 0) return { diesel: 0, gasoline: 0 };
        const d =
            stations.reduce((acc, s) => acc + (Number(s.diesel_price) || 0), 0) /
            stations.length;
        const g =
            stations.reduce((acc, s) => acc + (Number(s.gasoline_price) || 0), 0) /
            stations.length;
        return { diesel: d, gasoline: g };
    }, [stations]);

    if (loading)
        return (
            <div className="h-screen bg-[#0F172A] flex items-center justify-center">
                <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent animate-spin rounded-full" />
            </div>
        );

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-orange-500/30">
            {/* Consistent Navbar */}
            <nav className="border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-md">
                <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">
                    Sulo<span className="text-orange-500">ph</span>
                </h1>

                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shadow-inner">
                    <button
                        onClick={() => setView("map")}
                        className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${view === "map" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-white"}`}
                    >
                        MAP
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${view === "list" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-white"}`}
                    >
                        LIST
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
                {/* Consistent Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full border border-orange-500/30 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                            Real-time Tracker
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                            Track Fuel Prices <br />
                            <span className="text-slate-500 italic font-medium">
                                Across Metro Manila
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-md">
                            Compare pump prices from Shell, Petron, and more. Data synced with
                            community reports.
                        </p>
                    </div>

                    {/* Consistent Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl shadow-xl">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                Avg. Diesel
                            </span>
                            <div className="text-3xl font-black text-white mt-1">
                                ₱{stats.diesel.toFixed(2)}
                            </div>
                        </div>
                        <div className="bg-[#1E293B] border border-slate-700 p-6 rounded-2xl shadow-xl">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                Avg. Gasoline
                            </span>
                            <div className="text-3xl font-black text-white mt-1">
                                ₱{stats.gasoline.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic View Section */}
                <section className="transition-all duration-500">
                    {view === "map" ? (
                        <Suspense
                            fallback={
                                <div className="h-[500px] w-full bg-slate-900 rounded-3xl animate-pulse" />
                            }
                        >
                            <FuelMap stations={stations} />
                        </Suspense>
                    ) : (
                        <PriceTable stations={stations} />
                    )}
                </section>
            </main>
        </div>
    );
};
