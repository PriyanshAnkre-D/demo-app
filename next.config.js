/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://api-pub.bitfinex.com/v2/:path*',
      },
    ]
  },
}

module.exports = nextConfig
