import { sanityFetch } from "@/sanity/lib/fetch";
import { EventCard, GalleryCard, } from "@/sanity/lib/interfaces";
import { CAROUSEL_QUERY,  GALLERY_MAINPAGE_QUERY} from "@/sanity/lib/queries";
import ImageSlider from "@/components/imageSlider";
import Gallery from "@/components/mainGallery";
import Events from "@/components/events";

export default async function Home() {
  const carouselPromise = await sanityFetch<EventCard[]>({ query: CAROUSEL_QUERY });
  const galleryPromise = await sanityFetch<GalleryCard[]>({ query: GALLERY_MAINPAGE_QUERY });
  const [carousel, gallery] = await Promise.all([
    carouselPromise,
    galleryPromise
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 text-white">

     
        <ImageSlider slides={carousel} />
      <Events events={carousel}/>
     <Gallery gallery={gallery}/>
    </main>
  );
}
