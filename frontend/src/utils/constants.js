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
      "PostgreSQL",
      "Power BI",
      "SQLAlchemy",
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
    title: "CustomerPulse-Analytics",
    category: "ai_ml",
    isProminent: true,
    tag: "DATA ANALYTICS & BI",
    description: "An end-to-end customer analytics and business intelligence system transforming raw customer data into actionable insights. Features Python data preprocessing, feature engineering on 3,900 customer records, automated PostgreSQL database integration using SQLAlchemy, and an interactive Power BI dashboard tracking purchasing behaviors, subscription dynamics, and revenue drivers.",
    technologies: ["Python", "Pandas", "PostgreSQL", "SQLAlchemy", "Power BI", "Data Analytics"],
    image: "/projects/customerpulse-analytics.jpg",
    demo: "https://lnkd.in/dMG3bnpr",
    github: "https://lnkd.in/dMG3bnpr",
    keyFeatures: [
      "Cleaned and preprocessed 3,900 customer records with Python and Pandas",
      "Conducted exploratory feature engineering and statistical data profiling",
      "Integrated cleaned dataset into PostgreSQL database via SQLAlchemy pipelines",
      "Developed interactive Power BI dashboard with dynamic category & demographic drill-downs",
      "Explored customer purchasing patterns, retention metrics (27% subscribers), and category revenue drivers"
    ]
  },
  {
    id: 2,
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
    id: 3,
    title: "Heart Disease Prediction System",
    category: "ai_ml",
    isProminent: true,
    tag: "FEATURED ML PROJECT",
    description: "An intelligent healthcare application that predicts the likelihood of heart disease using Machine Learning and Streamlit for real-time risk assessment.",
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy"],
    image: "/projects/Heart_disease_pred_AI.jpeg",
    demo: "https://heart-healthprediction.streamlit.app/",
    github: "https://github.com/Prasadanu17/heart-disease-prediction",
    keyFeatures: [
      "Interactive web application",
      "User-friendly healthcare interface",
      "Real-time prediction system",
      "Machine Learning based analysis"
    ]
  },
  {
    id: 4,
    title: "Breast Cancer Classification System",
    category: "ai_ml",
    isProminent: false,
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
    id: 5,
    title: "Sikkim Homestay Booking Platform",
    category: "web",
    isProminent: true,
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
    id: 6,
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
    id: 7,
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
  },
  {
    id: 8,
    title: "Hotel Shivaratna",
    category: "web",
    isProminent: false,
    tag: "CLIENT PROJECT",
    description: "A luxury hospitality & mountain retreat web platform developed for Hotel Shivaratna in Rinchenpong, West Sikkim. Features online room booking inquiries, multi-district travel guides, an interactive photo gallery, and smooth responsive design.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
    image: "/projects/shivaratna.jpg",
    demo: "https://www.hotelshivaratna.com/",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Online room booking & consultation inquiry interface",
      "Comprehensive Sikkim 4-district interactive travel guides",
      "Dynamic photo gallery showcase with luxury aesthetic",
      "Fully responsive mobile & desktop UI architecture"
    ]
  },
  {
    id: 9,
    title: "Priyansu Tours & Travels",
    category: "web",
    isProminent: false,
    tag: "CLIENT PROJECT",
    description: "A comprehensive travel agency & tour booking portal developed for Priyansu Tours & Travels in Gangtok, Sikkim. Features customized Himalayan tour packages, vehicle fleet bookings (car & bike rentals), hotel reservations, and multi-district Sikkim destination guides.",
    technologies: ["React.js", "Vite", "Tailwind CSS", "Lucide React"],
    image: "/projects/priyansu_hero.png",
    demo: "https://www.priyansutravels.com/",
    github: "https://github.com/Prasadanu17",
    keyFeatures: [
      "Customized tour packages across Sikkim, Darjeeling, Kalimpong & Bhutan",
      "Fleet booking system for car & bike rentals across mountain routes",
      "Hotel accommodation reservation & WhatsApp direct booking integration",
      "Comprehensive 4-district Sikkim destination and travel itinerary guides"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    title: "Deloitte Australia Data Analytics Job Simulation",
    organization: "Deloitte (via Forage)",
    date: "February 6, 2026",
    category: "Data Analytics & EDA",
    credentialId: "aBQ9Sfj8hx8Ynp4Db",
    skills: ["Data Analysis", "Forensic Technology", "EDA", "Tableau", "Telemetry Data"],
    description: "Completed practical simulation involving forensic technology, telemetry data analysis, interactive dashboard engineering in Tableau, data cleaning pipelines, and executive recommendation summaries.",
    image: "/assets/certificate/deloitte_data_analytics.png",
    link: "/assets/certificate/Data Analytics.pdf",
    isImportant: true
  },
  {
    id: 2,
    title: "Runner-Up — Coding Challenge (Transformation-2025)",
    organization: "SRM University Sikkim (School of IT)",
    date: "1st Nov 2025",
    category: "Competitive Coding",
    credentialId: "SRM-TRANS-2025-RUNNERUP",
    skills: ["Competitive Coding", "Algorithms", "Problem Solving", "Rapid Development"],
    description: "Awarded Runner-Up in the Coding Challenge at Transformation 2025 Tech Fest organized by the School of Information Technology, SRM University Sikkim.",
    image: "/assets/certificate/runner_up_transformation_2025.jpg",
    link: "/assets/certificate/runner-up.pdf",
    isImportant: true
  },
  {
    id: 3,
    title: "3rd Position — Website Designing (INNOVISION 2k25)",
    organization: "The School of Information Technology, The ICFAI University Sikkim",
    date: "Nov 2025",
    category: "Design Competition",
    credentialId: "ICFAI-INNOV-2025-WD3",
    skills: ["Website Designing", "UI/UX Layout", "Responsive Architecture", "Frontend Development"],
    description: "Awarded 3rd position in the Website Designing competition at INNOVISION 2k25 organized by The School of Information Technology, The ICFAI University Sikkim.",
    image: "/assets/certificate/icfai_web_design_3rd.jpg",
    link: "/assets/certificate/icfai_web_design_3rd.jpg",
    isImportant: true
  },
  {
    id: 4,
    title: "Campus Exchange Program Certificate",
    organization: "SRM Institute of Science & Technology, Chennai",
    date: "Dec 2024 – Jan 2025",
    category: "Academic Exchange",
    credentialId: "SRM-CEP-2025-CHE",
    skills: ["Cross-Campus Academic Immersion", "Advanced Systems", "Technical Collaboration"],
    description: "Successfully completed intensive Campus Exchange Program at SRM Institute of Science and Technology (SRMIST), Kattankulathur, Chennai, from 29th December 2024 to 15th January 2025.",
    image: "/assets/certificate/srm_campus_exchange.jpg",
    link: "/assets/certificate/srm_campus_exchange.jpg",
    isImportant: true
  },
  {
    id: 5,
    title: "Web Development Internship Certificate",
    organization: "Groveus Informatics Pvt. Ltd.",
    date: "March 2025 – May 2025",
    category: "Professional Internship",
    credentialId: "GRC20297",
    skills: ["PHP", "CodeIgniter", "MySQL", "Full-Stack Web Dev"],
    description: "Successfully built production web applications, client backend APIs, and dynamic database schemas during intensive industry internship.",
    image: "/assets/certificate/groveus_certificate.jpeg",
    link: "/assets/certificate/groveus_certificate.jpeg",
    isImportant: true
  },
  {
    id: 6,
    title: "On The Job Training Program (OJT) Certificate",
    organization: "Sikkim Manipal Institute of Technology (SMIT)",
    date: "February 2022",
    category: "Technical Training",
    credentialId: "SMIT-OJT-2022-CA",
    skills: ["Computer Applications", "Hands-on Computing", "Systems Administration", "IT Fundamentals"],
    description: "Completed 18 days On The Job Training Program organized by the Department of Computer Applications, Sikkim Manipal Institute of Technology (SMIT), Majitar, Sikkim.",
    image: "/assets/certificate/smit_on_the_job_training.jpg?v=2",
    link: "/assets/certificate/smit_on_the_job_training.jpg?v=2",
    isImportant: false
  },
  {
    id: 7,
    title: "Student Volunteer Certificate — MERAKI 2023",
    organization: "SRM University Sikkim",
    date: "23-24 Feb, 2023",
    category: "Leadership & Community",
    credentialId: "SRM-MERAKI-2023-VOL",
    skills: ["Event Organization", "Technical Volunteering", "Community Leadership", "Team Coordination"],
    description: "Certificate of Appreciation awarded for serving as a student volunteer at MERAKI 2023 organized by Shri Ramasamy Memorial University Sikkim.",
    image: "/assets/certificate/meraki_volunteer_2023.jpg",
    link: "/assets/certificate/meraki_volunteer_2023.jpg",
    isImportant: false
  },
  {
    id: 8,
    title: "Type Racer Competition — INNOVISION 2k25",
    organization: "The ICFAI University, Sikkim",
    date: "21st November 2025",
    category: "Competitive Coding",
    credentialId: "ICFAI-INNOV-2025-TR",
    skills: ["Algorithmic Speed", "Fast Prototyping", "Technical Competitions"],
    description: "Certificate of Participation in Type Racer organized by the School of Information Technology, The ICFAI University Sikkim during INNOVISION 2k25.",
    image: "/assets/certificate/icfai_typeracer_innovision.jpg?v=2",
    link: "/assets/certificate/icfai_typeracer_innovision.jpg?v=2",
    isImportant: false
  },
  {
    id: 9,
    title: "Innovation Ambassador (IA) Training — Foundation Level",
    organization: "MoE's Innovation Cell & AICTE, Govt. of India",
    date: "11-05-2026",
    category: "Technical Achievement",
    credentialId: "IA/Foundation/1101177",
    skills: ["Innovation & IP", "Design Thinking", "Entrepreneurship", "Tech Leadership"],
    description: "Successfully underwent Innovation Ambassador (IA) training 'Foundation Level' (16 sessions, 30 contact hours) conducted by MoE's Innovation Cell & AICTE during IIC calendar year 2025-26.",
    image: "/assets/certificate/moe_innovation_ambassador.jpg",
    link: "/assets/certificate/IA Online Training Certificate.pdf",
    isImportant: false
  },
  {
    id: 10,
    title: "Entrepreneurship Development Program Certificate",
    organization: "Entrepreneurship Development Cell",
    date: "2025",
    category: "Professional Development",
    credentialId: "EDP-2025-CERT",
    skills: ["Business Strategy", "Product Development", "Market Research", "Project Management"],
    description: "Completed comprehensive training on entrepreneurial strategy, innovation methodologies, and startup product lifecycle development.",
    image: null,
    link: "/assets/certificate/Entrepreneurship.pdf",
    isImportant: false
  },
  {
    id: 11,
    title: "Coding Challenge Certificate",
    organization: "University Code Labs",
    date: "2025",
    category: "Technical Achievement",
    credentialId: "UCL-CC-2025-089",
    skills: ["Problem Solving", "Algorithms", "Data Structures"],
    description: "Demonstrated advanced algorithmic problem-solving speed, data structure optimizations, and robust code implementations under strict time constraints.",
    image: null,
    link: null,
    isImportant: false
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
      "Engineered client websites including Priyansu Tours & Travels and Hotel Shivaratna"
    ],
    technologies: ["React.js", "Tailwind CSS", "Frontend Dev", "Backend Dev", "Dynamic Web Dev", "Client Projects"],
    projectsMentioned: ["Priyansu Tours & Travels", "Hotel Shivaratna"]
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
    title: "3rd Position — Website Designing (INNOVISION 2k25)",
    category: "DESIGN & UI",
    description: "Awarded 3rd position in the Website Designing competition at INNOVISION 2k25 organized by The School of Information Technology, The ICFAI University Sikkim.",
    icon: "award"
  },
  {
    id: 2,
    title: "Runner-Up — Coding Challenge (Transformation-2025)",
    category: "COMPETITIVE CODING",
    description: "Secured runner-up position in the Coding Challenge at Transformation 2025 Tech Fest organized by the School of Information Technology, SRM University Sikkim.",
    icon: "code"
  },
  {
    id: 3,
    title: "Student Volunteer Leadership",
    category: "ACADEMIC & COMMUNITY",
    description: "Active volunteer organizer for university technical events including MERAKI 2023 during Graduation (BCA) and Post-Graduation (MCA).",
    icon: "heart"
  }
];


