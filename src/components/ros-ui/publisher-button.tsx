'use client';

import { useRos } from '@/components/ros-provider';
import { useState } from 'react';

// No imports of roslib here! We get it from the Context.

interface PublisherButtonProps {
  topic: string;
  type: string;
  data: any; 
  children: React.ReactNode;
}

export function PublisherButton({ topic, type, data, children }: PublisherButtonProps) {
  // 1. Get ROSLIB from the hook
  const { ros, isConnected, ROSLIB } = useRos();
  const [justClicked, setJustClicked] = useState(false);

  const handlePublish = () => {
    if (!ros || !isConnected) {
      alert('Robot is disconnected!');
      return;
    }

    if (!ROSLIB) {
      console.error("ROSLIB not loaded yet");
      return;
    }

    try {
      // 2. Use the library instance we got from the provider
      const rosTopic = new ROSLIB.Topic({
        ros: ros,
        name: topic,
        messageType: type,
      });

      const message = new ROSLIB.Message(data);

      rosTopic.publish(message);
      console.log(`Published to ${topic}:`, data);

      setJustClicked(true);
      setTimeout(() => setJustClicked(false), 200);

    } catch (e) {
      console.error("Publishing Failed:", e);
    }
  };

  return (
    <button
      onClick={handlePublish}
      disabled={!isConnected}
      className={`
        px-4 py-2 rounded font-medium transition-all duration-200 transform
        ${!isConnected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
          justClicked ? 'bg-green-600 scale-95' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'}
      `}
    >
      {children}
    </button>
  );
}