"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Careers.module.css';
import ApplyModal from './ApplyModal';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <section id="careers" className={styles.careers}>
      <div className={`container ${styles.careersWrapper}`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Careers</span>
          <h2 className="outfit-font">Build Your Future with <span className="text-gradient">Skyware</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {db.careers.map((job, index) => (
            <motion.div 
              key={job.id}
              className={`glass ${styles.jobCard}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.postDate}>{job.postDate}</div>
                <Briefcase size={20} className={styles.icon} />
              </div>

              <h3 className={`outfit-font ${styles.jobTitle}`}>{job.title}</h3>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Calendar size={14} /> {job.type}
                </span>
                <span className={styles.metaItem}>
                  <MapPin size={14} /> {job.location}
                </span>
              </div>

              <div className={styles.sectionTitle}>
                <CheckCircle2 size={16} /> Requirements
              </div>
              <ul className={styles.list}>
                {job.requirements.map((item, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <span className={styles.bullet}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                className={`btn-primary ${styles.applyBtn}`}
                onClick={() => handleApplyClick(job)}
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        jobTitle={selectedJob?.title} 
      />
    </section>
  );
}
