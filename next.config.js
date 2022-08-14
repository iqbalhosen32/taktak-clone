/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.shutterstock.com', 'lh3.googleusercontent.com']
  },
  swcMinify: true,
}

module.exports = nextConfig
