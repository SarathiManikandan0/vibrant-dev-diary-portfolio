
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { socialLinks } from "../lib/data";
import { useGithubActivity } from "../hooks/useGithubActivity";

export function Social() {
  // Use the GitHub username from your data
  const githubUsername = socialLinks.find(s => s.platform === "GitHub")?.url.split("/").pop() || "yourusername";
  const { activities, loading, error } = useGithubActivity(githubUsername, 4);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Social media icon mapping
  const iconMap = {
    Github: <Github size={24} />,
    LinkedIn: <Linkedin size={24} />,
    Twitter: <Twitter size={24} />,
    Instagram: <Instagram size={24} />
  };

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect With Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Follow me on social media to see my latest projects and updates.
            I'm always interested in new connections and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Social Media</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-all hover:translate-y-[-2px] hover:shadow-soft"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                    {iconMap[link.platform as keyof typeof iconMap]}
                  </div>
                  <span className="font-medium">{link.platform}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* GitHub Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Recent GitHub Activity</h3>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 rounded-lg loading-shimmer"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-6">
                <p className="text-muted-foreground">{error}</p>
                <a 
                  href={socialLinks.find(s => s.platform === "GitHub")?.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80"
                >
                  Visit My GitHub
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all"
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5">
                          <Github size={16} />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span>{" "}
                            <a
                              href={`https://github.com/${activity.repo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline"
                            >
                              {activity.repo}
                            </a>
                          </p>
                          {activity.details && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.details}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                )}
                <a
                  href={socialLinks.find(s => s.platform === "GitHub")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center mt-4 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80"
                >
                  View More on GitHub
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
