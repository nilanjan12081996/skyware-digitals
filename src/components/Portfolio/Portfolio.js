"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from './Portfolio.module.css';

const projects = [
  {
    id: 1,
    title: 'Earno Rewards Hub',
    category: 'Mobile App & Admin Panel',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive rewards application where users turn every transaction into earning opportunities, similar to Zomato/Swiggy. Includes a fully functional admin panel.'
  },
  {
    id: 2,
    title: 'CommentWow AI',
    category: 'Chrome Extension',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'An AI-powered LinkedIn Chrome extension designed to help users post smarter and comment better, instantly boosting visibility and credibility.'
  },
  {
    id: 3,
    title: 'InterviewFold',
    category: 'SaaS Platform',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'An intelligent platform for coding assessments and AI-driven technical interviews over call, providing unbiased, deep technical evaluation similar to HackerRank.'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title outfit-font">
            Our <span className="text-gradient-accent">Featured Work</span>
          </h2>
          <p className="section-subtitle">
            Explore some of our most impactful projects that showcase our expertise in design, development, and innovation.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`glass-card ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.image} />
                <div className={styles.overlay}>
                  <button className={styles.viewBtn}>
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
           <a href="#contactus" className="btn-secondary">Start Your Project</a>
        </motion.div>
      </div>
    </section>
  );
}
