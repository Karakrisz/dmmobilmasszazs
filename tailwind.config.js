/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/models/**/*.ts',
    './app/data/**/*.ts',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // A színek a témából jönnek (app/assets/css/main.css – :root és [data-theme]).
        page: 'rgb(var(--c-page) / <alpha-value>)',
        'page-alt': 'rgb(var(--c-page-alt) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--c-accent-2) / <alpha-value>)',
        cta: 'rgb(var(--c-cta) / <alpha-value>)',
        'cta-hover': 'rgb(var(--c-cta-hover) / <alpha-value>)',
        'cta-ink': 'rgb(var(--c-cta-ink) / <alpha-value>)',
        footer: 'rgb(var(--c-footer) / <alpha-value>)',
        'on-dark': 'rgb(var(--c-on-dark-accent) / <alpha-value>)',
      },
      boxShadow: {
        big: '0px 1px 10px 0px rgba(0, 0, 0, 0.30)',
        medium: '0px 1px 7px 0px rgba(0, 0, 0, 0.20)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
  },
  plugins: [],
}
