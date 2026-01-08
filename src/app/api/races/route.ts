import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Race from '@/models/Race';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'approved';
        const races = await Race.find({ status }).sort({ date: 1 });

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
            status: 'pending',
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

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { success: false, error: 'ID and status are required' },
                { status: 400 }
            );
        }

        const updatedRace = await Race.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedRace) {
            return NextResponse.json(
                { success: false, error: 'Race not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedRace });
    } catch (error) {
        console.error('Error updating race:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update race' },
            { status: 500 }
        );
    }
}
