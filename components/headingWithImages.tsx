import SanityImage from "@/components/sanityImage";

export default function HeadingWithImages({ urls, heading }: { urls: string[], heading: string }) {
    return (
        <div className="w-full text-white text-5xl tracking-wide font-bold flex flex-col py-10">
            <div>
                <h1>{heading}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 w-full pt-14">
                {urls?.map((u: string, idx: number) => (
                    <div className="relative w-full h-screen rounded-lg" key={idx}>
                        <a href={u} download={u}>
                            <SanityImage src={u} alt={u} fill={true} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-fill w-full h-full rounded-lg hover:opacity-80" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

