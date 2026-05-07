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
        "w-full px-4 py-24 sm:px-6 md:py-28 lg:px-8 relative overflow-hidden scroll-mt-24",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl z-10 relative"
      >
        {children}
      </motion.div>
    </section>
  );
}
