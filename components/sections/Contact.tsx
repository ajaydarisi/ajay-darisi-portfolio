'use client';

import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
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
    <SectionWrapper id="contact" className="pb-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow mb-4"
          >
            Contact
          </motion.div>
          <h2 className="text-balance font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
            {config.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            Have a product, platform, or workflow that needs thoughtful engineering?
            Send a note and I will respond with next steps.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${profile.email}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${profile.phone}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>

        </div>

        <Card className="premium-card p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Name</label>
                <Input
                  {...register('name')}
                  placeholder="John Doe"
                  className="border-border bg-background/70 focus-visible:ring-ring/20"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  {...register('email')}
                  placeholder="john@example.com"
                  type="email"
                  className="border-border bg-background/70 focus-visible:ring-ring/20"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Subject</label>
              <Input
                {...register('subject')}
                placeholder="Project Inquiry"
                className="border-border bg-background/70 focus-visible:ring-ring/20"
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Message</label>
              <Textarea
                {...register('message')}
                placeholder="Tell me about your project..."
                className="min-h-[160px] resize-none border-border bg-background/70 focus-visible:ring-ring/20"
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full"
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
