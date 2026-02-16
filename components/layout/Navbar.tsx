'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store';
import portfolioData from '@/data/portfolio.json';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection, setIsScrollingTo } = useUIStore();

  const links = portfolioData.sections.map(s => ({
    id: s.id,
    label: s.config.title || s.type
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrollingTo(true);
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setTimeout(() => setIsScrollingTo(false), 1000);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className={cn(
            "flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300",
            scrolled 
              ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-lg" 
              : "bg-transparent border-transparent"
          )}>
            <div className="flex items-center gap-2 font-display font-bold text-xl tracking-tighter" onClick={() => scrollToSection('hero')}>
              <div className="w-8 h-8 px-6 rounded-lg bg-primary flex items-center justify-center text-white">
                AD
              </div>
              <span className="hidden sm:inline-block">AJAY DARISI</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeSection === link.id 
                      ? "bg-primary text-white shadow-lg shadow-primary/25" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-3xl font-display font-bold text-left text-muted-foreground hover:text-white hover:pl-4 transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
