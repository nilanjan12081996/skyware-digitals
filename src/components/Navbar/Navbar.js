"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import db from '../../Database/db.json';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Scroll Spy Logic
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -70% 0px', // Trigger when section is near top
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) setActiveHash(`#${id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Watch sections
    const sections = ['aboutus', 'services', 'portfolio', 'ourteam', 'testimonials', 'contactus'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Special case for home (top)
    const handleHomeActive = () => {
      if (window.scrollY < 100) setActiveHash('');
    };
    window.addEventListener('scroll', handleHomeActive);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleHomeActive);
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '#aboutus' },
    { name: 'Services', path: '#services' },
    { name: 'Portfolio', path: '#portfolio' },
    { name: 'Our Team', path: '#ourteam' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '#contactus' },
  ];

  const getPath = (itemPath) => {
    if (itemPath.startsWith('#')) {
      return pathname === '/' ? itemPath : `/${itemPath}`;
    }
    return itemPath;
  };

  const isLinkActive = (itemPath) => {
    if (itemPath === '/') return pathname === '/' && !activeHash;
    if (itemPath === '/careers') return pathname === '/careers';
    return activeHash === itemPath;
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href="/" className="outfit-font">
            <img src="/skywarelogo.png" alt={db.companyInfo.logoText || "SKYWARE"} className={styles.logoImg} />
          </Link>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={getPath(item.path)} 
                onClick={() => {
                  setIsOpen(false);
                  if (item.path.startsWith('#')) setActiveHash(item.path);
                }}
                className={isLinkActive(item.path) ? styles.active : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {/* Mobile AI Automation Search/Pulse Link (Visible only on mobile inside menu) */}
          <li className={styles.mobileCta}>
             <Link 
                href="/automation" 
                className={`${styles.aiAutomationLink} ${pathname === '/automation' ? styles.active : ''}`} 
                onClick={() => setIsOpen(false)} 
                style={{ display: 'flex', marginBottom: '15px' }}
              >
                <span className={styles.aiIconPulse}><Zap size={16} fill="var(--accent-primary)" /></span>
                AI Automation
             </Link>
             <a href="#contactus" className="btn-primary" onClick={() => setIsOpen(false)}>Hire a Developer</a>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link 
            href="/automation" 
            className={`${styles.aiAutomationLink} ${pathname === '/automation' ? styles.active : ''}`}
          >
            <span className={styles.aiIconPulse}><Zap size={16} fill="var(--accent-primary)" /></span>
            AI Automation
          </Link>
          <a href="#contactus" className={`btn-primary ${styles.desktopCta}`}>Hire a Developer</a>
          <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
