import Game from './game';
import GameView from './game_view';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const game = new Game();
  const gameView = new GameView(game, ctx);



  window.startFlap = (e) => {
    if( e.keyCode === 32) {
      const newerGame = new Game();
      gameView.game = newerGame;
      gameView.closeModal();
      gameView.startGame();
      document.removeEventListener('keypress', window.startFlap);
    }
  };
  document.addEventListener('keypress', window.startFlap);


});
