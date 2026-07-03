"use client";

import { motion } from 'framer-motion';
import { Layers, Smartphone, Globe, Database, Server, Code2 } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Services.module.css';

const ICONS = [
  <Globe size={40} className={styles.icon} />,
  <Layers size={40} className={styles.icon} />,
  <Smartphone size={40} className={styles.icon} />,
  <Server size={40} className={styles.icon} />,
  <Code2 size={40} className={styles.icon} />,
  <Database size={40} className={styles.icon} />
];

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className={`container`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>What We Do</span>
          <h2 className="outfit-font">Our <span className="text-gradient">Services</span></h2>
          <p>We provide comprehensive solutions to help your business grow and thrive in the digital landscape.</p>
        </motion.div>

        <div className={styles.grid}>
          {db.services.map((service, index) => (
            <motion.div 
              key={index} 
              className={`glass-card ${styles.card}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {ICONS[index % ICONS.length]}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
