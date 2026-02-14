import type { Metadata } from 'next';
import { Orbitron, Rajdhani, Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ajay Darisi - Full Stack Developer',
  description: '3D Portfolio of Ajay Darisi - Software Developer & Architect',
  openGraph: {
    title: 'Ajay Darisi - Full Stack Developer',
    description: '3D Portfolio of Ajay Darisi - Software Developer & Architect',
    type: 'website',
    images: ['/opengraph.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajay Darisi - Full Stack Developer',
    description: '3D Portfolio of Ajay Darisi - Software Developer & Architect',
    images: ['/opengraph.jpg'],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${orbitron.variable} ${rajdhani.variable} ${inter.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
