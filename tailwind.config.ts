import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
                heading: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                background: "rgb(var(--background-rgb))",
                foreground: "rgb(var(--foreground-rgb))",
                brand: {
                    terracotta: "#cb997e",
                    beige: "#ddbea9",
                    cream: "#ffe8d6",
                    sage: "#b7b7a4",
                    olive: "#a5a58d",
                    forest: "#6b705c",
                }
            },
        },
    },
    plugins: [],
};
export default config;
