import { Schema, model, Document } from 'mongoose';

export interface ISkillCategory extends Document {
  category: string;
  description: string;
  skills: string[];
  order: number;
}

const skillCategorySchema = new Schema<ISkillCategory>(
  {
    category: { type: String, required: true },
    description: { type: String, default: '' },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SkillCategory = model<ISkillCategory>(
  'SkillCategory',
  skillCategorySchema
);