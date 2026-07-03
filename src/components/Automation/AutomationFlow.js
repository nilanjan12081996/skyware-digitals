"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, MessageCircle, MessageSquare, Phone, Mail, Settings } from 'lucide-react';
import styles from './AutomationFlow.module.css';

const nodes = [
  { id: 'source-whatsapp', title: 'WhatsApp Lead', icon: MessageCircle, color: '#25D366', x: 250, y: 170 },
  { id: 'source-fb', title: 'FB Messenger', icon: MessageSquare, color: '#1877F2', x: 250, y: 430 },
  { id: 'ai-logic', title: 'AI Classifier', icon: Cpu, color: '#0ea5e9', x: 600, y: 300 },
  { id: 'action-call', title: 'Auto-Call', icon: Phone, color: '#0284c7', x: 950, y: 170 },
  { id: 'action-mail', title: 'CRM Notify', icon: Mail, color: '#4f46e5', x: 950, y: 430 }
];

export default function AutomationFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Target layout width is 1200px
        const newScale = Math.min(width / 1200, 1);
        setScale(newScale);
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.flowContainer} ref={containerRef}>
      <div className={styles.gridDots}></div>
      
      <div 
        className={styles.scalingWrapper}
        style={{ 
          transform: `scale(${scale})`,
          width: '1200px',
          height: '600px'
        }}
      >
        <svg className={styles.canvas} viewBox="0 0 1200 600">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* S-Curve Connection Paths - Calculated for 1200px Grid */}
          {/* Centers: 250, 600, 950 | Y: 170, 300, 430 */}
          {/* Ports are at x +/- 96 and y + 40 (half height) */}
          
          {/* WhatsApp/FB to AI Classifier */}
          <path d="M 346 210 C 450 210, 400 340, 504 340" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
          <path d="M 346 470 C 450 470, 400 340, 504 340" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
          
          {/* AI Classifier to Action Nodes */}
          <path d="M 696 340 C 800 340, 750 210, 854 210" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />
          <path d="M 696 340 C 800 340, 750 470, 854 470" stroke="rgba(0,0,0,0.1)" strokeWidth="2" fill="none" />

          {/* Animated Data Packets */}
          <DataPacket d="M 346 210 C 450 210, 400 340, 504 340" delay={0} color="#25D366" />
          <DataPacket d="M 346 470 C 450 470, 400 340, 504 340" delay={1.5} color="#1877F2" />
          <DataPacket d="M 696 340 C 800 340, 750 210, 854 210" delay={0.7} color="#0ea5e9" />
          <DataPacket d="M 696 340 C 800 340, 750 470, 854 470" delay={2.2} color="#0ea5e9" />

          {/* Unified Nodes via foreignObject */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <foreignObject 
                key={node.id}
                x={node.x - 90} 
                y={node.y} 
                width="180" 
                height="120"
                className={styles.nodeForeign}
              >
                <motion.div 
                  className={`${styles.node} ${activeStep === index ? styles.activeNode : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.nodeHeader}>
                    <Icon size={14} color={node.color} />
                    <span className={styles.nodeTitle}>{node.title}</span>
                    <Settings size={12} className={styles.nodeSettings} />
                  </div>
                  <div className={styles.nodeBody}>
                    <div className={styles.statusDot} style={{ background: activeStep === index ? node.color : '#cbd5e1' }} />
                    <span className={styles.statusText}>{activeStep === index ? 'Executing...' : 'Idle'}</span>
                  </div>
                  {activeStep === index && (
                    <motion.div 
                      className={styles.nodeGlow} 
                      style={{ background: node.color, opacity: 0.1 }}
                    />
                  )}
                  {/* Visual Port Markers */}
                  <div className={`${styles.port} ${styles.portIn}`} />
                  <div className={`${styles.port} ${styles.portOut}`} />
                </motion.div>
              </foreignObject>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function DataPacket({ d, delay, color }) {
  return (
    <motion.circle 
      r="4" 
      fill={color} 
      filter="url(#glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      style={{ offsetPath: `path("${d}")` }}
    />
  );
}
