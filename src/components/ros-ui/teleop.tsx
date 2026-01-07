'use client';

import { TeleopJoystick } from './teleop-joystick';
import { PublisherButton } from './publisher-button';
import { Gamepad2, ArrowUp, ArrowDown, RotateCcw, RotateCw } from 'lucide-react';

export function Teleop() {
  return (
    // Mimic the Card style using standard classes to avoid nested button issues
    <div className="flex flex-col items-center gap-4 max-w-xs mx-auto p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Gamepad2 className="w-5 h-5" />
        <span className="font-medium text-sm">Teleoperation</span>
      </div>
      {/* 1. Joystick Section */}
      <div className="scale-90">
        <TeleopJoystick />
      </div>

      {/* 2. D-Pad Section */}
      <div className="grid grid-cols-3 gap-1 items-center">
          
          {/* Left: Rotate CCW */}
          <div className="flex justify-end">
            <PublisherButton 
              topic="/turtle1/cmd_vel" 
              type="geometry_msgs/Twist" 
              className="h-10 w-10 p-0"
              data={{ linear: {x: 0, y: 0, z: 0}, angular: {x: 0, y: 0, z: 1.5} }}
            >
              <RotateCcw className="h-5 w-5" />
            </PublisherButton>
          </div>

          {/* Middle: Forward/Back */}
          <div className="flex flex-col gap-1">
            <PublisherButton 
              topic="/turtle1/cmd_vel" 
              type="geometry_msgs/Twist" 
              className="h-10 w-10 p-0"
              data={{ linear: {x: 2.0, y: 0, z: 0}, angular: {x: 0, y: 0, z: 0} }}
            >
              <ArrowUp className="h-5 w-5" />
            </PublisherButton>
            
            <PublisherButton 
              topic="/turtle1/cmd_vel" 
              type="geometry_msgs/Twist" 
              className="h-10 w-10 p-0"
              data={{ linear: {x: -2.0, y: 0, z: 0}, angular: {x: 0, y: 0, z: 0} }}
            >
              <ArrowDown className="h-5 w-5" />
            </PublisherButton>
          </div>
          
          {/* Right: Rotate CW */}
          <div className="flex justify-start">
            <PublisherButton 
              topic="/turtle1/cmd_vel" 
              type="geometry_msgs/Twist" 
              className="h-10 w-10 p-0"
              data={{ linear: {x: 0, y: 0, z: 0}, angular: {x: 0, y: 0, z: -1.5} }}
            >
              <RotateCw className="h-5 w-5" />
            </PublisherButton>
          </div>
      </div>
    </div>
  );
}