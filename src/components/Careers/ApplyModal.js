"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle, FileText } from 'lucide-react';
import styles from './ApplyModal.module.css';

export default function ApplyModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close modal after success message
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            experience: '',
            message: '',
            cv: null
        });
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div 
            className={`glass ${styles.modal}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.header}>
              <h2 className="outfit-font">Apply for <span className="text-gradient">{jobTitle}</span></h2>
              <p>Join our team of innovators and creators.</p>
            </div>

            {isSuccess && (
              <motion.div 
                className={styles.successMsg}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={20} />
                <span>Application submitted successfully! We'll be in touch soon.</span>
              </motion.div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name <span>*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className={styles.input} 
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address <span>*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className={styles.input} 
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number <span>*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  className={styles.input} 
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Upload CV (PDF/DOC) <span>*</span></label>
                <div 
                  className={styles.fileArea}
                  onClick={() => document.getElementById('cv-upload').click()}
                >
                  <input 
                    type="file" 
                    id="cv-upload" 
                    hidden 
                    required 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <div className={styles.fileAreaContent}>
                    {formData.cv ? (
                      <>
                        <FileText size={32} className={styles.fileName} />
                        <p className={styles.fileName}>{formData.cv.name}</p>
                      </>
                    ) : (
                      <>
                        <Upload size={32} />
                        <p>Click or drag and drop to upload your resume</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="experience">Years of Experience</label>
                <input 
                  type="text" 
                  id="experience" 
                  name="experience" 
                  className={styles.input} 
                  placeholder="e.g. 3 years"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message to Hiring Manager</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className={styles.textarea} 
                  placeholder="Tell us why you're a great fit..."
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn-primary ${styles.submitBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
