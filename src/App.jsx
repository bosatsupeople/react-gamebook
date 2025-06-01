import { useState, useEffect, useRef } from 'react';
import VideoScene from './components/VideoScene';
import GameOver from './components/GameOver';
import Goal from './components/Goal';

const scenes = {
  start: {
    video: '/assets/videos/1.mp4',
    choices: [
      { text: '歯磨きする', next: 'gameover', reason: '毒入り歯磨き粉' },
      { text: '歯磨きしない', next: 'path1' }
    ]
  },
  path1: {
    video: '/assets/videos/2B.mp4',
    choices: [
      { text: 'おばあちゃんを助ける', next: 'gameover', reason: 'ババアサシン' } ,
      { text: 'おばあちゃんを見捨てる', next: 'path2' }
    ]
  },
  path2: {
    video: '/assets/videos/3B.mp4',
    choices: [
      { text: '木の中', next: 'goal' },
      { text: '人混みの中', next: 'gameover', reason: '双子のババアサシン' }
    ]
  }
};

function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState('start');
  const [gameOverReason, setGameOverReason] = useState(null);

  // const bgmRef = useRef(new Audio());

  const startGame = () => {
    // const bgm = bgmRef.current;
    // bgm.src = '/assets/music/bgm-comn.mp3';
    // bgm.volume = 0.4;
    // bgm.loop = true;
    // bgm.play().catch(() => {
    //   alert("音声再生がブロックされました。");
    // });

    setStarted(true);
    setScene('start');
  };

  const restartGame = () => {
    // const bgm = bgmRef.current;
    // bgm.pause();
    // bgm.currentTime = 0;
    // bgm.src = '';

    setGameOverReason(null);
    setScene('start');
    setStarted(false);
  };

  useEffect(() => {
    // const bgm = bgmRef.current;
    // let src = '/assets/music/bgm-comn.mp3';
    // if (scene === 'gameover') src = '';
    // if (started && bgm.src !== location.origin + src) {
    //   bgm.pause();
    //   bgm.src = src;
    //   bgm.load();
    //   bgm.play().catch(() => {});
    // }
  }, [scene]);

  const handleChoice = (next, reason = null) => {
    if (next === 'gameover') setGameOverReason(reason);
    setScene(next);
  };

  if (!started) {
    return (
      <div className='start-screen'>
        <h1 className='game-title'><img className='game-logo' src="/assets/images/logo-game-title.png" alt="ケイ子のドキドキ！アイドル人生" /></h1>
        <button className='button-comn button-comn-start' onClick={startGame}>スタート</button>
        <p>※ボタンを押すと音声が再生されます</p>
      </div>
    );
  }

  if (scene === 'gameover') return <GameOver reason={gameOverReason} restart={() => restartGame()} />;
  if (scene === 'goal') return <Goal Goal restart={restartGame} />;

  return (
    <VideoScene
      videoSrc={scenes[scene].video}
      choices={scenes[scene].choices}
      onChoice={(next, reason) => handleChoice(next, reason)}
    />
  );
}

export default App;
