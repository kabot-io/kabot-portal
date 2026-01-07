import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { PublisherButton } from '@/components/ros-ui/publisher-button';
import { SubscriberCard } from '@/components/ros-ui/subscriber-card';
import { TeleopJoystick } from './components/ros-ui/teleop-joystick';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    // 2. Register the component here
    PublisherButton,
    SubscriberCard,
    TeleopJoystick,
  };
}