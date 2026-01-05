import { useEffect, useState } from 'react';

export function useRosLoader() {
  const [rosLib, setRosLib] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (typeof window === 'undefined') return;
      
      try {
        // Load your local patched file
        const module = await import('@/lib/roslib');
        if (mounted) {
          setRosLib(module.default);
        }
      } catch (err) {
        console.error("Failed to load roslib", err);
      }
    }

    load();

    return () => { mounted = false; };
  }, []);

  return rosLib;
}