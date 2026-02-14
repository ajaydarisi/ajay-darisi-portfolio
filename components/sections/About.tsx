'use client';

import { SectionWrapper } from './SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import profileData from '@/data/portfolio.json';

interface AboutProps {
  config: {
    title: string;
  };
}

export function About({ config }: AboutProps) {
  const { profile } = profileData;

  return (
    <SectionWrapper id="about" className="bg-background/50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="col-span-1 md:col-span-7 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
            {config.title}
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
            <p>
              I am a <span className="text-primary font-medium">{profile.role}</span> based in {profile.location}. 
              With over 3 years of experience, I specialize in building scalable web applications and intuitive user interfaces.
            </p>
            <p>
              My journey started with a passion for turning complex problems into elegant solutions. 
              I have led cross-functional teams, optimized high-traffic platforms, and built systems used globally.
            </p>
            <p>
              I believe in the power of <span className="text-secondary font-medium">clean code</span>, 
              <span className="text-secondary font-medium"> user-centric design</span>, and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { label: 'Experience', value: '3+ Years' },
              { label: 'Projects', value: '20+' },
              { label: 'Clients', value: 'Global' },
              { label: 'Coffee', value: 'Infinite' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-sm border-l-2 border-l-primary">
                <div className="text-2xl font-bold font-display text-white">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-5 relative">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative h-full w-full glass-panel rounded-2xl overflow-hidden border border-white/10 p-2">
               <div className="h-full w-full bg-black/50 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel rounded-lg translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm font-mono text-primary">Location_</p>
                    <p className="text-white font-bold">{profile.location}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
