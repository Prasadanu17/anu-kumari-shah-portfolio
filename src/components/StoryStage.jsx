import React from 'react';
import HomeStory from './story/HomeStory';
import AboutStory from './story/AboutStory';
import ExperienceStory from './story/ExperienceStory';
import SkillsStory from './story/SkillsStory';
import ProjectsStory from './story/ProjectsStory';
import ContactStory from './story/ContactStory';

const StoryStage = () => {
  return (
    <div id="story-scroll-container" className="relative w-full text-[#F4F4F6]">
      <HomeStory />
      <AboutStory />
      <ExperienceStory />
      <SkillsStory />
      <ProjectsStory />
      <ContactStory />
    </div>
  );
};

export default StoryStage;
