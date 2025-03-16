"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AutoCarouselProps {
  images: { 
    url: string; 
    alt: string;
    className?: string;
  }[];
}

export const Carousel = ({ images }: AutoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const previous = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(next, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, next]);

  return (
    <div className="flex justify-center items-center h-[60vh] mb-5">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className={`object-cover ${image.className || ''}`}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? (
            <Play className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
          ) : (
            <Pause className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
          )}
        </button>

        <button
          onClick={previous}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
        </button>

        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-white" : "bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
