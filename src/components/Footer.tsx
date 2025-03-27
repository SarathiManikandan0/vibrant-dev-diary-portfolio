
import { Link } from "react-router-dom";
import { GitHub, Linkedin, Instagram, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "GitHub",
      icon: <GitHub className="h-5 w-5" />,
      url: "https://github.com/SarathiManikandan0"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/sarathi-manikandan/"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/sarathi_manikandan/"
    }
  ];

  return (
    <footer className="bg-muted/20 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sarathi Manikandan</h3>
            <p className="text-muted-foreground mb-6">
              Computer Science student and aspiring Team Lead focused on delivering innovative solutions with a creative edge.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/#team" className="text-muted-foreground hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/book-project" className="text-muted-foreground hover:text-primary transition-colors">
                  Book a Project
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-muted-foreground hover:text-primary transition-colors">
                  Request Training
                </Link>
              </li>
              {!localStorage.getItem("supabase.auth.token") && (
                <li>
                  <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                    Client Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            © {currentYear} Sarathi Manikandan. All rights reserved. Designed and built with 
            <Heart className="h-3 w-3 mx-1 text-red-500 inline" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
