import Sprite from './sprite';
import Pipe from './pipe';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ground = new Image();
  ground.src = 'assets/background/foreground.png';
  ground.height = 100;
  // ground.onload = function() {
  //   ctx.drawImage(ground, -50, 500, canvas.width + 100, ground.height * 2)
  // }

  let dx = -15;

  window.setInterval(() => {
    dx -= 1;
    if (dx < -50) {
      dx = -5;
    }
    ctx.drawImage(ground, dx, 500, canvas.width + 100, ground.height * 2);
  }, 5);

  const pipeImg = new Image();
  pipeImg.src = 'assets/pipe.png';

  const catImage = new Image();
  catImage.src = 'assets/runningcat.png';

  const cat = new Sprite({
    context: ctx,
    image: catImage,
    sX: 0,
    sY: 515,
    sWidth: 1000,
    sHeight: 280,
    dX: 150,
    dY: 220,
    dWidth: 100,
    dHeight: 100
  });


  cat.render();
  document.addEventListener('keypress', (e) => {
    cat.jump(e);
  });



  //
  const pipe = new Pipe({
    context: ctx,
    image: pipeImg,
    sX: 0,
    sY: 0,
    sWidth: 500,
    sHeight: 280,
    dX: 150,
    dY: 220,
    dWidth: 100,
    dHeight: 100
  });

  pipe.render();

  window.setInterval(() => {
    cat.frameIndex += 1;
    cat.fall();
  }, 250);
});
