import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // 1. Force Next.js to re-compile roslib for the browser
  transpilePackages: ['roslib'],

  // 2. Polyfill Node.js modules (fs, net, etc.) for the browser
  // Note: This applies to 'next build'. Turbopack (dev) handles some of this automatically.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dgram: false,
      };
    }
    return config;
  },
};

export default withMDX(config);