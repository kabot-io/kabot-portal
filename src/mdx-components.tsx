import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { PublisherButton } from '@/components/ros-ui/publisher-button';
import { SubscriberCard } from '@/components/ros-ui/subscriber-card';
import { TeleopJoystick } from './components/ros-ui/teleop-joystick';
import { ConnectionGuard } from './components/ros-ui/connection-guard';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    PublisherButton,
    SubscriberCard,
    TeleopJoystick,
    ConnectionGuard,
  };
}