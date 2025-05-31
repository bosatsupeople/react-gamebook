import React, { useEffect, useRef, useState } from 'react';

function VideoPlayer({ src, onEnded, muted = false, className = '' }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // 動画の切り替え時に loading をリセット
  useEffect(() => {
      setLoading(true);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setLoading(false);
      video.play().catch((err) => {
        console.warn("動画再生エラー:", err);
      });
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.1) {
        if (onEnded) onEnded();
      }
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [src, onEnded]);

  return (
    <div className={`video-wrapper ${className}`}>
      {loading && <div className="loading"><div className='loader'></div><p className='loading-text'>Loading...</p></div>}
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={false}
        muted={muted}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default VideoPlayer;
