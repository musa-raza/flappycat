class GameView {

  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ctx.font = "42px Press Start 2P";
    this.ctx.fillStyle = "white";
    this.addJump();
  }

  startGame() {

    this.lastTime = 0;
    this.bird = this.game.addBird();
    requestAnimationFrame(this.animate.bind(this));

  }

  addJump() {
    document.addEventListener('keypress', (e) => {
      this.bird.jump(e, this.ctx);
    });
  }

  startModal() {
    let modal = document.getElementsByClassName('game-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('hidden', 'show');
    });
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
      document.addEventListener('keypress', window.startFlap);
    }
  }


}

export default GameView;
