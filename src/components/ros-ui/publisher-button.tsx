'use client';

import { useRos } from '@/components/ros-provider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils'; // Optional: Use if you want cleaner class merging

interface PublisherButtonProps {
  topic: string;
  type: string;
  data: any; 
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string; // <--- 1. Add this definition
}

export function PublisherButton({ 
  topic, 
  type, 
  data, 
  children,
  variant = "default",
  className, // <--- 2. Receive it here
}: PublisherButtonProps) {
  const { ros, isConnected, ROSLIB } = useRos();
  const [justClicked, setJustClicked] = useState(false);

  const handlePublish = () => {
    if (!ros || !isConnected || !ROSLIB) return;

    try {
      const rosTopic = new ROSLIB.Topic({
        ros: ros,
        name: topic,
        messageType: type,
      });

      const message = new ROSLIB.Message(data);
      rosTopic.publish(message);
      
      console.log(`Published to ${topic}:`, data);

      setJustClicked(true);
      setTimeout(() => setJustClicked(false), 300);

    } catch (e) {
      console.error("Publishing Failed:", e);
    }
  };

  if (!isConnected) {
    // Pass className here too so layout doesn't break when offline
    return (
      <Button disabled variant="ghost" className={`gap-2 opacity-70 ${className}`}>
        <WifiOff className="h-4 w-4" />
        Offline
      </Button>
    );
  }

  return (
    <Button 
      onClick={handlePublish}
      // Use the variant prop (don't hardcode "outline") so you can override it if needed
      variant={justClicked ? "secondary" : variant}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </Button>
  );
}