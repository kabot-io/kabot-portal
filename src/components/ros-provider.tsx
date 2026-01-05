'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface RosContextType {
  ros: any;
  isConnected: boolean;
  status: string;
  ROSLIB: any; // <--- New: We share the library instance
}

const RosContext = createContext<RosContextType | undefined>(undefined);

export function RosProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Disconnected');
  const [rosLibInstance, setRosLibInstance] = useState<any>(null); // Store the library here
  const rosRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // This function handles the async loading
    const initRos = async () => {
      // 1. Dynamic Import: Only loads in the browser!
      const module = await import('@/lib/roslib');
      const ROSLIB = module.default;
      
      // Save the library to state so other components can use it
      setRosLibInstance(ROSLIB);

      if (!rosRef.current) {
        try {
          rosRef.current = new ROSLIB.Ros({
            url: 'ws://localhost:9090',
          });
        } catch (err) {
          console.error("Failed to initialize ROS:", err);
        }
      }

      const ros = rosRef.current;
      if (!ros) return;

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

      ros.on('connection', handleConnection);
      ros.on('error', handleError);
      ros.on('close', handleClose);

      connect();
    };

    // Run the async init
    initRos();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (rosRef.current) {
        rosRef.current.close();
      }
    };
  }, []);

  return (
    <RosContext.Provider value={{ ros: rosRef.current, isConnected, status, ROSLIB: rosLibInstance }}>
      {children}
    </RosContext.Provider>
  );
}

export function useRos() {
  const context = useContext(RosContext);
  if (!context) throw new Error('useRos must be used within a RosProvider');
  return context;
}