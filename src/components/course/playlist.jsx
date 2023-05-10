import React, { useState } from "react";
import Link from "@components/ui/link";
import VideoPlayer from "@components/player";

function MediaPlayer({ mediaId }) {
  return <VideoPlayer videoId={mediaId} />;
}

export default function PlayList({ mediaData }) {
  const [playlistId, setPlaylistId] = useState("");
  const setPlaylisthandler = (videoId) => {
    setPlaylistId(videoId);
  };
  return (
    <div className="grid grid-cols-12 py-4">
      <div className="lg:col-span-8 col-span-12 h-screen relative">
        {playlistId != "" && <MediaPlayer mediaId={playlistId} />}
      </div>
      <div className="lg:col-span-4 col-span-12 h-screen overflow-y-scroll p-4">
        {mediaData.items.map(({ id, snippet = {} }) => {
          const { title, thumbnails = {}, resourceId = {} } = snippet;
          const { medium } = thumbnails;
          return (
            <div key={resourceId.videoId} className="flex bg-indigo-100 mb-2">
              <button
                onClick={() => setPlaylisthandler(resourceId.videoId)}
                className="bg-indigo-100 hover:bg-indigo-200 text-rose-500 hover:text-white py-1 px-4 rounded inline-flex items-center"
              >
                Play
                <i className="fi fi-rr-play-alt  font-semibold text-[18px] h-4 w-4 ml-1"></i>
              </button>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
