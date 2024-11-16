"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slide } from "@/lib/types";
import Link from 'next/link'

interface SlideShowProps {
  slides: Slide[];
}

export const Slideshow = ({ slides }: SlideShowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (slides.length - slidesToShow + 1));
  }, [slidesToShow, slides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (slides.length - slidesToShow + 1)) %
        (slides.length - slidesToShow + 1)
    );
  }, [slidesToShow, slides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setSlidesToShow(1);
        } else if (window.innerWidth < 1024) {
          setSlidesToShow(2);
        } else {
          setSlidesToShow(3);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);
  return (
    <>
      {slides.length > 0 ? (
        <div className="max-w-6xl mx-auto relative pb-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  <div className="p-2">
                    <div className="relative aspect-[3/4] group overflow-hidden rounded-lg">
                      <Image
                        src={slide.photo}
                        alt={slide.heading}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h2 className="text-white text-3xl font-serif mb-4">
                          {slide.heading}
                        </h2>
                        <Link
                          href={slide.link}
                          className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          View Page
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {slides.length > slidesToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/75 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {Array.from({ length: slides.length - slidesToShow + 1 }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? "bg-teal-500" : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No slides available</p>
        </div>
      )}
    </>
  );
};
