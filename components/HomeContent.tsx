'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import portfolioData from '@/data/portfolio.json';

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  contact: Contact,
};

export default function HomeContent() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <Navbar />

      <div className="flex flex-col gap-0">
        {portfolioData.sections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type];
          if (!Component) return null;

          return (
            <Component key={section.id} config={section.config} />
          );
        })}
      </div>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 bg-black/20">
        <p>&copy; {new Date().getFullYear()} Ajay Darisi. Built with Next.js.</p>
      </footer>
    </main>
  );
}
