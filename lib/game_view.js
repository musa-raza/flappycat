class GameView {

  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ctx.font = "42px Press Start 2P";
    this.ctx.fillStyle = "white";
    this.addJump = this.addJump.bind(this);
    this.addJump();
  }

  startGame() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.currentTime = 0;
    this.lastTime = 0;
    this.bird = this.game.addBird();
    this.backgroundMusic();
    requestAnimationFrame(this.animate.bind(this));

  }

  

  addJump() {
    const jumpmusic = document.getElementById("jumpsound");
    jumpmusic.volume = 0.1;
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 32) {
        this.bird.jump(e, this.ctx);
        jumpmusic.play();
      }
      // jumpmusic.currentTime = 0;
    });
  }



  endBgMusic() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.pause();
  }

  startModal() {
    let modal = document.getElementsByClassName('game-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('hidden', 'show');
    });
  }

  backgroundMusic() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.volume = 0.3;
    bgmusic.play();
  }

  closeModal() {
    let modal = document.getElementsByClassName('game-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('show', 'hidden');
    });
  }





  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.bird.alive) {
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      this.bird.fall(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    } else if (!this.bird.alive) {
      this.startModal();
      this.endBgMusic();
      document.addEventListener('keypress', window.startFlap);
    }
  }


}

export default GameView;
