class Sprite {

  constructor(options) {
    this.context = options.context;
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
  }

  render() {
    this.image.onload = () => {
      this.context.drawImage(
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
    };
  }

jump(e) {
  this.context.clearRect(
    this.dX,
    this.dY,
    this.dWidth,
    this.dHeight
  );
  this.dY -= 20;
  this.context.drawImage(
    this.image,
    this.sX,
    this.sY,
    this.sWidth / this.numFrames   ,
    this.sHeight,
    this.dX,
    this.dY,
    this.dWidth,
    this.dHeight
  );
}

fall(e) {

  this.context.clearRect(
    this.dX,
    this.dY,
    this.dWidth,
    this.dHeight
  );
  if (this.dY < 410 ) {
    this.dY += 10;
  } else {
    this.dY = this.dY;
  }

  this.frameIndex = this.frameIndex % this.numFrames;

  this.sX = (this.frameIndex * this.sWidth) / (this.numFrames);

  this.context.drawImage(
    this.image,
    this.sX,
    this.sY,
    this.sWidth / this.numFrames,
    this.sHeight,
    this.dX,
    this.dY,
    this.dWidth,
    this.dHeight
  );
}
}

export default Sprite;
