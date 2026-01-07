'use client';

import { useRos } from '@/components/ros-provider';
import { AlertCircle, Cable } from 'lucide-react';
import Link from 'next/link';

interface ConnectionGuardProps {
  children: React.ReactNode;
  docsLink?: string; // Optional custom link
}

export function ConnectionGuard({ 
  children, 
  docsLink = "/docs/setup" // Default link if none provided
}: ConnectionGuardProps) {
  const { isConnected } = useRos();

  // SCENARIO 1: Connected -> Show the actual tool (Joystick, Button, etc.)
  if (isConnected) {
    return <>{children}</>;
  }

  // SCENARIO 2: Disconnected -> Show the Error Note
  return (
    <div className="my-6 rounded-lg border border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20 p-4">
      <div className="flex gap-3">
        {/* Icon */}
        <div className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-500">
          <AlertCircle className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3 className="font-medium text-amber-900 dark:text-amber-200 text-sm">
            ROS Bridge Connection Required
          </h3>
          
          <p className="text-sm text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
            This component requires an active WebSocket connection to your robot. 
            Please ensure <code>rosbridge_server</code> is running.
          </p>

          {/* Action Link */}
          <div className="pt-1">
            <Link 
              href={docsLink}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200 underline underline-offset-4 transition-colors"
            >
              <Cable className="h-3 w-3" />
              How to connect to local ROS 2
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}