import type { Config } from "next";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0056b3',  // Biru terang (Tombol Cari Properti)
        darkblue: '#0a2540', // Biru gelap (Background Hero)
        secondary: '#d97706', // Emas/Oranye (Aksen)
        dark: '#0f172a',     // Hitam kebiruan (Footer)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)' },
          '50%': { boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;