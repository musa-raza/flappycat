import Sprite from './sprite';

class Pipe extends Sprite {

  constructor(options) {
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
    this.numFrames = options.numFrames || 2;
    const mid = 502 + this.dY;
    this.topPipeY = mid - 62;
    this.botPipeY = mid + 62;
  }

  move() {
    this.dX -= 4;
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

  randomPipe() {

  }
}


export default Pipe;
