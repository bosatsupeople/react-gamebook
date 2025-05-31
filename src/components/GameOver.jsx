import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

function GameOver({ reason, restart }) {
  const [videoEnded, setVideoEnded] = useState(false);

  const videoMap = {
    '毒入り歯磨き粉': '/assets/videos/2A.mp4',
    'ババアサシン': '/assets/videos/3A.mp4',
    '双子のババアサシン': '/assets/videos/4B.mp4',
    'default': ''
  };

  const messageMap = {
    '毒入り歯磨き粉': '',
    'ババアサシン': '',
    '双子のババアサシン': '',
    'default': ''
  };

  const videoSrc = videoMap[reason] || videoMap['default'];
  const message = messageMap[reason] || messageMap['default'];

  return (
    <div className="screen gameover-screen">
      {/* <h1>{message}</h1> */}
      {/* <p>{reason}</p> */}
      <VideoPlayer
        src={videoSrc}
        onEnded={() => setVideoEnded(true)}
      />
      {videoEnded && (
        <button className='button-comn button-comn-end' onClick={restart}>▶ 最初からやりなおす</button>
      )}
    </div>
  );
}

export default GameOver;