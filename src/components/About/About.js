"use client";

import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './About.module.css';

export default function About() {
  const missionCards = [
    {
      icon: <Target size={32} />,
      title: "Our Mission",
      desc: "To empower businesses with cutting-edge digital solutions that drive real-world impact."
    },
    {
      icon: <Zap size={32} />,
      title: "Our Speed",
      desc: "We deliver complex SaaS platforms and applications ahead of schedule without compromising quality."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Our Quality",
      desc: "Every line of code is written with scalability, security, and performance in mind."
    }
  ];

  return (
    <section id="aboutus" className={styles.about}>
      <div className={`container ${styles.aboutContainer}`}>
        <motion.div 
          className={styles.contentCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>Who We Are</span>
          <h2 className="outfit-font">Driving the <span className="text-gradient">AI Revolution</span> with Passion</h2>
          <p className={styles.description}>{db.about.description}</p>
        </motion.div>

        <div className={styles.missionGrid}>
          {missionCards.map((card, idx) => (
            <motion.div 
              key={idx}
              className={`glass-card ${styles.missionCard}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.techSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h4>Our Core Technologies</h4>
          <div className={styles.techBadges}>
            {db.about.techStack.map((tech, idx) => (
              <span key={idx} className={styles.badge}>{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
