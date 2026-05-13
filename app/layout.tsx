import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ajay.darisi.in'),
  title: 'Ajay Darisi - Software Engineer',
  description: 'Professional portfolio of Ajay Darisi, a software engineer building scalable web platforms, admin systems, and payment-enabled products.',
  openGraph: {
    title: 'Ajay Darisi - Software Engineer',
    description: 'Software engineer building scalable web platforms, admin systems, and payment-enabled products.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajay Darisi - Software Engineer',
    description: 'Software engineer building scalable web platforms, admin systems, and payment-enabled products.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon-64.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
