'use client';

import { useRos } from '@/components/ros-provider';
import { Joystick, JoystickShape } from 'react-joystick-component';
import { useState, useRef } from 'react';
import { Card } from 'fumadocs-ui/components/card';

// TUNING CONSTANTS
const MAX_LINEAR = 2.0;  // Max forward speed (m/s)
const MAX_ANGULAR = 2.0; // Max turn speed (rad/s)
const DIAGONAL_COMPENSATION_FACTOR = 1.5; // "Overdrive" to make diagonals reach max speed

interface IJoystickUpdateEvent {
  type: "move" | "stop" | "start";
  x: number | null;
  y: number | null;
  direction: "FORWARD" | "RIGHT" | "LEFT" | "BACKWARD" | null;
}

export function TeleopJoystick() {
  const { ros, isConnected, ROSLIB } = useRos();
  const [status, setStatus] = useState('Idle');
  const lastPublishTime = useRef<number>(0);

  // Helper: Convert circular joystick input to square output
  // This ensures that Top-Left gives you (Max Speed, Max Turn)
  const mapCircleToSquare = (val: number) => {
    // 1. Scale up the value so diagonals reach ~1.0
    let scaled = val * DIAGONAL_COMPENSATION_FACTOR;
    // 2. Clamp it so cardinal directions (Straight Up) don't exceed 1.0
    return Math.max(-1, Math.min(1, scaled));
  };

  const handleMove = (event: IJoystickUpdateEvent) => {
    if (!ros || !isConnected || !ROSLIB) return;

    const now = Date.now();
    if (now - lastPublishTime.current < 50) return; // 20hz update rate

    // 1. Normalize inputs (-1 to 1) with square mapping
    const rawX = event.x || 0;
    const rawY = event.y || 0;

    const normX = mapCircleToSquare(rawX);
    const normY = mapCircleToSquare(rawY);

    // 2. Apply Speed Limits
    const linearVel = normY * MAX_LINEAR; 
    const angularVel = -normX * MAX_ANGULAR; // Invert X for intuitive turning

    const cmdVel = new ROSLIB.Topic({
      ros: ros,
      name: '/turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    const twist = new ROSLIB.Message({
      linear: { x: linearVel, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: angularVel } 
    });

    cmdVel.publish(twist);
    
    setStatus(`Lin: ${linearVel.toFixed(2)}, Ang: ${angularVel.toFixed(2)}`);
    lastPublishTime.current = now;
  };

  const handleStop = () => {
    if (!ros || !isConnected || !ROSLIB) return;

    const cmdVel = new ROSLIB.Topic({
      ros: ros,
      name: '/turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    const stopMsg = new ROSLIB.Message({
      linear: { x: 0, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: 0 }
    });

    cmdVel.publish(stopMsg);
    setStatus('Stopped');
  };

  return (
      <Joystick 
        size={100}
        sticky={false}
        baseColor="var(--secondary)"
        stickColor="var(--primary)"
        baseShape={JoystickShape.Square}
        stickShape={JoystickShape.Square}
        move={handleMove}
        stop={handleStop}
      />
  );
}