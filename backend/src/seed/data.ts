export const profileData = {
  name: 'Anu Kumari Shah',
  title: 'AI/ML Engineer × Full-Stack Developer',
  tagline: 'I build intelligent systems that solve real-world problems.',
  email: 'anu705545@gmail.com',
  location: 'Gangtok, Sikkim',
  bio: 'MCA student passionate about AI/ML and full-stack development. I love building things that make a difference.',
  github: 'https://github.com/anukumarshah',
  linkedin: 'https://linkedin.com/in/anukumarshah',
  resume: '/assets/Anu-Kumari-Shah-Resume.pdf',
  heroHighlights: [
    'MCA Student',
    'AI/ML Learner',
    'Web Developer',
    'Problem Solver',
  ],
  currentlyExploring: [
    'Deep Learning',
    'MLOps',
    'NLP',
    'Computer Vision',
    'System Design',
  ],
};

export const educationData = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Sikkim Manipal Institute of Technology',
    period: '2024 - Present',
    cgpa: 'Pursuing',
    description: 'Specializing in AI/ML and advanced computing.',
    order: 1,
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sikkim University',
    period: '2021 - 2024',
    cgpa: '8.5',
    description: 'Focused on programming fundamentals and web development.',
    order: 2,
  },
];

export const journeyData = [
  {
    title: 'Started MCA',
    subtitle: 'Sikkim Manipal Institute of Technology',
    period: '2024',
    description:
      'Began my Masters in Computer Applications with a focus on AI/ML.',
    order: 1,
  },
  {
    title: 'First AI/ML Project',
    subtitle: 'Self-Learning',
    period: '2024',
    description:
      'Built my first machine learning model and fell in love with AI.',
    order: 2,
  },
  {
    title: 'Web Development Internship',
    subtitle: 'Remote',
    period: '2023',
    description:
      'Worked on real-world projects using React and Node.js.',
    order: 3,
  },
];

export const skillsData = [
  {
    category: 'Frontend',
    description: 'Building responsive and modern user interfaces',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    order: 1,
  },
  {
    category: 'Backend',
    description: 'Server-side development and API design',
    skills: ['Node.js', 'Express', 'Python', 'REST APIs'],
    order: 2,
  },
  {
    category: 'AI/ML',
    description: 'Machine learning and data science',
    skills: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'],
    order: 3,
  },
  {
    category: 'Database',
    description: 'Data storage and management',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
    order: 4,
  },
  {
    category: 'Tools & Others',
    description: 'Development tools and platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'],
    order: 5,
  },
];

export const projectsData = [
  {
    title: 'AI-Powered Resume Analyzer',
    category: 'ai_ml' as const,
    isProminent: true,
    tag: 'AI/ML',
    description:
      'An intelligent system that analyzes resumes and matches them with job descriptions using NLP techniques.',
    technologies: ['Python', 'NLP', 'scikit-learn', 'Flask', 'React'],
    image: '/assets/projects/resume-analyzer.jpg',
    demo: '',
    github: 'https://github.com/anukumarshah/resume-analyzer',
    keyFeatures: [
      'NLP-based text extraction',
      'Job description matching',
      'Skill gap analysis',
      'PDF support',
    ],
    order: 1,
  },
  {
    title: 'Portfolio Website',
    category: 'web' as const,
    isProminent: true,
    tag: 'Web Development',
    description:
      'A modern, responsive portfolio website with smooth animations and clean design.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    image: '/assets/projects/portfolio.jpg',
    demo: '',
    github: 'https://github.com/anukumarshah/portfolio',
    keyFeatures: [
      'Fully responsive',
      'Smooth animations',
      'Dark mode ready',
      'Optimized performance',
    ],
    order: 2,
  },
  {
    title: 'Sentiment Analysis Tool',
    category: 'ai_ml' as const,
    isProminent: false,
    tag: 'NLP',
    description:
      'Analyzes sentiment of text data using machine learning models.',
    technologies: ['Python', 'TensorFlow', 'NLTK'],
    image: '/assets/projects/sentiment.jpg',
    demo: '',
    github: 'https://github.com/anukumarshah/sentiment-analysis',
    keyFeatures: [
      'Real-time analysis',
      'Multi-language support',
      'Confidence scores',
    ],
    order: 3,
  },
];

export const experienceData = [
  {
    title: 'Web Development Intern',
    company: 'Tech Startup',
    location: 'Remote',
    period: 'Jun 2023 - Aug 2023',
    type: 'INTERNSHIP',
    highlights: [
      'Built responsive UI components using React',
      'Integrated REST APIs with frontend',
      'Improved page load time by 40%',
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'REST APIs'],
    projectsMentioned: ['Customer Dashboard'],
    order: 1,
  },
];

export const certificationsData = [
  {
    title: 'Machine Learning Specialization',
    organization: 'Coursera (DeepLearning.AI)',
    date: '2024',
    category: 'AI/ML',
    credentialId: '',
    skills: ['Supervised Learning', 'Neural Networks', 'ML Best Practices'],
    description: 'Comprehensive ML course covering theory and practice.',
    link: null,
    order: 1,
  },
  {
    title: 'Full Stack Web Development',
    organization: 'Udemy',
    date: '2023',
    category: 'Web Development',
    credentialId: '',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: 'Complete MERN stack development bootcamp.',
    link: null,
    order: 2,
  },
];

export const achievementsData = [
  {
    title: 'Hackathon Finalist',
    category: 'Competition',
    description: 'Reached finals in inter-college hackathon 2024.',
    icon: 'award' as const,
    order: 1,
  },
  {
    title: 'Open Source Contributor',
    category: 'Open Source',
    description: 'Contributed to multiple open source projects.',
    icon: 'code' as const,
    order: 2,
  },
];