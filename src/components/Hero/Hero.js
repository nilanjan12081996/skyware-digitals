"use client";

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.pulseDot}></span>
            Leading Digital Agency
          </motion.div>
          
          <motion.h1 className="outfit-font">
            Building the Future of <span className="text-gradient-accent">Digital Products</span>
          </motion.h1>
          <p className={styles.subtitle}>
            We engineer high-performance web and mobile applications that drive growth, efficiency, and market leadership for enterprise clients.
          </p>
          
          <div className={styles.ctaGroup}>
            <a href="#portfolio" className="btn-primary">
              View Our Work <ArrowRight size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}}/>
            </a>
            <a href="#contactus" className={styles.secondaryBtn}>Get in Touch</a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className={styles.scrollText}>Scroll Down</span>
        <ChevronDown size={24} className={styles.scrollIcon} />
      </motion.div>
      
      {/* Abstract Background Shapes */}
      <div className={styles.abstractShape1}></div>
      <div className={styles.abstractShape2}></div>
    </section>
  );
}
