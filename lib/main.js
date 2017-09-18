import Game from './game';
import GameView from './game_view';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const game = new Game();
  const gameView = new GameView(game, ctx);

    window.gameoverMusic = () => {
      const over = document.getElementById("oversound");
      over.currentTime = 0;
      over.play();
    };



  document.addEventListener('keypress', (e) => {
    const over = document.getElementById("oversound");
    const bgmusic = document.getElementById("bgmusic");
    const jumpmusic = document.getElementById("jumpsound");
    if (e.keyCode === 115 && !over.muted && !bgmusic.muted && !jumpmusic.muted) {
      over.muted = true;
      bgmusic.muted = true;
      jumpmusic.muted = true;
    } else if (e.keyCode === 115) {
      over.muted = false;
      bgmusic.muted = false;
      jumpmusic.muted = false;
    }
  });

  window.startFlap = (e) => {
    if( e.keyCode === 13) {
      const newerGame = new Game();
      gameView.game = newerGame;
      gameView.closeModal();
      gameView.startGame();
      document.removeEventListener('keypress', window.startFlap);
    }
  };
  if (!gameView.highscoretable) {
    document.addEventListener('keypress', window.startFlap);
  }

});
