/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
    },
    experimental: {
        taint: true,
    }
};

export default nextConfig;
