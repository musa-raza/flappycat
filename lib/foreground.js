import Sprite from './sprite';

class Foreground extends Sprite {

  constructor(options, game) {
    super(options);
    this.game = game;
  }

  // move(timeDelta) {
  //   const velocityScale = timeDelta / NORMAL_FRAME_DELTA,
  //   offsetX = this.dX * velocityScale;
  //   this.dX = this.dX + offsetX;
  //   if (this.game.isOutOfBounds(this.dX, this.dY)) {
  //     this.dX = this.game.wrap(this.dX);
  //   } else {
  //     this.remove();
  //   }
  // }

  move() {
    if (this.dX === -1002) {
      this.dX = 0;
    } else {
      this.dX -= 2;
    }
    }
  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_DELTA = 1000/60;
export default Foreground;
