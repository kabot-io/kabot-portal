import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
// 1. Import the provider
import { RosProvider } from '@/components/ros-provider';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {/* 2. Wrap the children inside RootProvider */}
          <RosProvider>
            {children}
          </RosProvider>
        </RootProvider>
      </body>
    </html>
  );
}