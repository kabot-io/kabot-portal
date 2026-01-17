import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { PublisherButton } from '@/components/ros-ui/publisher-button';
import { SubscriberCard } from '@/components/ros-ui/subscriber-card';
import { TeleopJoystick } from './components/ros-ui/teleop-joystick';
import { ConnectionGuard } from './components/ros-ui/connection-guard';
import { DistroTabs } from './components/ros-ui/distro-tabs';
import { Tab } from 'fumadocs-ui/components/tabs';
import { Teleop } from '@/components/ros-ui/teleop';
import { YouTube } from './components/ui/youtube';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    PublisherButton,
    SubscriberCard,
    TeleopJoystick,
    ConnectionGuard,
    DistroTabs,
    YouTube,
    Teleop,
    Tab,
  };
}