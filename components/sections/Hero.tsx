'use client';

import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio.json';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  config: {
    title: string;
    subtitle?: string;
    tagline?: string;
  };
}

export function Hero({ config }: HeroProps) {
  const { about, profile } = portfolioData;

  return (
    <SectionWrapper id="hero" className="min-h-[100svh] flex items-center pt-24 pb-10 md:pt-28 md:pb-12 lg:pt-28 lg:pb-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-4"
          >
            <p className="section-eyebrow">{profile.name}</p>
            <h1 className="max-w-3xl text-balance font-display text-5xl font-extrabold leading-[0.98] text-foreground sm:text-6xl lg:text-6xl xl:text-7xl">
              Software engineer building scalable web platforms.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              I design and engineer dependable product experiences across admin systems,
              payment flows, localization platforms, and Supabase-backed applications.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Conversation <ArrowRight className="h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="/Resume.pdf" download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-y border-border py-5 sm:max-w-xl">
            {about.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-extrabold tabular-nums text-foreground md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="relative mx-auto w-full max-w-[420px] lg:mr-0"
        >
          <div className="premium-card relative aspect-[4/5] max-h-[calc(100svh-220px)] overflow-hidden rounded-lg p-2">
            <div className="relative h-full overflow-hidden rounded-md bg-muted">
              <Image
                src="/Ajay.jpeg"
                alt={`${config.title}, ${config.subtitle}`}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-lg border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Current focus</p>
            <p className="mt-1.5 text-base font-bold text-foreground">
              Shipping reliable web products for global teams.
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
