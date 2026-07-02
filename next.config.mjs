/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://malaika.somee.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
