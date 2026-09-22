import { Schema, model, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
  projectsMentioned: string[];
  order: number;
}

const experienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: '' },
    period: { type: String, required: true },
    type: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    projectsMentioned: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = model<IExperience>('Experience', experienceSchema);