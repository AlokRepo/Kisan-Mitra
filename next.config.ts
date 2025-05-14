import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['56567-firebase-studio-1747214151338.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev'],
  devIndicators: {
    autoPrerender: false,
  },
};

export default nextConfig;
