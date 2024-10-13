import React, { useState, useRef, useEffect } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
    videoRef.current.pause();
  };

  return (
    <div>
      <video
        ref={videoRef}
        src="/Где_карта,_билли.mp4.mp4" // replace with your video URL
        controls
      />
      <button onClick={handlePlayVideo}>Play Video</button>
      <button onClick={handlePauseVideo}>Pause Video</button>
    </div>
  );
};

export default VideoPlayer;
