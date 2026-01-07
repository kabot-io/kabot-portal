'use client';

import { useRos } from '@/components/ros-provider';
import { Callout } from 'fumadocs-ui/components/callout';
import { Cable } from 'lucide-react';
import Link from 'next/link';

interface ConnectionGuardProps {
  children: React.ReactNode;
  docsLink?: string; 
}

export function ConnectionGuard({ 
  children, 
  docsLink = "/docs/setup" 
}: ConnectionGuardProps) {
  const { isConnected } = useRos();

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Show Callout at the top if disconnected */}
      {!isConnected && (
        <Callout type="error" icon={<Cable className="text-red-500" />}>
          This component requires an active WebSocket connection to your robot. 
          Please ensure <code>rosbridge_server</code> is running. 
          <br />
          <br />
          <Link href={docsLink} className="underline underline-offset-4 hover:opacity-80">
            Click here for setup instructions.
          </Link>
        </Callout>
      )}

      {/* 2. Always show children, but apply disabled styles if disconnected */}
      <div 
        className={`transition-all duration-300 ${
          !isConnected 
            ? 'opacity-50 grayscale pointer-events-none select-none blur-[1px]' 
            : ''
        }`}
        // aria-hidden tells screen readers to ignore this content when disabled
        aria-hidden={!isConnected} 
      >
        {children}
      </div>
    </div>
  );
}