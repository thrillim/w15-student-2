/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  }, 
  async rewrites() {
    return [
      {
        source: "/api/createStudent",
        destination: `http://localhost:3000/api/createStudent`,
      },
    ];
  },
}

module.exports = nextConfig
