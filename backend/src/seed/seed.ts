import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { logger } from '../config/logger';

import { User } from '../models/User.model';
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
} from './data';

const seed = async (): Promise<void> => {
  try {
    logger.info('Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URI);
    logger.success('Connected');

    // Clear existing data
    logger.info('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Education.deleteMany({}),
      Journey.deleteMany({}),
      SkillCategory.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Certification.deleteMany({}),
      Achievement.deleteMany({}),
    ]);

    // Create admin user
    logger.info('Creating admin user...');
    const adminEmail = env.ADMIN_EMAIL || 'anu705545@gmail.com';
    const adminPassword = env.ADMIN_PASSWORD || 'ChangeMe@123';
    const adminName = env.ADMIN_NAME || 'Anu Kumari Shah';

    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    logger.success(`Admin created: ${adminEmail}`);
    logger.info(`   Login password: ${adminPassword}`);

    // Profile
    logger.info('Seeding profile...');
    await Profile.create(profileData);

    // Education
    logger.info('Seeding education...');
    await Education.insertMany(educationData);

    // Journey
    logger.info('Seeding journey...');
    await Journey.insertMany(journeyData);

    // Skills
    logger.info('Seeding skills...');
    await SkillCategory.insertMany(skillsData);

    // Projects
    logger.info('Seeding projects...');
    await Project.insertMany(projectsData);

    // Experience
    logger.info('Seeding experience...');
    await Experience.insertMany(experienceData);

    // Certifications
    logger.info('Seeding certifications...');
    await Certification.insertMany(certificationsData);

    // Achievements
    logger.info('Seeding achievements...');
    await Achievement.insertMany(achievementsData);

    logger.success('🎉 Seeding complete!');

    // Summary
    const counts = {
      Users: await User.countDocuments(),
      Profile: await Profile.countDocuments(),
      Education: await Education.countDocuments(),
      Journey: await Journey.countDocuments(),
      Skills: await SkillCategory.countDocuments(),
      Projects: await Project.countDocuments(),
      Experience: await Experience.countDocuments(),
      Certifications: await Certification.countDocuments(),
      Achievements: await Achievement.countDocuments(),
    };

    logger.info('Final counts:');
    Object.entries(counts).forEach(([key, count]) => {
      logger.info(`  ${key}: ${count}`);
    });

    logger.info('');
    logger.success('Admin login credentials:');
    logger.info(`  Email: ${adminEmail}`);
    logger.info(`  Password: ${adminPassword}`);

    await mongoose.disconnect();
    logger.success('Disconnected. Done!');
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();