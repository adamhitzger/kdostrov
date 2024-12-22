import { sanityFetch } from "@/sanity/lib/fetch";
import { EventInterface, Gallery } from "@/sanity/lib/interfaces";
import { EVENTS_QUERY, GALLERIES_QUERY } from "@/sanity/lib/queries";
import { MetadataRoute } from "next";

type Route = {
    url: string;
    lastModified: string;
  };
export const dynamic = "force-dynamic"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl: string = "https://kdostrov.cz";
    const staticPages: Route[] = [
        "/",
        "/kontakt",
        "/program",
        "/plany",
        "/vybaveni",
        "/fotogalerie",
        "/history"
      ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString()
      }));
    const eventPromise: Route[] = await sanityFetch<EventInterface[]>({query: EVENTS_QUERY}).then((events) =>
        events.map((e: EventInterface) => ({
            url: `${baseUrl}/${e.slug}`,
            lastModified: new Date().toISOString()
        }))
    );
    const galleryPromise: Route[] = await sanityFetch<Gallery[]>({query: GALLERIES_QUERY}).then((galleries) =>
        galleries.map((g: Gallery) => ({
            url: `${baseUrl}/fotogalerie/${g.slug}`,
            lastModified: new Date().toISOString()
        }))
    );
    let fetchedRoutes: Route[] = [];
    try{
        fetchedRoutes = (await Promise.all([eventPromise, galleryPromise])).flat();

    }catch(error){
        throw JSON.stringify(error)
    } 
    return [...staticPages, ...fetchedRoutes];
}