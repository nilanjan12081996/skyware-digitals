"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Team.module.css';

export default function Team() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
  }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="ourteam" className={styles.team}>
      <div className={`container ${styles.teamWrapper}`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Our Experts</span>
          <h2 className="outfit-font">Meet the <span className="text-gradient">Core Team</span></h2>
        </motion.div>

        <div className={styles.sliderAndArrows}>
          <button className={`${styles.controlBtn} ${styles.leftArrow}`} onClick={scrollPrev}>
            <ChevronLeft size={24} />
          </button>

          <div className={styles.sliderContainer}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {db.team.map((member, index) => (
                  <div className={styles.embla__slide} key={index}>
                    <div className={`glass-card ${styles.card}`}>
                      <div className={styles.cardHeader}>
                        <div className={styles.avatar}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={styles.nameSection}>
                          <h3>{member.name}</h3>
                          <p className={styles.role}>{member.role}</p>
                        </div>
                      </div>
                      
                      <div className={styles.expertise}>
                        {member.expertise.map((exp, idx) => (
                          <span key={idx} className={styles.expBadge}>{exp}</span>
                        ))}
                      </div>
                      
                      <p className={styles.bio}>{member.bio}</p>
                      
                      <div className={styles.cardFooter}>
                         <div className={styles.decorationLine}></div>
                         <div className={styles.teamBadge}>Skyware Member</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.dots}>
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </div>

          <button className={`${styles.controlBtn} ${styles.rightArrow}`} onClick={scrollNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
