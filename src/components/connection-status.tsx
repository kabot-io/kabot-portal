'use client';
import { useRos } from '@/components/ros-provider';

export function ConnectionStatus() {
  const { isConnected, status } = useRos();
  
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border text-xs font-mono">
      <div 
        className={`h-2 w-2 rounded-full transition-colors duration-500 ${
          isConnected ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-red-500'
        }`} 
      />
      <span>{status}</span>
    </div>
  );
}