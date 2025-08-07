"use client";
import { useState, useEffect } from "react";
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

  // Handle URL hash on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#video" && hasVideos) {
        setActiveTab("videos");
      } else if (hash === "#image") {
        setActiveTab("images");
      }
    }
  }, [hasVideos]);

  // Update URL hash when tab changes
  const handleTabChange = (tab: "images" | "videos") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const newHash = tab === "videos" ? "#video" : "#image";
      window.history.replaceState(null, "", window.location.pathname + newHash);
    }
  };

  if (!hasVideos) {
    return <Gallery images={images} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTabChange("images")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "images"
                ? "bg-[#00A896] text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => handleTabChange("videos")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "videos"
                ? "bg-[#00A896] text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
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
