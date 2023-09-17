/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './navigation/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            text: '#000000',
            background: '#ffffff',
            primary: '#0060c4',
            secondary: '#ededed',
            accent: '#007cff',
            black: '#000000',
            green: '#22c55e',
            yellow: '#facc15',
            red: '#dc2626',
        },
        extend: {
            gridTemplateRows: {
                // Simple 12 row grid
                12: 'repeat(12, minmax(0, 1fr))',
            },
            gridRowStart: {
                4: '4',
            },
            gridRowEnd: {
                13: '13',
            },
        },
        plugins: [],
    },
};
