'use client'
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-colors duration-200 theme-text-muted hover:text-(--color-text) hover:bg-(--color-surface-muted) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) theme-transition ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 transition-colors" />
        ) : (
          <Sun className="w-5 h-5 transition-colors" />
        )}
      </motion.div>
    </button>
  );
};
