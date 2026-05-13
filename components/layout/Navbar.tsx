'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/lib/store';
import portfolioData from '@/data/portfolio.json';

const sectionLabels: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  skills: 'Expertise',
  experience: 'Experience',
  projects: 'Work',
  contact: 'Contact',
};

const links = portfolioData.sections.map((section) => ({
  id: section.id,
  label: sectionLabels[section.id] || section.config.title || section.type,
}));

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection, setIsScrollingTo } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (useUIStore.getState().isScrollingTo) return;

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

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
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto w-full max-w-[calc(72rem+2rem)] px-4 sm:max-w-[calc(72rem+3rem)] sm:px-6 lg:max-w-[calc(72rem+4rem)] lg:px-8">
          <nav className={cn(
            "flex items-center justify-between border px-4 py-3 transition-all duration-300 md:px-5",
            scrolled 
              ? "bg-white backdrop-blur-xl border-border/80 shadow-sm"
              : "bg-white backdrop-blur-md border-border/60"
          )}>
            <button
              className="flex items-center gap-3 text-left"
              onClick={() => scrollToSection('hero')}
              aria-label="Go to top"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-sm font-bold text-background shadow-sm">
                AD
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-extrabold text-foreground">Ajay Darisi</span>
                <span className="block text-xs font-medium text-muted-foreground">Software Engineer</span>
              </span>
            </button>

            <div className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "relative py-2 text-sm font-semibold transition-colors duration-200",
                    activeSection === link.id 
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-left bg-primary transition-transform duration-300",
                      activeSection === link.id ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
                <a href="/Resume.pdf" download>
                  Resume <Download className="h-4 w-4" />
                </a>
              </Button>
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
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 px-6 pt-28 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-sm flex-col gap-2">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "border-b border-border/70 py-4 text-left text-2xl font-bold transition-colors",
                  activeSection === link.id ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
            <Button className="mt-6" asChild>
              <a href="/Resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
