/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './navigation/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            text: '#000000',
            background: '#ffffff',
            primary: '#0060c4',
            secondary: '#ededed',
            secAlt: '#f5f5f5',
            accent: '#007cff',
            black: '#000000',
            green: '#22c55e',
            yellow: '#facc15',
            red: '#dc2626',
        },
        extend: {
            borderWidth: {
                1: '1px',
            },
            animation: {
                slide: 'slide 0.1s forwards',
                slideSlow: 'slide 0.2s forwards',
              },
              keyframes: {
                slide: {
                  '0%': { transform: 'scaleX(0)', opacity: '0' },
                  '100%': { transform: 'scaleX(1)', opacity: '1' },
                },
              },
        },
        plugins: [],
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },
};
