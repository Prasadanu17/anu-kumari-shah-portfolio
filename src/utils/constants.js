export const projects = [
  {
    id: 1,
    title: "Sikkim Homestay Booking",
    category: "webdevelopment",
    description: "A premium travel and homestay booking platform built with optimized loading and a scenic UI. Features interactive booking widgets and responsive destination cards.",
    technologies: ["React", "Custom CSS", "Framer Motion"],
    image: "/projects/homestay.png",
    demo: "https://home-stay-kappa.vercel.app/",
    keyFeatures: [
      "Optimized performance and accessibility standards",
      "Interactive booking availability modal",
      "Scenic mountain-themed UI design",
      "Responsive layout for all devices"
    ]
  },
  {
    id: 2,
    title: "Mahendra Packers and Movers",
    category: "webdevelopment",
    description: "Full-scale professional logistics website for a packing and moving service. Includes interactive service inquiry forms and real-time calculation modules.",
    technologies: ["HTML5", "PHP", "MySQL", "Bootstrap"],
    image: "/projects/packers.png",
    demo: "https://mahendrapackersandmovers.com/",
    keyFeatures: [
      "Dynamic service inquiry system",
      "Customer contact/management module",
      "Real-time database integration",
      "Professional corporate branding"
    ]
  },
  {
    id: 3,
    title: "Elite Interior Design Studio",
    category: "webdevelopment",
    description: "A sleek, minimal, and high-end portfolio website for an interior design studio. Focuses on visual storytelling through high-quality photography and elegant typography.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Animation"],
    image: "/projects/interior.png",
    demo: "https://eliteinteriordesignstudio.com/",
    keyFeatures: [
      "Modern glassmorphism UI elements",
      "Elegant typography and layout",
      "Responsive portfolio showcase",
      "Service-specific inquiry integration"
    ]
  },
  {
    id: 4,
    title: "Gallery Management Module",
    category: "webdevelopment",
    description: "A complex media management system developed using CodeIgniter. Allows administrators to easily upload, manage, and display video/image content.",
    technologies: ["CodeIgniter", "PHP", "MySQL", "jQuery"],
    image: "/projects/depression-detection.png", // Reuse high-tech viz image for complex modules
    keyFeatures: [
      "Full CRUD operations for media items",
      "Role-based admin access",
      "Bulk upload & display optimization",
      "Seamless integration with frontend assets"
    ]
  },
  {
    id: 5,
    title: "Vidhya Institute UI Template",
    category: "webdevelopment",
    description: "A fully responsive educational institute template featuring a custom-built slider with smooth animations and Bootstrap 5 integration.",
    technologies: ["Bootstrap", "jQuery", "CSS3 Animations"],
    image: "https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&w=800&q=80",
    keyFeatures: [
      "Custom responsive hero slider",
      "Modern education-themed UI",
      "Mobile-first design approach",
      "Optimized CSS animations"
    ]
  },
  {
    id: 6,
    title: "AI Resume Analyzer & Builder",
    category: "ml",
    description: "A Streamlit app that analyzes resumes with ML/NLP, provides ATS score predictions, and generates resume recommendations.",
    technologies: ["Python", "Streamlit", "spaCy", "Sentence Transformers"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    demo: "https://lnkd.in/gQtcZQzB",
    keyFeatures: [
      "Resume and job description semantic matching",
      "Skill extraction with NLP",
      "ATS score prediction and gap detection",
      "Interview question suggestions and PDF export"
    ]
  },
  {
    id: 7,
    title: "Heart Disease Prediction System",
    category: "ml",
    description: "An interactive healthcare app that predicts heart disease risk using machine learning models and visual data insights.",
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    demo: "https://lnkd.in/gcDfsetc",
    github: "https://lnkd.in/g5We5FXK",
    keyFeatures: [
      "Real-time health risk prediction",
      "User-friendly medical interface",
      "Visual analysis of model inputs",
      "Deployable Streamlit web application"
    ]
  }
];

export const achievements = [
  {
    id: 1,
    title: "3rd Position – Web Design Competition",
    description: "Recognized for creative design and layout structure in a regional web development competition.",
    icon: "award"
  },
  {
    id: 2,
    title: "Runner-up – Coding Challenge",
    description: "Achieved runner-up status in a collaborative team-based coding competition (Team Contribution).",
    icon: "code"
  },
  {
    id: 3,
    title: "Internship Certificate – Groveus Informatics",
    description: "Successfully completed professional web development internship with live project contributions.",
    icon: "briefcase"
  },
  {
    id: 4,
    title: "Workshop / Seminar Participation",
    description: "Actively participated in multiple technical seminars focusing on modern web standards and AI.",
    icon: "users"
  }
];

export const certifications = [
  {
    id: 1,
    title: "Web Design Competition Certificate",
    issuer: "Technical Fest",
    date: "2025"
  },
  {
    id: 2,
    title: "Coding Challenge Certificate",
    issuer: "University Code Labs",
    date: "2025"
  },
  {
    id: 3,
    title: "Internship Certificate (Groveus Informatics)",
    issuer: "Groveus Informatics Pvt. Ltd.",
    date: "2025"
  }
];

export const experience = [
  {
    id: 1,
    title: "Co-author (Research Project)",
    company: "Depression Detection from Social Media",
    period: "2026 - Present",
    description: "Co-authoring a research paper on early detection of depression via social media text analysis. Developing Bi-LSTM models with Attention Mechanisms and Explainable AI (LIME & SHAP). Achieved 94% accuracy.",
    color: "secondary",
  },
  {
    id: 2,
    title: "Intern",
    company: "Sheld Tech Infosec Solution",
    period: "2026 - Present",
    description:
      "Working on real-time technical and security-related projects. Assisting in development, implementation, and system improvement tasks while gaining practical industry exposure.",
    color: "primary",
  },
  {
    id: 3,
    title: "Web Developer Intern",
    company: "Groveus Informatics Pvt. Ltd.",
    period: "Mar 2025 - May 2025",
    description:
      "Developed and deployed 4 live client websites. Worked on frontend and backend using PHP and MySQL. Improved website performance, responsiveness, and overall user experience.",
    color: "secondary",
  },
  {
    id: 4,
    title: "Deloitte Data Analytics Job Simulation",
    company: "Forage Virtual Experience",
    period: "2026",
    description:
      "Performed structured data analysis and derived actionable business insights. Applied data cleaning, EDA techniques, and analytical problem-solving methods.",
    color: "secondary",
  }
];

export const skills = {
  frontend: [
    { name: "React / Next.js", percentage: 95 },
    { name: "TypeScript", percentage: 90 },
    { name: "Tailwind CSS", percentage: 98 }
  ],
  backend: [
    { name: "Node.js", percentage: 92 },
    { name: "Python / Django", percentage: 85 },
    { name: "PostgreSQL", percentage: 88 }
  ],
  devops: [
    { name: "Docker", percentage: 80 },
    { name: "AWS", percentage: 75 },
    { name: "Git / CI/CD", percentage: 90 }
  ]
};