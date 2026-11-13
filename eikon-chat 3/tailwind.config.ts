import type { Config } from "tailwindcss";

/**
 * Eikon Chat — Tailwind config
 * Cores vêm de CSS variables (RGB "r g b") definidas em app/globals.css.
 * Tema claro = Direção A (Precisão) · Tema escuro = Direção C (Preto e branco).
 * Nomes compatíveis com shadcn/ui (background, foreground, primary, muted, …).
 */
const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        background: c("background"),
        foreground: c("foreground"),
        panel: c("panel"),
        card: { DEFAULT: c("card"), foreground: c("card-foreground") },
        popover: { DEFAULT: c("card"), foreground: c("card-foreground") },
        primary: { DEFAULT: c("primary"), hover: c("primary-hover"), foreground: c("primary-foreground") },
        secondary: { DEFAULT: c("secondary"), foreground: c("secondary-foreground") },
        muted: { DEFAULT: c("muted"), foreground: c("muted-foreground") },
        subtle: c("subtle-foreground"),
        accent: { DEFAULT: c("accent"), foreground: c("accent-foreground"), ring: c("accent-ring") },
        destructive: { DEFAULT: c("danger"), foreground: c("primary-foreground") },
        border: c("border"),
        input: c("input"),
        ring: c("ring"),
        link: c("link"),
        spotlight: { DEFAULT: c("spotlight"), foreground: c("spotlight-foreground"), muted: c("spotlight-muted"), border: c("spotlight-border") },
        avatar: { DEFAULT: c("avatar"), foreground: c("avatar-foreground") },
        success: { DEFAULT: c("success"), bg: c("success-bg"), fg: c("success-fg") },
        warning: { DEFAULT: c("warning"), bg: c("warning-bg"), fg: c("warning-fg") },
        danger: { DEFAULT: c("danger"), bg: c("danger-bg"), fg: c("danger-fg") },
        info: { DEFAULT: c("info"), bg: c("info-bg"), fg: c("info-fg") },
        chart: { 1: c("chart-1"), 2: c("chart-2"), 3: c("chart-3"), 4: c("chart-4"), 5: c("chart-5"), peak: c("chart-peak") },
        neutral: {
          50: c("n-50"), 100: c("n-100"), 200: c("n-200"), 300: c("n-300"), 400: c("n-400"),
          500: c("n-500"), 600: c("n-600"), 700: c("n-700"), 800: c("n-800"), 900: c("n-900"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        h1: ["2rem", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
        h2: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h3: ["1rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h4: ["0.875rem", { lineHeight: "1.4" }],
        body: ["0.875rem", { lineHeight: "1.375rem" }],
        caption: ["0.75rem", { lineHeight: "1.125rem" }],
        kpi: ["1.875rem", { lineHeight: "1", letterSpacing: "-0.035em" }],
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)", xl: "calc(var(--radius) + 4px)" },
      boxShadow: {
        e1: "var(--shadow-e1)",
        e2: "var(--shadow-e2)",
        e3: "var(--shadow-e3)",
        brand: "var(--shadow-brand)",
      },
      transitionTimingFunction: { out: "cubic-bezier(.22,1,.36,1)" },
      transitionDuration: { fast: "150ms", base: "200ms", slow: "300ms" },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        ping2: { "75%,100%": { transform: "scale(2.6)", opacity: "0" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "none" } },
        typing: { "0%,80%,100%": { opacity: ".3", transform: "translateY(0)" }, "40%": { opacity: "1", transform: "translateY(-2px)" } },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        ping2: "ping2 2s cubic-bezier(0,0,.2,1) infinite",
        "fade-up": "fade-up .3s cubic-bezier(.22,1,.36,1) both",
        typing: "typing 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
