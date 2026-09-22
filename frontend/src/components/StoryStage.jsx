import React from 'react';
import HomeStory from './story/HomeStory';
import AboutStory from './story/AboutStory';
import JourneyStory from './story/JourneyStory';
import SkillsStory from './story/SkillsStory';
import ProjectsStory from './story/ProjectsStory';
import ExperienceStory from './story/ExperienceStory';
import CertificationsStory from './story/CertificationsStory';
import AchievementsStory from './story/AchievementsStory';
import ResumeSection from './story/ResumeSection';
import ContactStory from './story/ContactStory';

const StoryStage = () => {
  return (
    <div id="story-scroll-container" className="relative w-full text-[#F4F5F4]">
      <HomeStory />
      <AboutStory />
      <JourneyStory />
      <SkillsStory />
      <ProjectsStory />
      <ExperienceStory />
      <CertificationsStory />
      <AchievementsStory />
      <ResumeSection />
      <ContactStory />
    </div>
  );
};

export default StoryStage;

