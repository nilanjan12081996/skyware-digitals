"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, HardDrive, Cpu, ArrowRight, Zap, Layers, Box, Activity } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AutomationFlow from '../../components/Automation/AutomationFlow';
import styles from './Automation.module.css';

const HardwareFlow = () => {
  return (
    <div className={styles.hardwareVisualizer}>
      <svg className={styles.circuitSvg} viewBox="0 0 400 200">
        <path d="M 50 100 L 150 100 M 150 100 L 150 50 M 150 100 L 150 150 M 150 50 L 250 50 M 150 150 L 250 150 M 250 50 L 250 100 M 250 150 L 250 100 M 250 100 L 350 100" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.2" />
        
        {/* Animated Signal Flows */}
        {[
          "M 50 100 L 150 100 L 150 50 L 250 50 L 250 100 L 350 100",
          "M 50 100 L 150 100 L 150 150 L 250 150 L 250 100 L 350 100"
        ].map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 2 }}
          />
        ))}
        
        {/* Chip in Middle */}
        <rect x="180" y="80" width="40" height="40" rx="4" fill="#ffffff" stroke="#0ea5e9" strokeWidth="1" />
        <motion.rect 
          x="195" y="95" width="10" height="10" fill="#0ea5e9" 
          animate={{ opacity: [0.2, 1, 0.2] }} 
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      <div className={styles.hardwareBadge}>EMBEDDED LOGIC ACTIVE</div>
    </div>
  );
};

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('software');

  return (
    <>
      <Navbar />
      <main className={styles.automation}>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <motion.section 
            className={styles.hero}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.preTitle}>Advanced Intelligence</div>
            <h1 className="outfit-font">Transforming Reality through <span className="text-gradient">Automation</span></h1>
            <p className={styles.heroDesc}>
              We bridge the gap between digital workflows and physical execution. 
              Our AI-driven solutions empower businesses to scale infinitely by automating every layer of operation.
            </p>
          </motion.section>

          <div className={styles.categoryContainer}>
            <div className={styles.tabSwitcher}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'software' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('software')}
              >
                <Monitor size={18} /> <span>Software Workflow</span>
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'hardware' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('hardware')}
              >
                <HardDrive size={18} /> <span>Hardware Systems</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'software' ? (
              <motion.div 
                key="software"
                className={styles.contentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.contentHeader}>
                  <div className={styles.headerInfo}>
                    <h2 className="outfit-font">Intelligent <span className="text-gradient">Software Workflows</span></h2>
                    <p>
                      Stop wasting time on manual data entry. Our n8n architectures connect your 
                      customer interactions from **Social Media** to your **CRM** and **Fulfillment** teams automatically.
                    </p>
                  </div>
                </div>

                <AutomationFlow />

                <div className={styles.featuresGrid}>
                    {[
                        { icon: Layers, title: 'Multi-Channel', desc: 'Sync data across WhatsApp, FB Messenger, Email, and internal tools.' },
                        { icon: Activity, title: 'Real-time Logic', desc: 'AI-driven decision making at every node of your business process.' },
                        { icon: Box, title: 'Infinite Scaling', desc: 'Handle 1 lead or 100,000 leads with the same underlying infrastructure.' }
                    ].map((feature, i) => (
                        <div key={i} className={styles.featureCard}>
                            <feature.icon size={24} className={styles.featureIcon} />
                            <h3 className="outfit-font">{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="hardware"
                className={styles.hardwareComingSoon}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.hardwareHeader}>
                    <div className={styles.comingSoonBadge}>Under Development</div>
                    <h2 className="outfit-font">Embedded <span className="text-gradient">Hardware Automation</span></h2>
                    <p>
                      The next frontier of Skyware Digital. We are developing proprietary hardware 
                      controllers that bring AI-decision logic directly into physical industrial systems.
                    </p>
                </div>

                <HardwareFlow />

                <div className={styles.techStackTeaser}>
                     <span>STM32</span>
                     <span>ESP32</span>
                     <span>Industrial IoT</span>
                     <span>Robotics</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
