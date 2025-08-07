"use client";
import { YouTubeVideo } from "./youtube-video";
import { IVideoGallery } from "@/lib/types";

interface VideoGalleryProps {
  videos: IVideoGallery[];
}

export const VideoGallery = ({ videos }: VideoGalleryProps) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No videos available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="space-y-3">
            <YouTubeVideo 
              youtubeUrl={video.youtubeUrl} 
              title={video.title} 
            />
            <h3 className="text-lg font-medium text-gray-900 text-center">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
