'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/ui/CustomCursor';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
      <CustomCursor />
    </TooltipProvider>
  );
}
