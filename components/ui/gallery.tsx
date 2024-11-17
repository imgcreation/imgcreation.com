"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryProps {
  images: { url: string; alt: string }[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const next = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const previous = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 -mx-4 sm:mx-0">
        {images.map((image, index) => (
          <div
            key={image.url}
            className="relative aspect-[3/4] cursor-pointer group overflow-hidden"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-none max-h-none w-screen h-screen p-0 bg-black/90">
            <DialogTitle className="sr-only">
              Image Gallery - {images[selectedImage].alt}
            </DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-50"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
                <Image
                  src={images[selectedImage].url}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                  priority
                />

                <button
                  onClick={previous}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};