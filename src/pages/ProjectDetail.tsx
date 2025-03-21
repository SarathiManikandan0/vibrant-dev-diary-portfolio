
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../lib/data";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(projects.find(p => p.id === id));
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (!project) {
      // If project not found, redirect to home
      navigate("/");
    }
  }, [project, navigate]);
  
  if (!project) return null;
  
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container py-12">
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {project.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose dark:prose-invert max-w-none mb-8"
              >
                <p className="text-lg leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </motion.div>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {project.demoUrl && (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-transform hover:scale-105"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </motion.a>
                )}
                
                {project.githubUrl && (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium transition-transform hover:scale-105"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </motion.a>
                )}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-2xl overflow-hidden sticky top-24"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Project Type
                      </h4>
                      <p>{project.tags[0]}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Technologies
                      </h4>
                      <p>{project.tags.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Related Projects */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter(p => p.id !== project.id)
                .slice(0, 3)
                .map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass rounded-2xl overflow-hidden hover:shadow-soft-lg transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={relatedProject.imageUrl}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <Link
                          to={`/project/${relatedProject.id}`}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium transform transition-transform hover:scale-105"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{relatedProject.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {relatedProject.description}
                      </p>
                      <Link
                        to={`/project/${relatedProject.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Learn more
                      </Link>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
