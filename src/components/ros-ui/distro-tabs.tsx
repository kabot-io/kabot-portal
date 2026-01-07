'use client';

import { Tabs, TabsProps } from 'fumadocs-ui/components/tabs';
import { Children, isValidElement, ReactNode } from 'react';

// 1. Define your Source of Truth
const DISTROS = ['Humble', 'Jazzy'] as const;

export function DistroTabs(props: Partial<TabsProps>) {
  // 2. SAFETY CHECK (Development Only)
  if (process.env.NODE_ENV === 'development') {
    const children = Children.toArray(props.children);
    
    // Extract the 'value' prop from each <Tab> child
    const providedDistros = children
      .map(child => isValidElement(child) ? child.props.value : null)
      .filter(Boolean);

    // Find which ones are missing
    const missing = DISTROS.filter(d => !providedDistros.includes(d));

    if (missing.length > 0) {
      // Return a big red error box so you can't miss it
      return (
        <div className="my-4 p-4 border-2 border-red-500 bg-red-50 text-red-700 rounded-lg">
          <p className="font-bold">⚠️ Documentation Error</p>
          <p>
            This <code>&lt;DistroTabs&gt;</code> is missing content for: 
            <span className="font-mono font-bold ml-1">{missing.join(', ')}</span>
          </p>
        </div>
      );
    }
  }

  return (
    <Tabs 
      {...props}
      groupId="ros-distro-sync"  // Keeps all tabs on the site in sync
      items={DISTROS}            // Automatically generates the tab headers
      persist                    // Remembers selection on refresh
    >
      {props.children}
    </Tabs>
  );
}