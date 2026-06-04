import type {Metadata} from 'next';
import { Hanken_Grotesk, Inter } from 'next/font/google';
import './globals.css'; // Global styles
import VisitorTracker from '@/components/VisitorTracker';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Geosolvix | The Agentic GIS Platform',
  description: 'Geosolvix is an agentic GIS platform providing high-performance geospatial solutions and tools to solve critical geographic problems for authorities and municipal teams all over the world.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${hanken.variable} ${inter.variable}`}>
      <body className="font-sans font-normal text-[#181b24] bg-[#faf9ff] antialiased" suppressHydrationWarning>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
