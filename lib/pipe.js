import Sprite from './sprite';

class Pipe extends Sprite {

  constructor(options, game) {
    super(options);
    this.image = options.image;
    this.sX = options.sX;
    this.sY = options.sY;
    this.sWidth = options.sWidth;
    this.sHeight = options.sHeight;
    this.dX = options.dX;
    this.dY = options.dY;
    this.dWidth = options.dWidth;
    this.dHeight = options.dHeight;
    this.frameIndex = 0;
    this.game = game;
    this.numFrames = options.numFrames || 2;
    const mid = 502 + this.dY;
    this.topPipeY = mid - 62;
    this.botPipeY = mid + 62;
  }

  move() {
    this.dX -= 4;

    if (this.game.outOfBounds(this.dX)) {
      this.game.remove(this);
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.dX,
      this.dY,
      this.dWidth,
      this.dHeight
    );
  }


  render() {
    this.image.onload = () => {
      this.draw();
    };
  }


}


export default Pipe;
