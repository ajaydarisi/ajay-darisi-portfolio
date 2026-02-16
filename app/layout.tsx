import type { Metadata } from 'next';
import { Orbitron, Poppins } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
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
    <html lang="en" className={`dark ${orbitron.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
