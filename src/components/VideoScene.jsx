import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';

function VideoScene({ videoSrc, onChoice, choices }) {
  const [showChoices, setShowChoices] = useState(false);

  // 動画が変わるたびに選択肢をリセット
  useEffect(() => {
    setShowChoices(false);
  }, [videoSrc]);

  return (
    <div className="screen video-scene">
      <VideoPlayer
        src={videoSrc}
        onEnded={() => setShowChoices(true)}
      />

      {showChoices && (
        <div className="choices button-comn-option-wrap">
          {choices.map((choice, idx) => (
            <button className='button-comn-option' key={idx} onClick={() => onChoice(choice.next, choice.reason)}>
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoScene;
