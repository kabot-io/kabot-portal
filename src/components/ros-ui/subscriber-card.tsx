'use client';

import { useRos } from '@/components/ros-provider';
import { useEffect, useState } from 'react';
import { Terminal, Wifi, WifiOff } from 'lucide-react'; // Icons for UI

interface SubscriberCardProps {
  topic: string;
  type: string;
}

export function SubscriberCard({ topic, type }: SubscriberCardProps) {
  const { ros, isConnected, ROSLIB } = useRos();
  const [message, setMessage] = useState<any>(null);
  const [lastReceived, setLastReceived] = useState<Date | null>(null);

  useEffect(() => {
    if (!ros || !isConnected || !ROSLIB) return;

    // 1. Create the Topic listener
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: topic,
      messageType: type,
    });

    // 2. Define the callback
    const subscription = (msg: any) => {
      setMessage(msg);
      setLastReceived(new Date());
    };

    // 3. Subscribe
    console.log(`Subscribing to ${topic}...`);
    listener.subscribe(subscription);

    // 4. Cleanup on unmount (Stop listening when user leaves page)
    return () => {
      console.log(`Unsubscribing from ${topic}...`);
      listener.unsubscribe();
    };
  }, [ros, isConnected, ROSLIB, topic, type]);

  return (
    <div className="my-4 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm font-medium">{topic}</span>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border">
            {type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 font-mono text-xs">
        {message ? (
          <div className="animate-in fade-in duration-300">
            <pre className="overflow-x-auto whitespace-pre-wrap break-all text-blue-600 dark:text-blue-400">
              {JSON.stringify(message, null, 2)}
            </pre>
            <div className="mt-2 text-[10px] text-muted-foreground text-right">
              Received: {lastReceived?.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground py-4 text-center italic">
            Waiting for messages...
          </div>
        )}
      </div>
    </div>
  );
}