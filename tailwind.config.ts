import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            },
            fontFamily: {
                sans: ['--font-instrument-sans', 'sans-serif'],
                display: ['--font-kavoon', 'serif'],
            }
        },
    },
};

export default config;
