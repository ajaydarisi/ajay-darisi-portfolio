'use client';

import { SectionWrapper } from './SectionWrapper';
import projectsData from '@/data/projects.json';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  config: {
    title: string;
  };
}

export function Projects({ config }: ProjectsProps) {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-4xl md:text-6xl font-bold font-display mb-12 text-center md:text-left">
        {config.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500" />
            
            <Card className="relative h-full bg-card border-white/10 overflow-hidden flex flex-col">
              <div className="h-48 w-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                 {/* Abstract project placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-24 h-24 rounded-full bg-primary/20 blur-xl" />
                    <div className="w-32 h-32 rounded-full bg-secondary/20 blur-xl ml-12" />
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-white/10 uppercase tracking-tighter">
                    Project 0{project.id}
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
              
              <CardFooter className="flex gap-4 pt-4 border-t border-white/5">
                <Button variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-white/5">
                  <Github className="w-4 h-4 mr-2" /> Code
                </Button>
                <Button variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
