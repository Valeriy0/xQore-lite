import React from 'react';

export const VideoComp = () => {
  return (
    <div className="bg-white flex-2 rounded nft-pdf-gradient sm:flex-auto sm:min-h-[200px] overflow-hidden">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/3MvDbnnBpkQ?controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
