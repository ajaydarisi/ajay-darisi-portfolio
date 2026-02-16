'use client';

import { SectionWrapper } from './SectionWrapper';
import portfolioData from '@/data/portfolio.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsProps {
  config: {
    title: string;
  };
}

export function Projects({ config }: ProjectsProps) {
  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-4"
      >
        <Rocket className="w-3 h-3" />
        DEPLOYING_MODULES<span className="animate-pulse">...</span>
      </motion.div>
      <h2 className="text-4xl md:text-6xl font-bold font-display mb-12 text-center md:text-left">
        {config.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500" />
            
            <Card className="relative h-full bg-card border-white/10 overflow-hidden flex flex-col">
              <div className="h-48 w-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                 <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                   {/* Abstract project placeholder */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="w-24 h-24 rounded-full bg-primary/20 blur-xl" />
                      <div className="w-32 h-32 rounded-full bg-secondary/20 blur-xl ml-12" />
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-white/10 uppercase tracking-tighter">
                      Project 0{project.id}
                   </div>
                 </div>
                 <div className="absolute top-3 right-3 flex gap-2 z-10">
                    {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/code flex items-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-black/80 px-2.5 py-2 transition-all duration-300">
                      <Github className="w-4 h-4 shrink-0" />
                      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium group-hover/code:max-w-[60px] group-hover/code:ml-1.5 transition-all duration-300">
                        Code
                      </span>
                    </a>
                    )}
                    {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/demo flex items-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-black/80 px-2.5 py-2 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium group-hover/demo:max-w-[80px] group-hover/demo:ml-1.5 transition-all duration-300">
                        Live Demo
                      </span>
                    </a>
                    )}
                 </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/5 hover:bg-white/10 text-secondary border-none">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
