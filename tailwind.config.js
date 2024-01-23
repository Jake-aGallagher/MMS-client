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
        },
        plugins: [],
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },
};
