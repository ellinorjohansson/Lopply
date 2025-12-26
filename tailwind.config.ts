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
                'xs': ['0.75rem', { lineHeight: '0.5rem' }],
                'sm': ['0.875rem', { lineHeight: '0.5rem' }],
                'base': ['1rem', { lineHeight: '0.5rem' }],
                'lg': ['2.5rem', { lineHeight: '0.5rem' }],
                'xl': ['3.5rem', { lineHeight: '0.5rem' }],
                '2xl': ['4.5rem', { lineHeight: '0.5rem' }],
                '3xl': ['6rem', { lineHeight: '0.5rem' }],
            },
            fontFamily: {
                sans: ['--font-instrument-sans', 'sans-serif'],
                display: ['--font-kavoon', 'serif'],
                logo: ['--font-instrument-serif', 'serif']
            }
        },
    },
};

export default config;
