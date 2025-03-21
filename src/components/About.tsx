
import { motion } from "framer-motion";
import { personalInfo, skills, experiences, education, socialLinks } from "../lib/data";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram } from "lucide-react";

export function About() {
  const [activeTab, setActiveTab] = useState<"skills" | "experience" | "education">("skills");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Social media icon mapping
  const iconMap: Record<string, JSX.Element> = {
    GitHub: <Github size={16} />,
    LinkedIn: <Linkedin size={16} />,
    Instagram: <Instagram size={16} />
  };

  // Function to render text with links
  const renderBioWithLinks = (text: string) => {
    let bioText = text;
    
    // For each social link, replace the URL with a linked version
    socialLinks.forEach(link => {
      const linkText = `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline inline-flex items-center gap-1">${link.platform} ${iconMap[link.platform]}</a>`;
      bioText = bioText.replace(link.url, linkText);
    });
    
    // Split by <a> tags to preserve them when setting innerHTML
    const parts = bioText.split(/(<a.*?<\/a>)/);
    
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('<a')) {
            // This is a link, render it as HTML
            return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
          } else {
            // This is regular text
            return <span key={i}>{part}</span>;
          }
        })}
      </>
    );
  };

  return (
    <section id="about" className="py-20">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeInUp}
          className="mb-12 flex flex-col md:flex-row items-center gap-8 glass p-8 rounded-2xl"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 relative flex-shrink-0">
            <Avatar className="w-full h-full border-4 border-primary/20">
              <AvatarImage 
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-bold">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
              <div>
                <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
                <p className="text-primary">{personalInfo.title}</p>
              </div>
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 text-foreground transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {iconMap[link.platform]}
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary">
                {personalInfo.location}
              </div>
              <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary">
                {personalInfo.email}
              </div>
              <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary">
                {personalInfo.phone}
              </div>
            </div>
            <div className="text-muted-foreground mb-4 text-sm md:text-base">
              {renderBioWithLinks(personalInfo.bio)}
            </div>
            <a 
              href={personalInfo.resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="mb-10">
          <div className="flex justify-center overflow-x-auto no-scrollbar">
            <div className="flex space-x-2 p-1 bg-secondary/50 rounded-full">
              {["skills", "experience", "education"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary/80"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass p-6 rounded-2xl relative overflow-hidden transition-transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center bg-primary/10 rounded-xl text-primary">
                    <span className="text-xl font-bold">{skill.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{skill.name}</h3>
                  <div className="w-full flex space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < skill.level ? "bg-primary" : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative border-l-2 border-border pl-8 ml-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[40px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background z-10"></div>
                  <div className="absolute -left-[36px] top-[12px] bottom-[-48px] w-[2px] bg-border z-[5]"></div>
                  
                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{exp.company} • {exp.location}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative border-l-2 border-border pl-8 ml-4">
              {education.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[40px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background z-10"></div>
                  <div className="absolute -left-[36px] top-[12px] bottom-[-48px] w-[2px] bg-border z-[5]"></div>

                  <div className="glass rounded-2xl p-6">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{edu.institution} • {edu.location}</p>
                    {edu.description && <p className="mt-4">{edu.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
