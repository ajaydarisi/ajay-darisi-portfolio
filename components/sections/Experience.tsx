'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { CheckCircle2, Activity } from 'lucide-react';

interface ExperienceProps {
  config: {
    title: string;
  };
}

export function Experience({ config }: ExperienceProps) {
  return (
    <SectionWrapper id="experience">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-4"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <Activity className="w-3 h-3" />
        RUNTIME_LOG://CAREER_PATH
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-bold font-display mb-12 text-center md:text-left">
        {config.title}
      </h2>

      <div className="space-y-12 relative border-l-2 border-white/5 ml-4 md:ml-12 pl-8 md:pl-12 py-4">
        {portfolioData.experience.map((job, idx) => (
          <div key={job.id} className="relative group">
            {/* Timeline dot */}
            <div className={`absolute -left-[41px] md:-left-[59px] top-0 h-5 w-5 rounded-full border-2 border-primary transition-all duration-300 shadow-[0_0_10px_theme(colors.primary.DEFAULT)] ${job.id === 1 ? 'bg-primary scale-125' : 'bg-background'}`} />
            
            <div className="glass-panel p-6 md:p-8 rounded-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 font-display text-9xl font-black text-white pointer-events-none">
                 0{idx + 1}
               </div>
               
               <div className="relative z-10">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                   <div>
                     <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{job.role}</h3>
                     <p className="text-lg text-secondary">{job.company}</p>
                   </div>
                   <span className="text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded border border-white/10 w-fit">
                     {job.period}
                   </span>
                 </div>
                 
                 <ul className="space-y-3 mt-6">
                   {job.achievements.map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm md:text-base">
                       <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
