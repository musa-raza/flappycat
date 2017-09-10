class GameView {

  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.bird = this.game.addBird();
    this.ctx.font = "42px Press Start 2P";
    this.ctx.fillStyle = "white";
  }

  start() {
    document.addEventListener('keypress', (e) => {
      this.bird.jump(e, this.ctx);
    });
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.bird.alive) {
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      this.bird.fall(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    }
  }


}

export default GameView;
