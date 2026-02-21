/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // اینجا دیگه نیازی به تعریف رنگ‌ها نیست چون از کلاس‌های سفارشی استفاده می‌کنیم
      },
      backgroundColor: {
        primary: 'rgb(var(--color-background-primary))',
        secondary: 'rgb(var(--color-background-secondary))',
        hover: 'rgb(var(--color-background-hover))',
      },
      textColor: {
        primary: 'rgb(var(--color-text-primary))',
        secondary: 'rgb(var(--color-text-secondary))',
        muted: 'rgb(var(--color-text-muted))',
      },
      borderColor: {
        default: 'rgb(var(--color-border))',
      },
    },
  },
  plugins: [],
}