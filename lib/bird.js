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
    this.frameIndex = 4;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
    this.numFrames = 8;
    this.game = game;
    this.birdRight = this.dX + this.dWidth;
    this.dir = "down";
    this.upSteps = 0;
    this.alive = true;
    this.jumpAnims = [0, 1, 2, 3];
    this.fallAnims = [4,5,6,7];
  }

  jump(e, ctx) {
    this.dir = 'up';
    // ctx.setTransform(1,0,0,1, this.sWidth / 2, this.sHeight / 2);
    // ctx.rotate(Math.PI/30);
    // ctx.drawImage(this.image, -this.sWdith/2, -this.sHeight / 2);
    // ctx.setTransform(1,0,0,1,0,0);
    this.frameIndex = 0;

    this.upSteps += 8;
    // this.dY -= 30;
    this.sX = 0;

  }

  fall(ctx) {
    this.tickCount += 1;

    if (this.dir === "down") {
      if (this.tickCount > 2) {
        if (this.frameIndex < 7) {
          this.frameIndex = (this.frameIndex + 1);
        }
        this.tickCount = 0;
      }

      if (this.dY < 550 ) {
        this.dY += 3.75;
      } else {
        this.dY = this.dY;
      }
    } else if (this.dir === "up") {
      if (this.tickCount > this.ticksPerFrame) {
        if (this.frameIndex < 7) {
          this.frameIndex = (this.frameIndex + 1);
        }
        this.tickCount = 0;
      }
      if (this.upSteps >= 0) {
        this.dY -= 8;
        this.upSteps -= 1;
      } else {
        this.dir = "down";
      }

    }

    this.sX = (this.frameIndex * this.sWidth) + 25;
  }

  collideWith(pipe) {

    if ((this.dY + 10 < pipe.topPipeY || this.dY - 5 > pipe.botPipeY || this.dY - 20 + this.dHeight > pipe.botPipeY)  &&
    ((this.dX - 5 + this.dWidth > pipe.dX && this.dX - 5 + this.dWidth < pipe.dX + pipe.dWidth) ||
  (this.dX - 5 > pipe.dX && this.dX  - 5 < pipe.dX + pipe.dWidth)) || this.dY - 5 + this.dHeight >= 598) {
      this.alive = false;
    }
  }
}

export default Bird;
