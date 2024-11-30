"use client";
import { ImageGallery } from "react-image-grid-gallery";

interface GalleryProps {
  images: { src: string; alt: string, caption: string }[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div>
      <ImageGallery
        imagesInfoArray={images}
        columnCount={3}
        gapSize={20}
      />
    </div>
  );
};