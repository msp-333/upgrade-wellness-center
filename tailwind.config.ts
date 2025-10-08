import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {                // primary button / highlights
          500: "#93BEA4",       // sage
          600: "#7EAB91",       // hover
        },
        mint: { 500: "#B2D4AB" },
        lavender: {
          400: "#DED7FA",       // light lavender
          500: "#C2A0E8",       // main lavender
          600: "#B792E4",       // hover
        },
        surface: { DEFAULT: "#EEF5E1" }, // page background
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 10px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: { xl2: "1.25rem" },

      // Background images (both variants available)
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(900px 400px at 0% -10%, rgba(147,190,164,0.18), transparent 60%), radial-gradient(700px 300px at 100% -10%, rgba(194,160,232,0.20), transparent 60%)",
        "hero-radial":
          "radial-gradient(1200px 520px at 0% -20%, rgba(147,190,164,0.18), transparent 60%), radial-gradient(900px 400px at 100% -20%, rgba(194,160,232,0.30), transparent 60%)",
      },

      // Animations
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        drift: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "100%": { transform: "rotate(360deg) scale(1.03)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "float-slow": "float 18s ease-in-out infinite",
        "float-slower": "float 26s ease-in-out infinite",
        "drift-1": "drift 40s linear infinite",
        "drift-2": "drift 60s linear infinite reverse",
        "pulse-soft": "pulse-soft 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
