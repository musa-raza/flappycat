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
    this.submitScore = this.submitScore.bind(this);
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
    document.addEventListener('keypress', window.startFlap);
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
    this.receiveScores();
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
    scoresRef.orderByChild("score").limitToLast(5).on("value", function(snapshot) {
      const score = snapshot.val();
      const values = Object.values(score);
      values.sort( (a, b) => b.score - a.score);
      const scorelistings = document.querySelectorAll('.scorelist');
      for (let i = 0; i < scorelistings.length; i++) {
        scorelistings[i].remove();
      }
      const uL = document.getElementById('disp-scores');
      for (let i = 0; i < values.length; i++) {
        const name = values[i].username;
        const performance = values[i].score;
        const lI = document.createElement('li');
        lI.className = "scorelist";
        lI.innerHTML = name + " " + performance;
        uL.appendChild(lI);
      }
    });
  }

  submitScore(e) {
    const score = this.game.score;
    let userName = e.target.value;
    // document.removeEventListener('keypress', window.startFlap);
    if (e.keyCode === 13) {
      if (userName === "" || userName === undefined) {
        userName = "Anonymous";
      }
      firebase.database().ref('scores/').push({
        score: score,
        username: userName
      });
      this.startModal();
      this.closeHighScoreModal();
      document.removeEventListener('keypress', this.submitScore);
      document.addEventListener('keypress', window.startFlap);
    }
    // document.removeEventListener('keypress', this.submitScore);
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
      document.addEventListener('keypress', this.submitScore);
    }
  }


}

export default GameView;
