/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
      deviceSizes: [640, 828, 1080, 1280, 1920],
      // cdn.sanity.io tu záměrně chybí: fotky ze Sanity jdou přes <SanityImage>,
      // optimalizátor by si stahoval celé originály a vyčerpal bandwidth kvótu.
      remotePatterns: [
        { protocol: "https", hostname: "gate.thepay.cz" },
        { protocol: "https", hostname: "www.firmy.cz" },
      ],
    },
    experimental: {
        taint: true,
    }
};

export default nextConfig;
