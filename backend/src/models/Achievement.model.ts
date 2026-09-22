import { Schema, model, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  category: string;
  description: string;
  icon: 'award' | 'code' | 'heart';
  order: number;
}

const achievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    category: { type: String, default: '' },
    description: { type: String, required: true },
    icon: { type: String, enum: ['award', 'code', 'heart'], default: 'award' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Achievement = model<IAchievement>(
  'Achievement',
  achievementSchema
);