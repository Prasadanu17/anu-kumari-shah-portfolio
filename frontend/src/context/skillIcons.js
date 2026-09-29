import React from 'react';
import { 
  SiPython, SiNumpy, SiPandas, SiScikitlearn, SiPytorch, SiTensorflow, SiKeras, 
  SiReact, SiJavascript, SiNodedotjs, SiFastapi, SiTailwindcss, SiHtml5, SiCss, 
  SiBootstrap, SiPhp, SiCodeigniter, SiMysql, SiMongodb, SiGit, SiGithub, 
  SiJupyter, SiGooglecolab 
} from 'react-icons/si';
import { FaBrain, FaEye, FaChartBar, FaCode, FaPalette } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const e = React.createElement;

const iconsMap = {
  'Python': { icon: e(SiPython), color: '#3776AB' },
  'NumPy': { icon: e(SiNumpy), color: '#013243' },
  'Pandas': { icon: e(SiPandas), color: '#150458' },
  'scikit-learn': { icon: e(SiScikitlearn), color: '#F7931E' },
  'Scikit-Learn': { icon: e(SiScikitlearn), color: '#F7931E' },
  'PyTorch': { icon: e(SiPytorch), color: '#EE4C2C' },
  'TensorFlow/Keras': { icon: e(SiTensorflow), color: '#FF6F00' },
  'TensorFlow': { icon: e(SiTensorflow), color: '#FF6F00' },
  'Keras': { icon: e(SiKeras), color: '#D00000' },
  'NLP': { icon: e(FaBrain), color: '#9B59B6' },
  'Deep Learning': { icon: e(FaBrain), color: '#8E44AD' },
  'Computer Vision': { icon: e(FaEye), color: '#3498DB' },
  'EDA': { icon: e(FaChartBar), color: '#E67E22' },
  'Explainable AI': { icon: e(FaBrain), color: '#1ABC9C' },
  'React.js': { icon: e(SiReact), color: '#61DAFB' },
  'React': { icon: e(SiReact), color: '#61DAFB' },
  'JavaScript': { icon: e(SiJavascript), color: '#F7DF1E' },
  'JS': { icon: e(SiJavascript), color: '#F7DF1E' },
  'Node.js': { icon: e(SiNodedotjs), color: '#339933' },
  'Node': { icon: e(SiNodedotjs), color: '#339933' },
  'FastAPI': { icon: e(SiFastapi), color: '#009688' },
  'Tailwind CSS': { icon: e(SiTailwindcss), color: '#06B6D4' },
  'Tailwind': { icon: e(SiTailwindcss), color: '#06B6D4' },
  'HTML': { icon: e(SiHtml5), color: '#E34F26' },
  'HTML5': { icon: e(SiHtml5), color: '#E34F26' },
  'CSS': { icon: e(SiCss), color: '#1572B6' },
  'CSS3': { icon: e(SiCss), color: '#1572B6' },
  'Bootstrap': { icon: e(SiBootstrap), color: '#7952B3' },
  'PHP': { icon: e(SiPhp), color: '#777BB4' },
  'CodeIgniter': { icon: e(SiCodeigniter), color: '#EF4223' },
  'MySQL': { icon: e(SiMysql), color: '#4479A1' },
  'SQL': { icon: e(SiMysql), color: '#4479A1' },
  'MongoDB': { icon: e(SiMongodb), color: '#47A248' },
  'Git': { icon: e(SiGit), color: '#F05032' },
  'GitHub': { icon: e(SiGithub), color: '#ffffff' },
  'VS Code': { icon: e(VscCode), color: '#007ACC' },
  'Jupyter': { icon: e(SiJupyter), color: '#F37626' },
  'Google Colab': { icon: e(SiGooglecolab), color: '#F9AB00' },
  'Canva': { icon: e(FaPalette), color: '#00C4CC' },
};

export const getSkillIcon = (skillName) => {
  if (!skillName) return { icon: e(FaCode), color: '#F4F5F4' };

  if (iconsMap[skillName]) return iconsMap[skillName];

  const trimmed = skillName.trim();
  if (iconsMap[trimmed]) return iconsMap[trimmed];

  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(iconsMap)) {
    if (key.toLowerCase() === lower) {
      return iconsMap[key];
    }
  }

  return { icon: e(FaCode), color: '#F4F5F4' };
};
