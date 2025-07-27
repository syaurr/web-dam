'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const headerLinks = [
  { name: 'Code', href: '/#code' },
  { name: 'Cook', href: '/#cook' },
  { name: 'Data', href: '/#data' },
  { name: 'Photography', href: '/#photography' },
];

interface HeaderProps {
  currentSection?: string;
}

export default function Header({ currentSection }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="flex space-x-2 text-lg font-medium text-gray-700">
        {headerLinks.map((link, index) => (
          <Link key={link.name} href={link.href} scroll={false} className="hover:text-gray-900 transition-colors">
            {link.name}
            {index < headerLinks.length - 1 && <span className="mx-1">|</span>}
          </Link>
        ))}
      </div>

      <nav className="flex items-center space-x-4">
        {pathname !== '/admin/login' && (
          <Link href="/admin/login" className="text-gray-700 hover:text-gray-900 transition-colors text-lg font-medium">
            Admin Login
          </Link>
        )}
        {currentSection && (
          <div className="flex items-center">
            <span className="text-gray-700 text-lg font-medium capitalize">{currentSection}</span>
            <svg className="w-6 h-6 ml-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
        )}
      </nav>
    </header>
  );
}