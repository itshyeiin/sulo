import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GasStation } from "@/api/types";

// Price Tag UI Generator
const createPriceTag = (price: number) => {
    return L.divIcon({
        className: "bg-transparent border-none",
        html: `
      <div class="flex flex-col items-center">
        <div class="bg-orange-600 text-white px-2 py-1 rounded shadow-md text-[10px] font-black border border-orange-700 whitespace-nowrap">
          ₱${Number(price).toFixed(2)}
        </div>
        <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-orange-600"></div>
      </div>
    `,
        iconSize: [45, 30],
        iconAnchor: [22, 30],
    });
};

export const FuelMap = ({ stations }: { stations: GasStation[] }) => {
    // Center of Metro Manila
    const center: [number, number] = [14.5995, 120.9842];

    // If stations are missing or have no coordinates, don't crash the map
    if (!stations || stations.length === 0) return null;

    return (
        <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative z-0">
            <MapContainer
                center={center}
                zoom={12}
                className="h-full w-full bg-[#f8f9fa]" // Light background placeholder
                scrollWheelZoom={true}
            >
                {/* LIGHT MODE TILES (Carto Voyager) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {stations.map((s) => (
                    <Marker
                        key={s.id}
                        position={[Number(s.lat), Number(s.lng)]} // Force Number conversion here
                        icon={createPriceTag(s.diesel_price)}
                    >
                        <Popup>
                            <div className="p-1 font-sans text-slate-800">
                                <p className="font-black text-[10px] text-orange-600 uppercase tracking-tighter leading-none">
                                    {s.brand}
                                </p>
                                <h4 className="font-bold text-sm my-1">{s.location}</h4>
                                <div className="flex justify-between border-t pt-2 gap-4">
                                    <div>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase">
                                            Diesel
                                        </p>
                                        <p className="font-mono font-bold text-sm text-slate-900">
                                            ₱${s.diesel_price}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase">
                                            Unleaded
                                        </p>
                                        <p className="font-mono font-bold text-sm text-slate-900">
                                            ₱${s.gasoline_price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
