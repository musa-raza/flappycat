class GameView {

  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ctx.font = "42px Press Start 2P";
    this.ctx.fillStyle = "white";
    this.addJump = this.addJump.bind(this);
    this.addJump();
    this.scores = [];
    this.highscoretable = false;
  }

  startGame() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.currentTime = 0;
    this.lastTime = 0;
    this.bird = this.game.addBird();
    this.backgroundMusic();
    requestAnimationFrame(this.animate.bind(this));
  }



  addJump() {

    const jumpmusic = document.getElementById("jumpsound");
    jumpmusic.volume = 0.1;
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 32) {
        this.bird.jump(e, this.ctx);
        if (this.bird.alive) {
          jumpmusic.play();
        }
      }
      // jumpmusic.currentTime = 0;
    });
  }



  endBgMusic() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.pause();
  }

  startModal() {
    let modal = document.getElementsByClassName('game-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('hidden', 'show');
    });
  }

  backgroundMusic() {
    const bgmusic = document.getElementById("bgmusic");
    bgmusic.volume = 0.3;
    bgmusic.play();
  }

  closeModal() {
    let modal = document.getElementsByClassName('game-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('show', 'hidden');
    });
  }

  startHighScoreModal() {
    this.highscoretable = true;
    let modal = document.getElementsByClassName('score-div');
    let text = document.getElementById('score-input');
    text.value = "";
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('hidden', 'show');
    });
  }

  closeHighScoreModal() {
    this.highscoretable = false;
    let modal = document.getElementsByClassName('score-div');
    [].forEach.call(modal, (el) => {
      el.className = el.className.replace('show', 'hidden');
    });
  }

  receiveScores() {
    const scoresRef = firebase.database().ref("scores");
    scoresRef.orderByValue().limitToLast(5).on("child_added", function(snapshot) {
      snapshot.forEach(function(data) {
        console.log(data.val());
        console.log(data.key);
      });
    });
  }

  submitScore(e) {
    const score = this.game.score;
    const userName = e.target.value;
    document.removeEventListener('keypress', window.startFlap);
    if (e.keyCode === 13) {
      firebase.database().ref('scores/').push({
        score: score,
        username: userName
      });
    }
    document.removeEventListener('keypress', this.submitScore);
    document.addEventListener('keypress', window.startFlap);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    if (this.bird.alive) {
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      this.bird.fall(this.ctx);
      this.closeHighScoreModal();
      requestAnimationFrame(this.animate.bind(this));
    } else if (!this.bird.alive) {
      this.endBgMusic();
      this.game.over = true;
      clearInterval(this.game.scoreInt);
      cancelAnimationFrame(this.animate.bind(this));
      this.startHighScoreModal();
      this.receiveScores();
      document.addEventListener('keypress', this.submitScore.bind(this));
    }
  }


}

export default GameView;
