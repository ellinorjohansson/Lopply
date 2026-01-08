import mongoose, { Schema, Model } from 'mongoose';

export interface IRace {
	_id?: string;
	name: string;
	date: Date;
	location: string;
	distance: string;
	difficulty: string;
	terrain: string;
	description?: string;
	imageUrl: string;
	raceUrl: string;
	status: 'pending' | 'approved' | 'rejected';
}

const RaceSchema = new Schema<IRace>(
	{
		name: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		distance: {
			type: String,
			required: true,
		},
		difficulty: {
			type: String,
			required: true,
		},
		terrain: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		raceUrl: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
	}
);

const Race: Model<IRace> = mongoose.models.Race || mongoose.model<IRace>('Race', RaceSchema);

export default Race;
