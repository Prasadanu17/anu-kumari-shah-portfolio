export const projects = [
  // Web Development
  {
    id: 1,
    title: "Niram Industries Website",
    description: "Dynamic company website built using CodeIgniter with modular structure.",
    image: "/assets/projects/web1.jpg",
    category: "webdevelopment",
    technologies: ["CodeIgniter", "Bootstrap", "HTML", "CSS"],
  },
  {
    id: 2,
    title: "Movers & Packers Website",
    description: "Business website with responsive design and contact form integration.",
    image: "/assets/projects/web2.jpg",
    category: "webdevelopment",
    technologies: ["React", "Tailwind"],
  },

  // Data Analytics
  {
    id: 3,
    title: "Sales Data Analysis",
    description: "Data cleaning and visualization using Python, Pandas and Matplotlib.",
    image: "/assets/projects/data1.jpg",
    category: "dataanalytics",
    technologies: ["Python", "Pandas", "Matplotlib"],
  },
  {
    id: 4,
    title: "Customer Insights Dashboard",
    description: "Created interactive dashboard for analyzing customer behavior.",
    image: "/assets/projects/data2.jpg",
    category: "dataanalytics",
    technologies: ["Power BI", "Excel"],
  },

  // Machine Learning (Learning Phase)
  {
    id: 5,
    title: "Machine Learning Projects (Coming Soon)",
    description: "Currently learning ML. Upcoming regression and classification models.",
    image: "/assets/projects/ml.jpg",
    category: "ml",
    technologies: ["Scikit-learn", "NumPy"],
  },
];


export const experience = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description: "Leading development of enterprise SaaS platform serving 50K+ users. Mentoring junior developers and architecting scalable solutions.",
    color: "primary"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "StartupXYZ",
    period: "2019 - 2021",
    description: "Built responsive web applications using React and TypeScript. Improved site performance by 40% through optimization techniques.",
    color: "secondary"
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "Digital Agency",
    period: "2018 - 2019",
    description: "Developed websites for diverse clients using modern web technologies. Collaborated with design teams to implement pixel-perfect interfaces.",
    color: "purple"
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