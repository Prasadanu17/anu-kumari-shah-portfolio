import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';
import { setDbConnectedState } from '../services/dataStore';
import { Profile } from '../models/Profile.model';
import { Education } from '../models/Education.model';
import { Journey } from '../models/Journey.model';
import { SkillCategory } from '../models/SkillCategory.model';
import { Project } from '../models/Project.model';
import { Experience } from '../models/Experience.model';
import { Certification } from '../models/Certification.model';
import { Achievement } from '../models/Achievement.model';
import {
  profileData,
  educationData,
  journeyData,
  skillsData,
  projectsData,
  experienceData,
  certificationsData,
  achievementsData,
} from '../seed/data';

export const connectDatabase = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  try {
    // 1. Try Primary MongoDB URI (Atlas or config) with a 4s timeout
    await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 4000 });
    logger.success(`MongoDB connected: ${mongoose.connection.host}`);
    setDbConnectedState(true);
    await autoSeedIfEmpty();
    return;
  } catch (err: any) {
    logger.warn(`Primary MongoDB connection failed: ${err.message || err}`);
  }

  try {
    // 2. Fallback to local MongoDB if available
    logger.info('Attempting local MongoDB connection (mongodb://127.0.0.1:27017/anu_portfolio)...');
    await mongoose.connect('mongodb://127.0.0.1:27017/anu_portfolio', { serverSelectionTimeoutMS: 2000 });
    logger.success(`Local MongoDB connected: ${mongoose.connection.host}`);
    setDbConnectedState(true);
    await autoSeedIfEmpty();
    return;
  } catch (localErr: any) {
    logger.warn('Local MongoDB unavailable. Operating in high-reliability in-memory data mode.');
    setDbConnectedState(false);
  }
};

const autoSeedIfEmpty = async () => {
  try {
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      logger.info('Database is empty. Automatically seeding initial portfolio data...');
      await Profile.create(profileData);
      await Education.insertMany(educationData);
      await Journey.insertMany(journeyData);
      await SkillCategory.insertMany(skillsData);
      await Project.insertMany(projectsData);
      await Experience.insertMany(experienceData);
      await Certification.insertMany(certificationsData);
      await Achievement.insertMany(achievementsData);
      logger.success('Auto-seeding complete!');
    }
  } catch (e) {
    logger.error('Auto-seed check error:', e);
  }
};