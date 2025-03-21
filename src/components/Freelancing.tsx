
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { freelancing } from "../lib/data";
import { Link } from "react-router-dom";

export function Freelancing() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="freelancing" className="py-20 bg-primary/5">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{freelancing.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto glass rounded-2xl p-8 text-center"
        >
          <p className="text-lg mb-8">{freelancing.description}</p>
          
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:scale-105 hover:shadow-soft-lg"
          >
            <span>{freelancing.ctaText}</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
