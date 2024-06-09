// @ts-check

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        /** 境界線の色 */
        border: 'hsl(217, 14%, 81%)',
        /** Input 系要素の境界線 */
        input: 'hsl(214, 31%, 91%)',
        /** 標準の背景色 */
        background: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(222, 47%, 11%)',
        },
        /** 無効化された button 等 */
        muted: {
          DEFAULT: 'hsl(210, 40%, 96%)',
          foreground: 'hsl(215, 16%, 46%)',
        },
        /** カード要素の背景色 */
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(222, 47%, 11%)',
        },
        primary: {
          DEFAULT: 'hsl(222, 47%, 11%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(210, 40%, 96%)',
          foreground: 'hsl(222, 47%, 11%)',
        },
        warning: {
          DEFAULT: 'hsl(32, 100%, 50%)',
          foreground: 'hsl(32, 100%, 90%)',
        },
        error: {
          DEFAULT: 'hsl(360, 100%, 50%)',
          foreground: 'hsl(0, 100%, 90%)',
        },
      },
    },
  },
  plugins: [],
};
