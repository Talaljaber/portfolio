/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        paper: 'var(--paper)',
        'paper-verso': 'var(--paper-verso)',
        ink: 'var(--ink)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        gold: 'var(--gold)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        primary: 'var(--accent)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        book: ['"EB Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        turn: 'cubic-bezier(0.42, 0.02, 0.16, 1)',
      },
      screens: {
        book: '1024px',
      },
    },
  },
  plugins: [],
}
