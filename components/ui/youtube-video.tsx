"use client";

interface YouTubeVideoProps {
  youtubeUrl: string;
  title: string;
}

export const YouTubeVideo = ({ youtubeUrl, title }: YouTubeVideoProps) => {
  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-gray-600">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
