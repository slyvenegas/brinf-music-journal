// tailwind.config.ts
import type { Config } from "tailwindcss"

const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  // ... (otras propiedades como darkMode, content, etc. no cambian)
  theme: {
    container: {
      // ... (no cambia)
    },
    extend: {
      // --- AÑADE ESTA SECCIÓN ---
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-lora)", ...fontFamily.serif],
      },
      // --- FIN DE LA SECCIÓN A AÑADIR ---
      keyframes: {
        // ... (el resto no cambia)
      },
      animation: {
        // ... (el resto no cambia)
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config