import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Race from '@/models/Race';

export async function GET() {
    try {
        await connectDB();
        const races = await Race.find({}).sort({ date: 1 });

        return NextResponse.json({ success: true, data: races });
    } catch (error) {
        console.error('Error fetching races:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch races' },
            { status: 500 }
        );
    }
}
