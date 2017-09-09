import Sprite from './sprite';

class Bird extends Sprite {

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
    this.frameIndex = 1;
    this.tickCount = 0;
    this.ticksPerFrame = 18;
    this.numFrames = 8;
    this.game = game;
    this.birdRight = this.dX + this.dWidth;
  }

  jump(e, ctx) {

    ctx.save();
    ctx.translate(this.xPos + this.width / 2, this.yPos + this.height / 2);
    ctx.rotate(this.dY * 15 * Math.PI / 360);
    this.game.draw(ctx);
    ctx.restore();
    this.dY -= 40;
    this.sX = 0;

  }

  fall(ctx) {
    this.tickCount += 1;



    if (this.tickCount > this.ticksPerFrame) {
      this.sX = 27;
      this.tickCount = 0;
    }



    if (this.dY < 450 ) {
      this.dY += 1.5;
    } else {
      this.dY = this.dY;
    }

    // this.sX = (this.frameIndex * this.sWidth) / (this.numFrames);
  }

  collideWith(pipe) {
    return(
    (this.dX)
    )
  }
}

export default Bird;
