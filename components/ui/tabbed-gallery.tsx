"use client";
import { useState } from "react";
import { Gallery } from "./gallery";
import { VideoGallery } from "./video-gallery";
import { IGallery, IVideoGallery } from "@/lib/types";

interface TabbedGalleryProps {
  images: IGallery[];
  videos?: IVideoGallery[];
}

export const TabbedGallery = ({ images, videos }: TabbedGalleryProps) => {
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  // Only show tabs if videos are available
  const hasVideos = videos && videos.length > 0;

  if (!hasVideos) {
    return <Gallery images={images} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "images"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "videos"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Videos
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "images" ? (
          <Gallery images={images} />
        ) : (
          <VideoGallery videos={videos!} />
        )}
      </div>
    </div>
  );
};
