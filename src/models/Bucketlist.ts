import mongoose, { Schema, Model } from 'mongoose';

export interface IBucketlist {
  _id?: string;
  userId: string;
  raceId: string;
  createdAt?: Date;
}

const BucketlistSchema = new Schema<IBucketlist>(
  {
    userId: {
      type: String,
      required: true,
    },
    raceId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BucketlistSchema.index({ userId: 1, raceId: 1 }, { unique: true });

const Bucketlist: Model<IBucketlist> = mongoose.models.Bucketlist || mongoose.model<IBucketlist>('Bucketlist', BucketlistSchema);

export default Bucketlist;
