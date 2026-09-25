import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getProfileApi,
  getEducationApi,
  getJourneyApi,
  getSkillsApi,
  getProjectsApi,
  getExperienceApi,
  getCertificationsApi,
  getAchievementsApi,
  submitContactForm,
} from '../services/api';
import {
  personalInfo as defaultPersonalInfo,
  heroHighlights as defaultHeroHighlights,
  education as defaultEducation,
  journeyTimeline as defaultJourneyTimeline,
  skillsCategorized as defaultSkillsCategorized,
  projects as defaultProjects,
  certifications as defaultCertifications,
  currentlyExploring as defaultCurrentlyExploring,
  experience as defaultExperience,
  achievements as defaultAchievements,
} from '../utils/constants';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [heroHighlights, setHeroHighlights] = useState(defaultHeroHighlights);
  const [currentlyExploring, setCurrentlyExploring] = useState(defaultCurrentlyExploring);
  const [education, setEducation] = useState(defaultEducation);
  const [journeyTimeline, setJourneyTimeline] = useState(defaultJourneyTimeline);
  const [skillsCategorized, setSkillsCategorized] = useState(defaultSkillsCategorized);
  const [projects, setProjects] = useState(defaultProjects);
  const [experience, setExperience] = useState(defaultExperience);
  const [certifications, setCertifications] = useState(defaultCertifications);
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        profileRes,
        eduRes,
        journeyRes,
        skillsRes,
        projectsRes,
        expRes,
        certRes,
        achRes,
      ] = await Promise.all([
        getProfileApi(),
        getEducationApi(),
        getJourneyApi(),
        getSkillsApi(),
        getProjectsApi(),
        getExperienceApi(),
        getCertificationsApi(),
        getAchievementsApi(),
      ]);

      if (profileRes) {
        setPersonalInfo(profileRes.personalInfo);
        setHeroHighlights(profileRes.heroHighlights);
        setCurrentlyExploring(profileRes.currentlyExploring);
      }
      if (eduRes) setEducation(eduRes);
      if (journeyRes) setJourneyTimeline(journeyRes);
      if (skillsRes) setSkillsCategorized(skillsRes);
      if (projectsRes) setProjects(projectsRes);
      if (expRes) setExperience(expRes);
      if (certRes) setCertifications(certRes);
      if (achRes) setAchievements(achRes);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        heroHighlights,
        currentlyExploring,
        education,
        journeyTimeline,
        skillsCategorized,
        projects,
        experience,
        certifications,
        achievements,
        loading,
        refreshData: loadData,
        submitContactForm,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    return {
      personalInfo: defaultPersonalInfo,
      heroHighlights: defaultHeroHighlights,
      currentlyExploring: defaultCurrentlyExploring,
      education: defaultEducation,
      journeyTimeline: defaultJourneyTimeline,
      skillsCategorized: defaultSkillsCategorized,
      projects: defaultProjects,
      experience: defaultExperience,
      certifications: defaultCertifications,
      achievements: defaultAchievements,
      loading: false,
      refreshData: () => {},
      submitContactForm,
    };
  }
  return context;
};
