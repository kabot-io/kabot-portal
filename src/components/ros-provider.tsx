'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useRosLoader } from '@/hooks/use-ros-loader';

interface RosContextType {
  ros: any;
  isConnected: boolean;
  status: string;
  ROSLIB: any;
}

const RosContext = createContext<RosContextType | undefined>(undefined);

export function RosProvider({ children }: { children: React.ReactNode }) {
  const ROSLIB = useRosLoader(); // <--- 1. Hook handles the loading magic
  
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Disconnected');
  const rosRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Effect only runs once ROSLIB is ready
  useEffect(() => {
    if (!ROSLIB) return;

    // Initialize ROS instance if not already done
    if (!rosRef.current) {
      try {
        rosRef.current = new ROSLIB.Ros({
          url: 'ws://localhost:9090',
        });
      } catch (err) {
        console.error("Failed to initialize ROS:", err);
        return;
      }
    }

    const ros = rosRef.current;
    
    // Connection Helpers
    function connect() {
      if (ros?.isConnected) return;
      console.log('Attempting to connect...');
      setStatus('Connecting...');
      try {
        ros.connect('ws://localhost:9090');
      } catch (err) {
        console.error('Connection problem: ', err);
      }
    }

    const handleConnection = () => {
      console.log('Connected to websocket server.');
      setIsConnected(true);
      setStatus('Connected');
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };

    const handleError = (error: any) => {
      setIsConnected(false);
      setStatus('Error');
    };

    const handleClose = () => {
      console.log('Connection closed. Reconnecting in 3s...');
      setIsConnected(false);
      setStatus('Disconnected');
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    };

    // Event Listeners
    ros.on('connection', handleConnection);
    ros.on('error', handleError);
    ros.on('close', handleClose);

    // Initial Connect Call
    connect();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      // We don't close the connection here to prevent "flickering" 
      // if the provider re-renders, but we do remove listeners.
      ros.off('connection', handleConnection);
      ros.off('error', handleError);
      ros.off('close', handleClose);
    };
  }, [ROSLIB]); // <--- 3. Re-run this logic only when the library loads

  return (
    <RosContext.Provider value={{ ros: rosRef.current, isConnected, status, ROSLIB }}>
      {children}
    </RosContext.Provider>
  );
}

export function useRos() {
  const context = useContext(RosContext);
  if (!context) throw new Error('useRos must be used within a RosProvider');
  return context;
}