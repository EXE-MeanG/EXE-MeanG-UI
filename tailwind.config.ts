import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        "main-background": "var(--background-primary)",
      },
      backgroundColor: {
        primary: "var(--primary-background)",
        "main-background": "var(--background-primary)",
      },
      backgroundImage: {
        "hero-pattern": "url('../assets/backgrounds/background-main.png')",
        "example-pattern":
          "url('../assets/backgrounds/background-example.png')",
        "primary-gradient": "var(--primary-gradient)",
        "secondary-gradient": "var(--secondary-gradient)",
        "disc-gradient": "var(--linear-disc)",
        "custom-gradient":
          "linear-gradient(90deg, rgba(24,45,51,1) 0%, rgba(182,203,210,1) 15%, rgba(167,186,193,1) 34%, rgba(255,255,255,1) 52%, rgba(164,183,190,1) 69%, rgba(218,241,248,1) 85%, rgba(153,173,180,1) 100%)",
      },
      keyframes: {
        diagonalMove: {
          "0%": {
            transform: "translate(-100%, 100%) rotate(45deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "40%": {
            transform: "translate(150%, -150%) rotate(45deg)",
            opacity: "1",
          },
          "41%": { opacity: "0" },
          "100%": {
            transform: "translate(150%, -150%) rotate(45deg)",
            opacity: "0",
          },
        },
        sparkle: {
          "0%": { opacity: "0", transform: "scale(0.5) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.3) rotate(20deg)" },
          "100%": { opacity: "0", transform: "scale(0.5) rotate(0deg)" },
        },
      },
      animation: {
        diagonalMove: "diagonalMove 4s linear infinite",
        sparkle: "sparkle 4s ease forwards infinite", // Đảm bảo animation sparkle được thêm vào
      },
    },
  },
  plugins: [],
};

export default config;
