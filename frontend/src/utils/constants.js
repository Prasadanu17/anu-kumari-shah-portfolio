export const personalInfo = {
  name: "Anu Kumari Shah",
  title: "AI/ML Engineer × Full-Stack Developer",
  tagline: "I build intelligent systems and modern web experiences using AI, machine learning, and full-stack technologies.",
  email: "anu705545@gmail.com",
  location: "Gangtok, Sikkim",
  bio: "MCA student at ICFAI University, Sikkim with a deep passion for Artificial Intelligence, Machine Learning, Deep Learning, and modern full-stack web development. Focused on creating intelligent, practical systems that bridge research and real-world software applications.",
  github: "https://github.com/Prasadanu17",
  linkedin: "https://linkedin.com/in/anu-shah-102594348",
  resume: "/assets/Anu Kumari Shah-Resume.pdf"
};

export const heroHighlights = [
  "MCA Student",
  "AI/ML Learner",
  "Web Developer",
  "Problem Solver"
];

export const education = [
  {
    id: 1,
    degree: "MCA — ICFAI University, Sikkim",
    institution: "ICFAI University, Sikkim",
    period: "2025 – 2027",
    cgpa: "10.00",
    description: "Deepening knowledge in Artificial Intelligence, Machine Learning, Deep Learning, and Advanced Software Architecture."
  },
  {
    id: 2,
    degree: "BCA — SRM University, Sikkim",
    institution: "SRM University, Sikkim",
    period: "2022 – 2025",
    cgpa: "8.16",
    description: "Solid foundation in Computer Science fundamentals, Data Structures, Web Engineering, and Database Systems."
  }
];

export const journeyTimeline = [
  {
    id: 1,
    title: "BCA",
    subtitle: "SRM University, Sikkim",
    period: "2022 – 2025",
    description: "Built core computer science foundations in data structures, web development, and relational databases."
  },
  {
    id: 2,
    title: "Web Development Internship",
    subtitle: "Groveus Informatics Pvt. Ltd.",
    period: "March 2025 – May 2025",
    description: "Gained hands-on full-stack experience developing real client applications using PHP, CodeIgniter, MySQL, and Bootstrap."
  },
  {
    id: 3,
    title: "Part-Time Web Developer",
    subtitle: "Shield Tech Infosec Solutions",
    period: "2026 – Present",
    description: "Developed modern dynamic web applications using React.js and Tailwind CSS for client projects."
  },
  {
    id: 4,
    title: "MCA",
    subtitle: "ICFAI University, Sikkim",
    period: "2025 – 2027",
    description: "Advanced post-graduate studies with 10.00 CGPA focus on AI, ML, Deep Learning, and System Design."
  },
  {
    id: 5,
    title: "AI/ML + Full-Stack Development",
    subtitle: "Intelligent Systems & Applications",
    period: "Present & Future",
    description: "Combining machine learning models with modern full-stack engineering to build impactful AI applications."
  }
];

export const skillsCategorized = [
  {
    category: "AI / MACHINE LEARNING",
    description: "Algorithms, neural networks, data processing, and interpretability",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "PyTorch",
      "TensorFlow/Keras",
      "NLP",
      "Deep Learning",
      "Computer Vision",
      "EDA",
      "Explainable AI"
    ]
  },
  {
    category: "FULL-STACK DEVELOPMENT",
    description: "Modern frontend frameworks, server runtimes, and web APIs",
    skills: [
      "React.js",
      "JavaScript",
      "Node.js",
      "FastAPI",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Bootstrap",
      "PHP",
      "CodeIgniter"
    ]
  },
  {
    category: "DATABASES & TOOLS",
    description: "Data storage systems, version control, and development environments",
    skills: [
      "MySQL",
      "MongoDB",
      "Git",
      "GitHub",
      "VS Code",
      "Jupyter",
      "Google Colab",
      "Canva",
      "phpMyAdmin"
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "AI Resume Analyzer & Resume Builder",
    category: "ai_ml",
    isProminent: true,
    tag: "FEATURED AI PROJECT",
    description: "An intelligent NLP application that evaluates resumes against job descriptions, computes ATS suitability scores, extracts technical skills, identifies employment gaps, and generates interview questions with downloadable PDF reports.",
    technologies: ["Python", "Streamlit", "SBERT", "spaCy", "scikit-learn", "NLP", "Matplotlib", "NetworkX"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    demo: "https://lnkd.in/gQtcZQzB",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "SBERT resume-JD semantic matching & ATS scoring",
      "Automated NLP skill extraction & skill visualization",
      "Employment gap & experience continuity analysis",
      "Custom interview question generation & PDF report export"
    ]
  },
  {
    id: 2,
    title: "Heart Disease Prediction System",
    category: "ai_ml",
    isProminent: true,
    tag: "FEATURED ML PROJECT",
    description: "An interactive machine learning system designed to assess cardiovascular disease risk based on clinical health metrics with predictive modeling and real-time Streamlit visualization.",
    technologies: ["Python", "Streamlit", "scikit-learn", "Pandas", "NumPy", "EDA"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    demo: "https://lnkd.in/gcDfsetc",
    github: "https://lnkd.in/g5We5FXK",
    keyFeatures: [
      "Clinical metric preprocessing & data scaling",
      "Machine learning disease classification model",
      "Real-time health risk probability breakdown",
      "Streamlit application interface"
    ]
  },
  {
    id: 3,
    title: "Breast Cancer Classification System",
    category: "ai_ml",
    isProminent: true,
    tag: "DEEP LEARNING PROJECT",
    description: "A deep learning neural network model built with TensorFlow and Keras to classify medical imaging / diagnostic feature data for early breast cancer diagnosis.",
    technologies: ["Python", "TensorFlow", "Keras", "Neural Networks", "scikit-learn", "Pandas"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    demo: "https://github.com/Prasadanu17",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Deep Learning neural network architecture",
      "TensorFlow/Keras model training & evaluation",
      "Precision & recall classification metrics",
      "Medical feature data normalization"
    ]
  },
  {
    id: 4,
    title: "Sikkim Homestay Booking Platform",
    category: "web",
    isProminent: false,
    tag: "FULL-STACK WEB",
    description: "A modern travel and homestay booking platform highlighting authentic homestay experiences across Sikkim with smooth interactive UI transitions.",
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "Framer Motion"],
    image: "/projects/homestay.png",
    demo: "https://home-stay-kappa.vercel.app/",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Scenic property showcase cards & location details",
      "Interactive room availability & booking modal",
      "Fully responsive mobile & desktop UI"
    ]
  },
  {
    id: 5,
    title: "Mahendra Packers & Movers",
    category: "web",
    isProminent: false,
    tag: "CLIENT PROJECT",
    description: "A commercial logistics platform built during web development internship to streamline customer service quotes and contact management.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL", "AJAX"],
    image: "/projects/packers.png",
    demo: "https://mahendrapackersandmovers.com/",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Dynamic quote request form with AJAX submit",
      "MySQL database customer inquiry tracking",
      "Corporate brand layout"
    ]
  },
  {
    id: 6,
    title: "Elite Interior Design Studio",
    category: "web",
    isProminent: false,
    tag: "CLIENT PROJECT",
    description: "A responsive portfolio showcase website engineered for an interior design studio to display luxury design projects and client services.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/projects/interior.png",
    demo: "https://eliteinteriordesignstudio.com/",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Translucent UI glassmorphism elements",
      "Filterable interior portfolio gallery",
      "Consultation scheduling request module"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Deloitte Australia Data Analytics Job Simulation",
    organization: "Forage Virtual Experience",
    date: "February 2026",
    category: "Data Analytics & EDA",
    credentialId: "FORAGE-DEL-2026-8941",
    skills: ["Tableau", "Data Analysis", "EDA", "Daikibo Telemetry Analysis"],
    description: "Completed practical simulation involving telemetry data analysis, interactive dashboard engineering in Tableau, data cleaning pipelines, and executive recommendation summaries.",
    link: "https://theforage.com/"
  },
  {
    id: 2,
    title: "Web Design Competition Certificate",
    organization: "Technical Fest",
    date: "2025",
    category: "Design Competition",
    credentialId: "TF-WD-2025-014",
    skills: ["Web Design", "UI Layout", "Responsive Architecture"],
    description: "Awarded top honor for exceptional responsive web design, spatial grid layout hierarchy, and dynamic frontend UI component craftsmanship.",
    link: null
  },
  {
    id: 3,
    title: "Coding Challenge Certificate",
    organization: "University Code Labs",
    date: "2025",
    category: "Technical Achievement",
    credentialId: "UCL-CC-2025-089",
    skills: ["Problem Solving", "Algorithms", "Data Structures"],
    description: "Demonstrated advanced algorithmic problem-solving speed, data structure optimizations, and robust code implementations under strict time constraints.",
    link: null
  },
  {
    id: 4,
    title: "Web Development Internship Certificate",
    organization: "Groveus Informatics Pvt. Ltd.",
    date: "2025",
    category: "Professional Internship",
    credentialId: "GROV-INT-2025-042",
    skills: ["PHP", "CodeIgniter", "MySQL", "Full-Stack Web Dev"],
    description: "Successfully built production web applications, client backend APIs, and dynamic database schemas during intensive industry internship.",
    link: null
  }
];

export const currentlyExploring = [
  "Deep Learning",
  "MLOps",
  "NLP",
  "Computer Vision",
  "LLMs",
  "AI Agents"
];

export const experience = [
  {
    id: 1,
    title: "Part-Time Web Developer",
    company: "Shield Tech Infosec Solutions",
    location: "Sikkim",
    period: "2026 – Present",
    type: "PART-TIME",
    highlights: [
      "Developing modern responsive frontend UI using React.js and Tailwind CSS",
      "Building backend services and dynamic web features for client projects",
      "Ensuring clean architecture, mobile optimization, and secure web practices",
      "Engineered client websites including Priansu website and Secretna Hotel"
    ],
    technologies: ["React.js", "Tailwind CSS", "Frontend Dev", "Backend Dev", "Dynamic Web Dev", "Client Projects"],
    projectsMentioned: ["Priansu website", "Secretna Hotel"]
  },
  {
    id: 2,
    title: "Web Development Intern",
    company: "Groveus Informatics Pvt. Ltd.",
    location: "Siliguri",
    period: "March 2025 – May 2025",
    type: "INTERNSHIP",
    highlights: [
      "Worked on full-stack web applications for commercial client platforms",
      "Developed frontend layouts using HTML, CSS, Bootstrap, and JavaScript",
      "Built server-side backend features with PHP and CodeIgniter framework",
      "Integrated MySQL database operations via phpMyAdmin and async AJAX requests",
      "Shipped client projects: Mahendra Packers & Movers, Elite Interior Design, Vidhyaa Institute, and Niram Industries"
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "CodeIgniter", "MySQL", "phpMyAdmin", "AJAX"],
    projectsMentioned: ["Mahendra Packers & Movers", "Elite Interior Design", "Vidhyaa Institute", "Niram Industries"]
  }
];

export const achievements = [
  {
    id: 1,
    title: "3rd Place — Web Design Competition",
    category: "DESIGN & UI",
    description: "Awarded 3rd place in an inter-institutional web design competition for UI/UX aesthetic, responsive structure, and functional layout.",
    icon: "award"
  },
  {
    id: 2,
    title: "Runner-Up — Hackathon",
    category: "COMPETITIVE CODING",
    description: "Secured runner-up position in a collaborative hackathon building innovative software solutions under strict time constraints.",
    icon: "code"
  },
  {
    id: 3,
    title: "Volunteering Leadership",
    category: "ACADEMIC & COMMUNITY",
    description: "Active volunteer organizer for university technical events and academic workshops during Graduation (BCA) and Post-Graduation (MCA).",
    icon: "heart"
  }
];


