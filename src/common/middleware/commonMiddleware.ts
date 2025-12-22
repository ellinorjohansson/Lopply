import { NextResponse } from 'next/server';

export function commonMiddleware() {
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
