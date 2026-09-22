import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: 'ai_ml' | 'web';
  isProminent: boolean;
  tag: string;
  description: string;
  technologies: string[];
  image: string;
  demo: string;
  github: string;
  keyFeatures: string[];
  order: number;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['ai_ml', 'web'], required: true },
    isProminent: { type: Boolean, default: false },
    tag: { type: String, default: '' },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    image: { type: String, default: '' },
    demo: { type: String, default: '' },
    github: { type: String, default: '' },
    keyFeatures: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ category: 1 });
projectSchema.index({ isProminent: 1 });

export const Project = model<IProject>('Project', projectSchema);