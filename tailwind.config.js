/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-raised': 'var(--bg-raised)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-glow': 'var(--accent-glow)',
        cyan: 'var(--cyan)',
      },
      fontFamily: {
        ui: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // The lab has no rounded corners; 2px is the ceiling.
        DEFAULT: '2px',
        sm: '1px',
        md: '2px',
        lg: '2px',
      },
      screens: {
        lab: '1024px',
      },
    },
  },
  plugins: [],
}
