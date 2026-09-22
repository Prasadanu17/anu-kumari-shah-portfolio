import { Schema, model, Document } from 'mongoose';

export interface IJourney extends Document {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  order: number;
}

const journeySchema = new Schema<IJourney>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    period: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Journey = model<IJourney>('Journey', journeySchema);