"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button";
import { useState, Suspense } from "react";

export default function Carousel({ photos }: { photos: string[] }) {
    console.log(photos)
    const [imageIndex, setImageIndex] = useState(0);

    function showNextImage() {
        setImageIndex((index) => {
            if (index === photos.length - 1) return photos.length - 1;
            return index + 1;
        });
    }

    function showPrevImage() {
        setImageIndex((index) => {
            if (index === 0) return photos.length - 1;
            return index - 1;
        });
    }

    return (
        <section className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-4/5">

            </div>
            <div className=" w-full md:w-1/5">
                <div>
                    <Button>
                        <ArrowRight />
                    </Button>
                </div>

                <div>
                    <Button>
                        <ArrowLeft />
                    </Button>
                </div>
            </div>
        </section>
    )
}

