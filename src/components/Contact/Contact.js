"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, Share2 } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Using the deployed Render backend URL directly
      const API_URL = 'https://skyware-backend.onrender.com';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please try again.');
    }
  };

  return (
    <section id="contactus" className={styles.contact}>
      <div className={`container ${styles.contactContainer}`}>
        <motion.div 
          className={styles.infoCol}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Get in Touch</span>
          <h2 className="outfit-font">Let's talk about your <span className="text-gradient">Project</span></h2>
          <p className={styles.description}>
            Ready to start your next big thing? Contact our team of experts and let's build something amazing together.
          </p>
          
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
               <div className={styles.iconBox}><Phone /></div>
               <div>
                  <h4>Phone</h4>
                  <p>{db.companyInfo.phone}</p>
               </div>
            </div>
            <div className={styles.contactItem}>
               <div className={styles.iconBox}><Mail /></div>
               <div>
                  <h4>Email</h4>
                  <p>{db.companyInfo.email}</p>
               </div>
            </div>
            <div className={styles.contactItem}>
               <div className={styles.iconBox}><MapPin /></div>
               <div>
                  <h4>Location</h4>
                  <p>Global Availability | Remote</p>
               </div>
            </div>
          </div>
          
          <div className={styles.socials}>
             <h4>Follow Us</h4>
             <div className={styles.socialIcons}>
                <a href={db.companyInfo.social.linkedin} target="_blank" rel="noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href={db.companyInfo.social.facebook} target="_blank" rel="noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href={db.companyInfo.social.instagram} target="_blank" rel="noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
             </div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.formCol}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className={`glass-card ${styles.form}`} onSubmit={handleSubmit}>
            <h3 className="outfit-font">Send us a Message</h3>
            
            {status === 'success' && (
              <div style={{ padding: '15px', background: 'rgba(37, 211, 102, 0.1)', color: '#16a34a', border: '1px solid rgba(37, 211, 102, 0.2)', borderRadius: '8px', marginBottom: '20px', fontWeight: '500' }}>
                Thank you! Your message has been sent successfully. We will get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginBottom: '20px', fontWeight: '500' }}>
                {errorMessage}
              </div>
            )}
            
            <div className={styles.inputGroup}>
               <label htmlFor="name">Full Name</label>
               <input type="text" id="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            
            <div className={styles.inputGroup}>
               <label htmlFor="email">Email Address</label>
               <input type="email" id="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            
            <div className={styles.inputGroup}>
               <label htmlFor="phone">Phone Number</label>
               <input type="tel" id="phone" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            
            <div className={styles.inputGroup}>
               <label htmlFor="message">Your Message</label>
               <textarea id="message" rows="5" placeholder="Tell us about your project requirements..." required value={formData.message} onChange={handleChange} disabled={status === 'loading'}></textarea>
            </div>
            
            <button type="submit" className="btn-primary" style={{width: '100%', opacity: status === 'loading' ? 0.7 : 1}} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'} {!status === 'loading' && <Send size={18} style={{marginLeft: '8px', verticalAlign: 'middle'}}/>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
