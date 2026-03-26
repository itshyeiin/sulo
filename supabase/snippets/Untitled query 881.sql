-- 1. Add the missing coordinate columns
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS lat DECIMAL(10, 8);
ALTER TABLE public.stations ADD COLUMN IF NOT EXISTS lng DECIMAL(11, 8);

-- 2. Now run the updates with unique coordinates
UPDATE public.stations SET lat = 14.5547, lng = 121.0244 WHERE brand = 'Shell';
UPDATE public.stations SET lat = 14.6507, lng = 121.0483 WHERE brand = 'Petron';
UPDATE public.stations SET lat = 14.5826, lng = 121.0600 WHERE brand = 'Cleanfuel';
UPDATE public.stations SET lat = 14.5833, lng = 120.9842 WHERE brand = 'Caltex';

-- 3. Check if it worked
SELECT brand, location, lat, lng FROM public.stations;