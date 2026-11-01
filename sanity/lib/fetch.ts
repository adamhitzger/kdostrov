import type { ClientPerspective, QueryParams } from "next-sanity";
import { draftMode } from "next/headers";

import { client } from "./client";
import { token } from "./token";

/**
 * Data cache se obnovuje webhookem ze Sanity po publikování (app/api/revalidate/route.ts),
 * který invaliduje `tags` = `_type` změněného dokumentu. Hodina je jen pojistka pro případ,
 * že webhook selže — dřív to bylo 30 s, tedy až ~86k dotazů měsíčně na každý dotaz.
 */
const REVALIDATE_FALLBACK = 3600;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  perspective = draftMode().isEnabled ? "previewDrafts" : "published",
  stega = perspective === "previewDrafts" ||
    process.env.VERCEL_ENV === "preview",
}: {
  query: string;
  params?: QueryParams;
  /** Typy dokumentů, ze kterých dotaz čte — podle nich webhook invaliduje cache. */
  tags: string[];
  perspective?: Omit<ClientPerspective, "raw">;
  stega?: boolean;
}) {
  if (perspective === "previewDrafts") {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: "previewDrafts",
      token,
      useCdn: false,
      next: { revalidate: 0 },
    });
  }
  return client.fetch<QueryResponse>(query, params, {
    stega,
    perspective: "published",
    // Živé API, ne API CDN: ta drží odpovědi až 60 s, takže refetch hned po webhooku
    // by dostal ještě verzi před publikováním a cache si ji uložila na další hodinu.
    // Návštěvníky obsluhuje data cache Nextu, na Sanity jde dotaz jen po webhooku
    // nebo po REVALIDATE_FALLBACK.
    useCdn: false,
    next: { revalidate: REVALIDATE_FALLBACK, tags },
  });
}
