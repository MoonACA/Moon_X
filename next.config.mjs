/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["bakurgmtpedjcnadobmy.supabase.co"],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@aws-sdk/client-s3",
      "@aws-sdk/lib-storage",
      "aws-sdk",
    ],
  },
};

export default nextConfig;
