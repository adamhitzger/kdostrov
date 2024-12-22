import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl: string = "https://kdostrov.cz";
    return {
      rules: [
        {
          userAgent: '*',
            allow: "/",
            disallow: "/studio"
        }
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl
    };
  }