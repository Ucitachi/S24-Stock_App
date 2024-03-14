/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
  images: {  // Keep existing image configuration
      domains: ["localhost"],
      remotePatterns: [
          {
              protocol: "https",
              hostname: "cdn.sanity.io",
              port: "",
          }
      ]
  }, 
};

module.exports = nextConfig;
