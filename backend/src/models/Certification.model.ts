import { Schema, model, Document } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  organization: string;
  date: string;
  category: string;
  credentialId: string;
  skills: string[];
  description: string;
  link: string | null;
  order: number;
}

const certificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, default: '' },
    credentialId: { type: String, default: '' },
    skills: { type: [String], default: [] },
    description: { type: String, default: '' },
    link: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Certification = model<ICertification>(
  'Certification',
  certificationSchema
);