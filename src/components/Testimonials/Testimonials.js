"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import db from '../../Database/db.json';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
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
    <section id="testimonials" className={styles.testimonials}>
      <div className={`container ${styles.testimonialWrapper}`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.subtitle}>Client Testimonials</span>
          <h2 className="outfit-font">What <span className="text-gradient">People Say</span></h2>
        </motion.div>

        <div className={styles.sliderAndArrows}>
          <button className={`${styles.controlBtn} ${styles.leftArrow}`} onClick={scrollPrev}>
            <ChevronLeft size={24} />
          </button>

          <div className={styles.sliderContainer}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {db.testimonials.map((testimonial) => (
                  <div className={styles.embla__slide} key={testimonial.id}>
                    <div className={`glass-card ${styles.card}`}>
                      <Quote size={40} className={styles.quoteIcon} />
                      <div className={styles.author}>
                        <div className={styles.avatar}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4>{testimonial.name}</h4>
                          <p>{testimonial.role}</p>
                        </div>
                      </div>
                      <div className={styles.stars}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="var(--accent-primary)" color="var(--accent-primary)" />
                        ))}
                      </div>
                      <p className={styles.comment}>"{testimonial.comment}"</p>
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
