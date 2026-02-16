'use client';

import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send, Radio, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import profileData from '@/data/portfolio.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactProps {
  config: {
    title: string;
  };
}

export function Contact({ config }: ContactProps) {
  const { profile } = profileData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Message sent successfully!', {
          description: "I'll get back to you soon.",
        });
        reset();
      } else {
        toast.error('Failed to send message', {
          description: 'Please try again later.',
        });
      }
    } catch {
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    }
  };

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
            <span>OPEN_CHANNEL<span className="animate-pulse">_</span></span>
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  {...register('name')}
                  placeholder="John Doe"
                  className="bg-black/20 border-white/10 focus:border-primary/50"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register('email')}
                  placeholder="john@example.com"
                  type="email"
                  className="bg-black/20 border-white/10 focus:border-primary/50"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                {...register('subject')}
                placeholder="Project Inquiry"
                className="bg-black/20 border-white/10 focus:border-primary/50"
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                {...register('message')}
                placeholder="Tell me about your project..."
                className="min-h-[150px] bg-black/20 border-white/10 focus:border-primary/50 resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12"
            >
              {isSubmitting ? (
                <>Sending... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
              ) : (
                <>Send Message <Send className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </SectionWrapper>
  );
}
