import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function syncFuelPrices() {
    console.log("🚀 Starting NCR Fuel Scraper...");

    try {
        // 1. Target a PH Price Source (e.g., a news site or aggregator)
        // For this example, we'll simulate scraping a placeholder
        const targetUrl = 'https://www.autodeal.com.ph/fuel-prices';
        const { data } = await axios.get(targetUrl);
        const $ = cheerio.load(data);

        // 2. Extract Data (This selector changes based on the website's HTML)
        // We look for the average diesel price in the HTML
        const rawDiesel = $('.fuel-price-diesel').first().text().replace('₱', '').trim();
        const latestDiesel = parseFloat(rawDiesel);

        if (isNaN(latestDiesel)) throw new Error("Could not parse price from website.");

        console.log(`✅ Scraped Latest Diesel: ₱${latestDiesel}`);

        // 3. Update ALL stations in the NCR region automatically
        const { error } = await supabase
            .from('stations')
            .update({
                diesel_price: latestDiesel,
                updated_at: new Date().toISOString()
            })
            .eq('region', 'NCR');

        if (error) throw error;

        console.log("🎉 Database updated! All users will see the change in real-time.");

    } catch (error) {
        console.error("❌ Automation Failed:", error.message);
    }
}

syncFuelPrices();