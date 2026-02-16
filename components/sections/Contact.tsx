'use client';

import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import profileData from '@/data/portfolio.json';

interface ContactProps {
  config: {
    title: string;
  };
}

export function Contact({ config }: ContactProps) {
  const { profile } = profileData;

  return (
    <SectionWrapper id="contact" className="min-h-fit pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider mb-4"
          >
            <Radio className="w-3 h-3" />
            OPEN_CHANNEL<span className="animate-pulse">_</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
            {config.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light">
            Ready to start a project? Let's build something amazing together.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${profile.phone}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="text-lg font-medium">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="glass-panel border-white/10 p-6 md:p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="John Doe" className="bg-black/20 border-white/10 focus:border-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="john@example.com" type="email" className="bg-black/20 border-white/10 focus:border-primary/50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Project Inquiry" className="bg-black/20 border-white/10 focus:border-primary/50" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Tell me about your project..." 
                className="min-h-[150px] bg-black/20 border-white/10 focus:border-primary/50 resize-none" 
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
              Send Message <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Card>
      </div>
    </SectionWrapper>
  );
}
