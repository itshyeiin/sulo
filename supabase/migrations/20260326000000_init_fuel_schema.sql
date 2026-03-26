-- 1. Create the 'stations' table
CREATE TABLE IF NOT EXISTS public.stations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL,
    location TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT DEFAULT 'NCR',
    gasoline_price DECIMAL(10,2) DEFAULT 0.00,
    diesel_price DECIMAL(10,2) DEFAULT 0.00,
    premium_price DECIMAL(10,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) - Mandatory for Senior Devs
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
-- Policy: Anyone (even guests) can view prices
CREATE POLICY "Public Access: View prices" 
ON public.stations FOR SELECT 
TO anon, authenticated 
USING (is_active = true);

-- Policy: Only logged-in users can update prices (Crowdsourcing)
CREATE POLICY "Authenticated: Update prices" 
ON public.stations FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 4. Enable Real-time
-- This allows the frontend to 'listen' for pump price changes instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.stations;

-- 5. Auto-update the 'last_updated' timestamp function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_timestamp
BEFORE UPDATE ON public.stations
FOR EACH ROW EXECUTE FUNCTION update_timestamp();