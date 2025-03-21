
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { personalInfo, socialLinks } from "../lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-10 bg-secondary/50 backdrop-blur-sm">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-semibold mb-2">{personalInfo.name}</h3>
            <p className="text-muted-foreground">{personalInfo.title}</p>
          </motion.div>
          
          <div className="flex gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all hover:scale-110"
                aria-label={link.platform}
              >
                <svg className="w-5 h-5">
                  <use xlinkHref={`#${link.icon}`} />
                </svg>
              </motion.a>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p>
              Designed and built with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
