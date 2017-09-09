class Sprite {

  constructor(options) {
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
    this.tickCount = 0;
    this.ticksPerFrame = 20;
    this.numFrames = options.numFrames || 2;
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


  move() {
    this.dX -= 4;
  }
}

export default Sprite;
