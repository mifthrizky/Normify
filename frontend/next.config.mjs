/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Perbaikan: Ambil parameter context '{ dev }'
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
