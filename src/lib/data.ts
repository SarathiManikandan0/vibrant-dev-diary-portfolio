
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
    id: "portfolio",
    title: "Personal Portfolio",
    description: "A beautiful responsive portfolio built with React and Tailwind CSS.",
    longDescription: "This portfolio showcases my skills and projects in an elegant, user-friendly interface designed with attention to detail and smooth animations. Features include dark mode support, responsive design, and interactive elements.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: true
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with payment integration.",
    longDescription: "Built a complete e-commerce platform featuring product listings, shopping cart, user authentication, and payment processing with Stripe. The application includes an admin dashboard for managing products and orders.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true
  },
  {
    id: "ai-assistant",
    title: "AI Coding Assistant",
    description: "An AI-powered tool that helps developers write better code.",
    longDescription: "Developed an intelligent coding assistant that provides suggestions, identifies bugs, and helps optimize code. The application integrates with popular IDEs and leverages machine learning to understand coding patterns.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tags: ["Python", "TensorFlow", "VS Code Extension"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/ai-assistant"
  },
  {
    id: "health-tracker",
    title: "Health & Fitness Tracker",
    description: "A comprehensive app to track workouts, nutrition, and health metrics.",
    longDescription: "Created a health and fitness tracking application that allows users to log workouts, track nutrition intake, monitor vital statistics, and set personalized goals. Features include progress visualizations and custom workout plans.",
    imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
    tags: ["React Native", "Firebase", "Health APIs"],
    demoUrl: "#",
    githubUrl: "https://github.com/yourusername/health-tracker"
  }
];

// Sample skills data
export const skills: Skill[] = [
  { name: "React", icon: "react", level: 5, category: "frontend" },
  { name: "JavaScript", icon: "javascript", level: 5, category: "frontend" },
  { name: "TypeScript", icon: "typescript", level: 4, category: "frontend" },
  { name: "HTML5", icon: "html5", level: 5, category: "frontend" },
  { name: "CSS3", icon: "css3", level: 5, category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", level: 4, category: "frontend" },
  { name: "Node.js", icon: "nodejs", level: 4, category: "backend" },
  { name: "Express", icon: "express", level: 4, category: "backend" },
  { name: "MongoDB", icon: "mongodb", level: 3, category: "backend" },
  { name: "SQL", icon: "sql", level: 3, category: "backend" },
  { name: "Firebase", icon: "firebase", level: 4, category: "backend" },
  { name: "Git", icon: "git", level: 4, category: "other" },
  { name: "Figma", icon: "figma", level: 3, category: "design" },
  { name: "UI/UX Design", icon: "design", level: 3, category: "design" }
];

// Sample experience data
export const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    startDate: "Jan 2021",
    endDate: "Present",
    description: [
      "Lead development of core products using React, TypeScript, and modern frontend technologies",
      "Implemented CI/CD pipelines that reduced deployment time by 40%",
      "Mentored junior developers and conducted code reviews",
      "Collaborated with design and product teams to create intuitive user experiences"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    startDate: "Mar 2018",
    endDate: "Dec 2020",
    description: [
      "Developed and maintained web applications using MERN stack",
      "Created RESTful APIs and integrated with third-party services",
      "Optimized application performance resulting in 30% faster load times",
      "Collaborated with cross-functional teams in an Agile environment"
    ]
  },
  {
    title: "Junior Web Developer",
    company: "WebCraft Agency",
    location: "Boston, MA",
    startDate: "Jun 2016",
    endDate: "Feb 2018",
    description: [
      "Built responsive websites for diverse client needs",
      "Assisted in debugging and troubleshooting web applications",
      "Participated in regular code reviews and team meetings",
      "Learned and applied best practices for web development"
    ]
  }
];

// Sample education data
export const education: Education[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    startDate: "2014",
    endDate: "2016",
    description: "Specialized in Artificial Intelligence and Machine Learning"
  },
  {
    degree: "Bachelor of Science in Computer Engineering",
    institution: "MIT",
    location: "Cambridge, MA",
    startDate: "2010",
    endDate: "2014",
    description: "Graduated with honors, Minor in Mathematics"
  }
];

// Sample social links
export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin"
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter"
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: "instagram"
  }
];

// Personal information
export const personalInfo = {
  name: "Alex Johnson",
  title: "Software Engineer & UI/UX Designer",
  email: "alex@example.com",
  phone: "+1 (123) 456-7890",
  location: "San Francisco, CA",
  bio: "I'm a passionate software engineer with over 5 years of experience building modern web applications. I specialize in creating elegant, efficient, and user-friendly solutions to complex problems. My approach combines technical expertise with a keen eye for design to deliver exceptional digital experiences.",
  resumeUrl: "/resume.pdf"
};
