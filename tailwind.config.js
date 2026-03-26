/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'gas-dark': '#0F172A', // Deep background
                'gas-card': '#1E293B', // Lighter card background
                'gas-orange': '#F97316', // Primary accent
            }
        },
    },
    plugins: [],
}