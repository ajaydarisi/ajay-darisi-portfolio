'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useUIStore } from '@/lib/store';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isActiveInView = useInView(ref, { amount: 0.3 });
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const isScrollingTo = useUIStore((s) => s.isScrollingTo);

  useEffect(() => {
    if (isActiveInView && !isScrollingTo) {
      setActiveSection(id);
    }
  }, [isActiveInView, id, setActiveSection, isScrollingTo]);

  return (
    <section 
      id={id} 
      ref={ref}
      className={cn(
        "min-h-screen w-full flex flex-col justify-center px-4 md:px-12 py-20 relative overflow-hidden",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full z-10 relative"
      >
        {children}
      </motion.div>
    </section>
  );
}
