/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          light: 'rgb(var(--accent-light) / <alpha-value>)',
          pale: 'rgb(var(--accent-pale) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          2: 'rgb(var(--surface-2) / <alpha-value>)',
          3: 'rgb(var(--surface-3) / <alpha-value>)',
          4: 'rgb(var(--surface-4) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          2: 'rgb(var(--ink-2) / <alpha-value>)',
          3: 'rgb(var(--ink-3) / <alpha-value>)',
        },
      },
      borderColor: {
        DEFAULT: 'rgb(var(--border-soft) / <alpha-value>)',
        strong: 'rgb(var(--border-strong) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
