/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com", "localhost", "backend.spiderpie.com", "staging-images.spiderpie.com", "images.spiderpie.com"],
    unoptimized: true
  },
};

export default nextConfig;
