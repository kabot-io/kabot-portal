import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
// 1. Import the status widget
import { ConnectionStatus } from '@/components/connection-status';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      {...baseOptions}
      // 2. Add the nav configuration
      nav={{
        children: <ConnectionStatus />, 
      }}
    >
      {children}
    </DocsLayout>
  );
}