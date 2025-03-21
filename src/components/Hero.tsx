
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { personalInfo, socialLinks } from "../lib/data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="container flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 right-0 -z-10 overflow-hidden w-full h-full pointer-events-none"
        >
          <div className="absolute top-[10%] right-[5%] w-[20rem] h-[20rem] bg-primary/10 rounded-full filter blur-[6rem]" />
          <div className="absolute bottom-[10%] left-[5%] w-[15rem] h-[15rem] bg-primary/10 rounded-full filter blur-[5rem]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex"
        >
          <span>Hello, I'm {personalInfo.name}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-4 tracking-tight"
        >
          <span>I build </span>
          <span className="text-primary relative subtle-highlight">exceptional</span>
          <span> digital experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground max-w-2xl text-lg md:text-xl mb-8"
        >
          {personalInfo.title} specializing in creating elegant solutions with modern technologies.
          I craft intuitive interfaces and robust applications with a focus on performance and user experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center lg:justify-start"
        >
          <a
            href="/#contact"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-transform hover:scale-105 hover:shadow-soft-lg"
          >
            Get in touch
          </a>
          <a
            href={personalInfo.resumeUrl}
            className="px-6 py-3 rounded-full border border-border bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-transform hover:scale-105 hover:shadow-soft flex items-center gap-2"
            download
          >
            <FileText size={18} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <a
            href={socialLinks.find(s => s.platform === "GitHub")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-transform hover:scale-110"
            aria-label="GitHub profile"
          >
            <Github size={20} />
          </a>
          <a
            href={socialLinks.find(s => s.platform === "LinkedIn")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-transform hover:scale-110"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-transform hover:scale-110"
            aria-label="Email me"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="/#about"
          aria-label="Scroll to About section"
          className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-all"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
