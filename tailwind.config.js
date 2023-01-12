/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './navigation/**/*.{js,ts,jsx,tsx}'],
    theme: {
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
