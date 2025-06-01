import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

function Goal({ restart }) {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="screen goal-screen">
      <VideoPlayer
        src="/assets/videos/4A.mp4"
        onEnded={() => setVideoEnded(true)}
      />

      {videoEnded && (
        <button className='button-comn button-comn-end' onClick={restart}>最初に戻る</button>
      )}
    </div>
  );
}

export default Goal;
