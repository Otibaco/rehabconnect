import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2400',
    alt: 'Healthcare consultation digital workspace',
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2400',
    alt: 'Medical doctor holding compassionate dialogue',
  },
  {
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=2400',
    alt: 'Supportive recovery and compassionate care community',
  },
  {
    url: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=2400',
    alt: 'Serene therapy and rehabilitation environment',
  },
  {
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2400',
    alt: 'Compassionate medical care and patient guidance',
  },
];

export const HeroBackgroundSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: 'easeInOut' },
            scale: { duration: 7, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={heroImages[currentIndex].url}
            alt={heroImages[currentIndex].alt}
            className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1] saturate-[1.15]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Optimized Gradient Overlay: Soft dark backdrop behind text on left/bottom, clear view of imagery on right */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/55 to-transparent"></div>
    </div>
  );
};
