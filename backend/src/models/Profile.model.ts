import { Schema, model, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  resume: string;
  heroHighlights: string[];
  currentlyExploring: string[];
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: '' },
    email: { type: String, required: true },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    resume: { type: String, default: '' },
    heroHighlights: { type: [String], default: [] },
    currentlyExploring: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Profile = model<IProfile>('Profile', profileSchema);