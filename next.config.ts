import type {NextConfig} from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  // Enables React's Strict Mode, which highlights potential problems in an application.
  // It helps to identify unsafe lifecycles, legacy API usage, and other features.
  reactStrictMode: true,

  // Configuration for TypeScript.
  typescript: {
    // If you have errors in your TypeScript code, this allows you to still build the application.
    // It's recommended to resolve these errors, but this can be a temporary workaround.
    ignoreBuildErrors: true,
  },

  // Configuration for ESLint.
  eslint: {
    // If you have ESLint errors, this allows you to still build the application.
    // It's recommended to resolve these errors for code quality.
    ignoreDuringBuilds: true,
  },

  // Configuration for Next.js Image Optimization.
  // This allows you to use external images and have them optimized by Next.js.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
