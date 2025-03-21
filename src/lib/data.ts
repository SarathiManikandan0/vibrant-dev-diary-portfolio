export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "design" | "other";
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Sample projects data
export const projects: Project[] = [
  {
    id: "zen-care",
    title: "ZEN Care",
    description: "AI mental health platform using MERN stack and NLP",
    longDescription: "Leading development of an AI mental health platform using MERN stack and NLP (TensorFlow), processing 1,000+ interactions with 25% improved efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    tags: ["React.js", "Node.js", "MongoDB", "TensorFlow", "NLP"],
    demoUrl: "#",
    githubUrl: "https://github.com/SarathiManikandan0/zen-care",
    featured: true
  },
  {
    id: "resume-builder",
    title: "Resume Builder",
    description: "LLM-powered tool for tailored resume creation",
    longDescription: "Designed an LLM-powered tool for tailored resume creation with a React.js interface, helping users create professional resumes efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
    tags: ["React.js", "LLM", "AI", "Node.js"],
    demoUrl: "#",
    githubUrl: "https://github.com/SarathiManikandan0/resume-builder",
    featured: true
  },
  {
    id: "job-description-generator",
    title: "Job Description Generator",
    description: "NLP tool to streamline HR content creation",
    longDescription: "Built an NLP tool to streamline HR content creation, reducing effort by 30%. Developed as part of the Hexaware Hackathon.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tags: ["NLP", "Python", "React.js", "API"],
    demoUrl: "#",
    githubUrl: "https://github.com/SarathiManikandan0/jd-generator"
  },
  {
    id: "cold-mail-generator",
    title: "Cold Mail Generator",
    description: "AI email system with customizable templates",
    longDescription: "Created an AI email system with customizable templates and a React.js frontend, helping users generate effective cold outreach emails.",
    imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
    tags: ["AI", "React.js", "Node.js", "Email API"],
    demoUrl: "#",
    githubUrl: "https://github.com/SarathiManikandan0/cold-mail-generator"
  }
];

// Skills data
export const skills: Skill[] = [
  { name: "Python", icon: "python", level: 5, category: "backend" },
  { name: "JavaScript", icon: "javascript", level: 5, category: "frontend" },
  { name: "TypeScript", icon: "typescript", level: 4, category: "frontend" },
  { name: "HTML5", icon: "html5", level: 5, category: "frontend" },
  { name: "CSS3", icon: "css3", level: 5, category: "frontend" },
  { name: "React.js", icon: "react", level: 4, category: "frontend" },
  { name: "Node.js", icon: "nodejs", level: 4, category: "backend" },
  { name: "Express.js", icon: "express", level: 4, category: "backend" },
  { name: "MongoDB", icon: "mongodb", level: 4, category: "backend" },
  { name: "SQL", icon: "sql", level: 4, category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", level: 3, category: "backend" },
  { name: "MySQL", icon: "mysql", level: 3, category: "backend" },
  { name: "Git", icon: "git", level: 4, category: "other" },
  { name: "Docker", icon: "docker", level: 3, category: "other" },
  { name: "AWS", icon: "aws", level: 3, category: "other" },
  { name: "TensorFlow", icon: "tensorflow", level: 3, category: "backend" },
  { name: "NLP", icon: "nlp", level: 3, category: "backend" },
  { name: "Leadership", icon: "leadership", level: 4, category: "other" },
  { name: "Operations", icon: "operations", level: 4, category: "other" },
  { name: "Data Analysis", icon: "analysis", level: 4, category: "other" }
];

// Experience data
export const experiences: Experience[] = [
  {
    title: "Machine Learning Intern",
    company: "Rinex",
    location: "Bengaluru, KA",
    startDate: "Aug 2022",
    endDate: "Nov 2022",
    description: [
      "Led a team of 3 to develop predictive models (e.g., mobile price prediction with Random Forest, XGBoost)",
      "Improved operational efficiency by 60% through model optimization",
      "Built an Amazon Alexa sentiment analysis tool using NLP, TensorFlow, and Flask",
      "Collaborated with cross-functional teams to integrate ML solutions"
    ]
  },
  {
    title: "Data Science Intern",
    company: "Verzeo",
    location: "Bengaluru, KA",
    startDate: "Nov 2022",
    endDate: "Sep 2022",
    description: [
      "Managed data analysis for 50,000+ records with Python, Pandas, and Matplotlib",
      "Trained 5 peers on visualization tools, boosting productivity by 20%",
      "Implemented data cleaning and preprocessing pipelines",
      "Created dashboards for real-time data visualization"
    ]
  },
  {
    title: "Project Intern",
    company: "HCL",
    location: "Chennai, TN",
    startDate: "Feb 2023",
    endDate: "May 2023",
    description: [
      "Coordinated a MERN stack e-commerce platform development",
      "Supervised 4 team members through the project lifecycle",
      "Reduced deployment time by 15% with process improvements",
      "Implemented responsive design and database optimizations"
    ]
  }
];

// Education data
export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Sathyabama University",
    location: "Chennai, TN",
    startDate: "June 2021",
    endDate: "May 2025",
    description: "CGPA: 8.05, Specializing in Machine Learning and Data Science"
  },
  {
    degree: "Higher Secondary Education (12th)",
    institution: "Sri Krishna Metric School",
    location: "Arakonam, TN",
    startDate: "2019",
    endDate: "2021",
    description: "Score: 89%"
  },
  {
    degree: "Secondary Education (10th)",
    institution: "Sri Krishna Metric School",
    location: "Arakonam, TN",
    startDate: "2018",
    endDate: "2019",
    description: "Score: 87%"
  }
];

// Social links
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/SarathiManikandan0",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/sarathi-manikandan/",
    icon: "linkedin"
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/sarathi_manikandan/",
    icon: "instagram"
  }
];

// Personal information
export const personalInfo = {
  name: "Sarathi Manikandan",
  title: "Computer Science Student & Aspiring Team Lead",
  email: "sarathim1000@gmail.com",
  phone: "+919363480572",
  location: "Arakonam, TN 613003",
  bio: "I'm Sarathi Manikandan, a Computer Science undergrad at Sathyabama University (CGPA: 8.05), passionate about tech and leadership.\nWith expertise in MERN stack, machine learning, and NLP, I've led projects like ZEN Care—an AI mental health platform—and built tools like a Resume Builder using LLMs.\nMy internships at Rinex, Verzeo, and HCL honed my skills in data analysis, process optimization, and full-stack development.\nI thrive under pressure, delivering innovative solutions with a creative edge.",
  resumeUrl: "/resume.pdf",
  profileImage: "/lovable-uploads/22556218-153f-4a3c-b08a-2b2274e5bc06.png"
};

// Extracurricular activities
export const extracurricular = [
  {
    title: "PLI Blockathon",
    organization: "Sathyabama University",
    date: "Sep 2022",
    description: "Led a team of 5 to build a blockchain voting system with Solidity and JavaScript, improving efficiency by 30%."
  }
];

// New section for freelancing
export const freelancing = {
  title: "Let's Build Together",
  description: "Available for freelancing or product development—reach out at 9363480572 for business inquiries.",
  ctaText: "Contact Me"
};
