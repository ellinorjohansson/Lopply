import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/common/**/*.{js,ts,jsx,tsx}',

    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)', // background 
                secondary: 'var(--secondary)', // secondary background 
                primaryaccent: 'var(--primaryaccent)', // accent/text 
                secondaryaccent: 'var(--secondaryaccent)', // accent/text 
                success: 'var(--success)',
                error: 'var(--error)',
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['2.5rem', { lineHeight: '1.75rem' }],
                'xl': ['3.5rem', { lineHeight: '1.75rem' }],
                '2xl': ['4.5rem', { lineHeight: '2rem' }],
                '3xl': ['6rem', { lineHeight: '2.25rem' }],
            },
            fontFamily: {
                sans: ['--font-instrument-sans', 'sans-serif'],
                display: ['--font-kavoon', 'serif'],
            }
        },
    },
};

export default config;
