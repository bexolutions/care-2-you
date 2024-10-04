/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ]
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/customers',
        permanent: true, // Use true for a 301 redirect, false for a 302 redirect
      },
    ];
  },
};

module.exports = nextConfig;
