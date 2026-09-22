import { Schema, model, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  description: string;
  order: number;
}

const educationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    cgpa: { type: String, default: '' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = model<IEducation>('Education', educationSchema);