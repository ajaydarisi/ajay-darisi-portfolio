'use client';

import { SectionWrapper } from './SectionWrapper';
import { HeroRobot } from '../canvas/HeroRobot';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  config: {
    title: string;
    subtitle: string;
    tagline: string;
  };
}

export function Hero({ config }: HeroProps) {
  return (
    <SectionWrapper id="hero" className="justify-center items-center min-h-[100dvh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center h-full w-full">
        <div className="flex flex-col gap-4 md:gap-6 z-20 order-2 md:order-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 justify-center md:justify-start"
          >
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider">
              SYSTEM_ONLINE_
            </span>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 neon-text">
              {config.title.toUpperCase()}
            </h1>
            <h2 className="text-2xl md:text-3xl text-secondary font-bold tracking-[0.2em] font-display">
              {config.subtitle}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0 font-light leading-relaxed">
            {config.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-none border border-primary/50 relative overflow-hidden group px-5 py-3 md:px-8 md:py-6"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2 font-display text-sm md:text-lg tracking-widest">
                INITIALIZE_ <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>

            <Button size="lg" variant="outline" className="rounded-none border-white/10 hover:bg-white/5 backdrop-blur-sm group px-5 py-3 md:px-8 md:py-6" asChild>
              <a href="/Resume.pdf" download>
                <span className="flex items-center gap-2 font-display text-sm md:text-lg tracking-widest">
                  ARCHIVE_ <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
            </Button>
          </div>
        </div>

        <div className="h-[40vh] md:h-[90vh] w-full order-1 md:order-2 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none md:hidden" />
          <HeroRobot />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-primary"
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent" />
      </motion.div>
    </SectionWrapper>
  );
}
