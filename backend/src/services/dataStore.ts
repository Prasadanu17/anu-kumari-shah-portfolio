import { Profile } from '../models/Profile.model';
import { Education } from '../models/Education.model';
import { Journey } from '../models/Journey.model';
import { SkillCategory } from '../models/SkillCategory.model';
import { Project } from '../models/Project.model';
import { Experience } from '../models/Experience.model';
import { Certification } from '../models/Certification.model';
import { Achievement } from '../models/Achievement.model';
import { ContactMessage } from '../models/ContactMessage.model';
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

let isDbConnected = false;

export const setDbConnectedState = (state: boolean) => {
  isDbConnected = state;
};

export const getDbConnectedState = () => isDbConnected;

// In-Memory storage fallback initialized with rich portfolio data
const inMemoryStore = {
  profile: { ...profileData, _id: 'mem_profile_1' },
  education: educationData.map((item, idx) => ({ ...item, _id: `mem_edu_${idx + 1}` })),
  journey: journeyData.map((item, idx) => ({ ...item, _id: `mem_journey_${idx + 1}` })),
  skills: skillsData.map((item, idx) => ({ ...item, _id: `mem_skill_${idx + 1}` })),
  projects: projectsData.map((item, idx) => ({ ...item, _id: `mem_project_${idx + 1}` })),
  experience: experienceData.map((item, idx) => ({ ...item, _id: `mem_exp_${idx + 1}` })),
  certifications: certificationsData.map((item, idx) => ({ ...item, _id: `mem_cert_${idx + 1}` })),
  achievements: achievementsData.map((item, idx) => ({ ...item, _id: `mem_ach_${idx + 1}` })),
  contactMessages: [] as any[],
};

// Profile
export const getProfileStore = async () => {
  if (isDbConnected) {
    let p = await Profile.findOne();
    if (!p) {
      p = await Profile.create(profileData);
    }
    return p;
  }
  return inMemoryStore.profile;
};

export const updateProfileStore = async (data: any) => {
  if (isDbConnected) {
    let p = await Profile.findOne();
    if (p) {
      return await Profile.findByIdAndUpdate(p._id, data, { new: true, runValidators: true });
    }
    return await Profile.create(data);
  }
  inMemoryStore.profile = { ...inMemoryStore.profile, ...data };
  return inMemoryStore.profile;
};

// Education
export const getEducationStore = async () => {
  if (isDbConnected) {
    return await Education.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.education;
};

// Journey
export const getJourneyStore = async () => {
  if (isDbConnected) {
    return await Journey.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.journey;
};

// Skills
export const getSkillsStore = async () => {
  if (isDbConnected) {
    return await SkillCategory.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.skills;
};

// Projects
export const getProjectsStore = async () => {
  if (isDbConnected) {
    return await Project.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.projects;
};

// Experience
export const getExperienceStore = async () => {
  if (isDbConnected) {
    return await Experience.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.experience;
};

// Certifications
export const getCertificationsStore = async () => {
  if (isDbConnected) {
    return await Certification.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.certifications;
};

// Achievements
export const getAchievementsStore = async () => {
  if (isDbConnected) {
    return await Achievement.find().sort({ order: 1, createdAt: 1 });
  }
  return inMemoryStore.achievements;
};

// Contact
export const createContactMessageStore = async (data: { name: string; email: string; message: string }) => {
  if (isDbConnected) {
    return await ContactMessage.create(data);
  }
  const msg = {
    _id: `mem_msg_${Date.now()}`,
    ...data,
    read: false,
    createdAt: new Date().toISOString(),
  };
  inMemoryStore.contactMessages.unshift(msg);
  return msg;
};

export const getContactMessagesStore = async () => {
  if (isDbConnected) {
    return await ContactMessage.find().sort({ createdAt: -1 });
  }
  return inMemoryStore.contactMessages;
};
