/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './lib/components/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: `hsl(var(--background))`,
        primary: {
          DEFAULT: `hsl(var(--primary))`,
          foreground: `hsl(var(--primary-foreground))`,
        },
        secondary: {
          DEFAULT: `hsl(var(--secondary))`,
          foreground: `hsl(var(--secondary-foreground))`,
        },
        muted: {
          DEFAULT: `hsl(var(--muted))`,
          foreground: `hsl(var(--muted-foreground))`,
        },
        foreground: {
          DEFAULT: `hsl(var(--foreground))`,
        },
      },
      // ... any other extensions you need
    },
  },
  plugins: [],
};
