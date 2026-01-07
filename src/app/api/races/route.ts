import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, date, location, distance, difficulty, terrain, description, imageUrl, raceUrl } = body;

        const newRace = new Race({
            name,
            date: new Date(date),
            location,
            distance,
            difficulty,
            terrain,
            description,
            imageUrl,
            raceUrl,
        });

        await newRace.save();

        return NextResponse.json({ success: true, data: newRace }, { status: 201 });
    } catch (error) {
        console.error('Error creating race:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create race' },
            { status: 500 }
        );
    }
}
