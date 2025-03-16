"use client";
import { useState, useEffect } from "react";
import { ImageGallery } from "react-image-grid-gallery";

interface GalleryProps {
  images: { src: string; alt: string, caption: string }[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [shuffledImages, setShuffledImages] = useState(images);

  useEffect(() => {
    const shuffleArray = (array: typeof images) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setShuffledImages(shuffleArray(images));
  }, [images]);

  return (
    <div>
      <ImageGallery
        imagesInfoArray={shuffledImages}
        columnCount={3}
        gapSize={20}
      />
    </div>
  );
};