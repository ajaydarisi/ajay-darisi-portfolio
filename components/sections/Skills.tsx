'use client';

import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Wrench,
  Zap
} from 'lucide-react';

interface SkillsProps {
  config: {
    title: string;
  };
}

const CATEGORY_ICONS: Record<string, any> = {
  "Frontend": <Globe className="w-5 h-5" />,
  "Backend": <Database className="w-5 h-5" />,
  "Languages": <Code2 className="w-5 h-5" />,
  "Payments": <Zap className="w-5 h-5" />,
  "Tools": <Wrench className="w-5 h-5" />,
  "Auth": <ShieldCheck className="w-5 h-5" />,
  "Cloud": <Layers className="w-5 h-5" />
};

export function Skills({ config }: SkillsProps) {
  return (
    <SectionWrapper id="skills" className="relative">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary mb-4"
        >
          <Cpu className="w-3 h-3" />
          <span>SYSTEM_CAPABILITIES</span>
        </motion.div>
        <h2 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
          TECHNICAL <span className="text-primary">ARSENAL</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
          A specialized toolkit for building high-performance, 
          <span className="text-white"> scalable enterprise applications</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.skills.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative glass-panel p-8 rounded-2xl border-white/5 group-hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {CATEGORY_ICONS[category.category] || <Layers className="w-5 h-5" />}
                </div>
                <h3 className="text-2xl font-display font-bold text-white/90 tracking-tight">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {category.items.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="relative group/skill"
                  >
                    <span className="relative z-10 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-muted-foreground group-hover/skill:text-primary group-hover/skill:border-primary/50 group-hover/skill:bg-primary/5 transition-all duration-300 block">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative scanline effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent h-20 -translate-y-full animate-[scan_3s_linear_infinite]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Adding the keyframes for the scan animation directly in a style tag since it's a small custom utility */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
      `}} />
    </SectionWrapper>
  );
}
