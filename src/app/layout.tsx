import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ridwan Abdul Rohman - Personal Portfolio',
  description: 'Portfolio and profile of Ridwan Abdul Rohman, a Tech student specializing in Code, Cook, Data, and Photography.',
  icons: {
    icon: '/favicon.ico?v=2', // Tambahkan query string unik di sini
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {children}
      </body>
    </html>
  );
}