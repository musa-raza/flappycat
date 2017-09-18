/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
  function Sprite(options) {
    _classCallCheck(this, Sprite);

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

  _createClass(Sprite, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.sX, this.sY, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.image.onload = function () {
        _this.draw();
      };
    }
  }, {
    key: "move",
    value: function move() {
      this.dX -= 4;
    }
  }]);

  return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(6);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = _game2.default.DIM_X;
  canvas.height = _game2.default.DIM_Y;
  var game = new _game2.default();
  var gameView = new _game_view2.default(game, ctx);

  window.gameoverMusic = function () {
    var over = document.getElementById("oversound");
    over.currentTime = 0;
    over.play();
  };

  document.addEventListener('keypress', function (e) {
    var over = document.getElementById("oversound");
    var bgmusic = document.getElementById("bgmusic");
    var jumpmusic = document.getElementById("jumpsound");
    if (e.keyCode === 115 && !over.muted && !bgmusic.muted && !jumpmusic.muted) {
      over.muted = true;
      bgmusic.muted = true;
      jumpmusic.muted = true;
    } else if (e.keyCode === 115) {
      over.muted = false;
      bgmusic.muted = false;
      jumpmusic.muted = false;
    }
  });

  window.startFlap = function (e) {
    if (e.keyCode === 13) {
      var newerGame = new _game2.default();
      gameView.game = newerGame;
      gameView.closeModal();
      gameView.startGame();
      document.removeEventListener('keypress', window.startFlap);
    }
  };
  if (!gameView.highscoretable) {
    document.addEventListener('keypress', window.startFlap);
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _pipe = __webpack_require__(3);

var _pipe2 = _interopRequireDefault(_pipe);

var _bird = __webpack_require__(4);

var _bird2 = _interopRequireDefault(_bird);

var _foreground = __webpack_require__(5);

var _foreground2 = _interopRequireDefault(_foreground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.pipes = [];
    this.bird = [];
    this.foreGround = [];
    this.topPipeLeft = 0;
    this.topPipeRight = 0;
    this.topPipeY = 0;
    this.botPipeLeft = 0;
    this.botPipeRight = 0;
    this.botPipeY = 0;
    this.score = 0;
    this.addPipes();
    this.addForeGround();
    this.over = false;
    this.updateScore = this.updateScore.bind(this);
    this.updateScore();
  }

  _createClass(Game, [{
    key: 'add',
    value: function add(object) {
      if (object instanceof _pipe2.default) {
        this.pipes.push(object);
      } else if (object instanceof _bird2.default) {
        this.bird.push(object);
      } else if (object instanceof _foreground2.default) {
        this.foreGround.push(object);
      }
    }
  }, {
    key: 'addPipes',
    value: function addPipes() {
      var _this = this;

      var pipeImg = new Image();
      pipeImg.src = 'assets/pipe.png';
      var orig = this;
      window.setInterval(function () {
        // const random = Math.floor(Math.random() * 200) - 200;
        var pipeOptions = {
          image: pipeImg,
          sX: 0,
          sY: 0,
          sWidth: 26,
          sHeight: 820,
          dX: 480,
          dY: Math.floor(Math.random() * 200 - 200),
          dWidth: 92,
          dHeight: 1000
        };

        _this.add(new _pipe2.default(pipeOptions, _this));
      }, 1500);
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      var orig = this;
      if (!this.over) {
        this.scoreInt = window.setInterval(function () {
          orig.score += 1;
        }, 1500);
      }
    }
  }, {
    key: 'drawScore',
    value: function drawScore(ctx) {
      if (!this.over) {
        ctx.font = '48px "Press Start 2P"';
        ctx.fillStyle = "white";
        ctx.fillText(this.score, 240, 90);
      }
    }
  }, {
    key: 'addBird',
    value: function addBird() {
      var birdImage = new Image();
      birdImage.src = 'assets/frame-1.png';
      var birdOptions = {
        image: birdImage,
        sX: 5,
        sY: 0,
        sWidth: 3968 / 8,
        sHeight: 444,
        dX: 150,
        dY: 220,
        dWidth: 60,
        dHeight: 60
      };
      var bird = new _bird2.default(birdOptions, this);
      this.add(bird);
      return bird;
    }
  }, {
    key: 'addForeGround',
    value: function addForeGround() {
      var groundImg = new Image();
      groundImg.src = 'assets/background/foreground.png';
      groundImg.height = 150;
      var groundOptions = {
        image: groundImg,
        sX: 0,
        sY: 0,
        sWidth: Game.DIM_X + 100,
        sHeight: groundImg.height * 2,
        dX: 0,
        dY: 598,
        dWidth: 1700,
        dHeight: groundImg.height * 2
      };
      var foreground = new _foreground2.default(groundOptions, this);
      this.add(foreground);
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      return [].concat(this.pipes, this.bird, this.foreGround);
    }

    // isOutOfBounds(dX, dY) {
    //   return (dX < -17 || dY < 0 || dX > Game.DIM_X || dY > Game.DIM_Y);
    // }

  }, {
    key: 'remove',
    value: function remove(object) {
      if (object instanceof _pipe2.default) {
        this.pipes.splice(this.pipes.indexOf(object), 1);
      }
    }
  }, {
    key: 'outOfBounds',
    value: function outOfBounds(dX) {
      return dX < -100;
    }
  }, {
    key: 'pipesGroundObjects',
    value: function pipesGroundObjects() {
      return [].concat(this.pipes, this.foreGround);
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects(delta) {
      this.pipesGroundObjects().forEach(function (object) {
        object.move(delta);
      });
    }
  }, {
    key: 'step',
    value: function step(delta) {
      this.moveObjects(delta);
      this.checkCollide();
    }
  }, {
    key: 'checkCollide',
    value: function checkCollide() {
      var _this2 = this;

      this.pipes.forEach(function (pipe) {
        // if (((this.bird[0].dX + this.bird[0].dWidth) / 2) > pipe.dX) {
        //   this.score += 1;
        // }
        _this2.bird[0].collideWith(pipe);
      });
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
      this.drawScore(ctx);
    }

    // wrapped (coord, max) {
    //   if (coord < -17) {
    //     return max - (coord % max);
    //   } else if (coord > max) {
    //     return coord % max;
    //   } else {
    //     return coord;
    //   }
    // }

    // wrap(dX) {
    //   return(
    //     this.wrapped(dX, Game.DIM_X)
    //   );
    // }

  }]);

  return Game;
}();

Game.DIM_X = 480;
Game.DIM_Y = 640;
Game.NUM_PIPES = 100;

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pipe = function (_Sprite) {
  _inherits(Pipe, _Sprite);

  function Pipe(options, game) {
    _classCallCheck(this, Pipe);

    var _this = _possibleConstructorReturn(this, (Pipe.__proto__ || Object.getPrototypeOf(Pipe)).call(this, options));

    _this.image = options.image;
    _this.sX = options.sX;
    _this.sY = options.sY;
    _this.sWidth = options.sWidth;
    _this.sHeight = options.sHeight;
    _this.dX = options.dX;
    _this.dY = options.dY;
    _this.dWidth = options.dWidth;
    _this.dHeight = options.dHeight;
    _this.frameIndex = 0;
    _this.game = game;
    _this.numFrames = options.numFrames || 2;
    var mid = 502 + _this.dY;
    _this.topPipeY = mid - 62;
    _this.botPipeY = mid + 62;
    return _this;
  }

  _createClass(Pipe, [{
    key: 'move',
    value: function move() {
      this.dX -= 4;

      if (this.game.outOfBounds(this.dX)) {
        this.game.remove(this);
      }
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.sX, this.sY, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.image.onload = function () {
        _this2.draw();
      };
    }
  }]);

  return Pipe;
}(_sprite2.default);

exports.default = Pipe;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bird = function (_Sprite) {
  _inherits(Bird, _Sprite);

  function Bird(options, game) {
    _classCallCheck(this, Bird);

    var _this = _possibleConstructorReturn(this, (Bird.__proto__ || Object.getPrototypeOf(Bird)).call(this, options));

    _this.image = options.image;
    _this.sX = options.sX;
    _this.sY = options.sY;
    _this.sWidth = options.sWidth;
    _this.sHeight = options.sHeight;
    _this.dX = options.dX;
    _this.dY = options.dY;
    _this.dWidth = options.dWidth;
    _this.dHeight = options.dHeight;
    _this.frameIndex = 4;
    _this.tickCount = 0;
    _this.ticksPerFrame = 3;
    _this.numFrames = 8;
    _this.game = game;
    _this.birdRight = _this.dX + _this.dWidth;
    _this.dir = "down";
    _this.upSteps = 0;
    _this.alive = true;
    _this.jumpAnims = [0, 1, 2, 3];
    _this.fallAnims = [4, 5, 6, 7];
    return _this;
  }

  _createClass(Bird, [{
    key: 'jump',
    value: function jump(e, ctx) {
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
  }, {
    key: 'fall',
    value: function fall(ctx) {
      this.tickCount += 1;

      if (this.dir === "down") {
        if (this.tickCount > 2) {
          if (this.frameIndex < 7) {
            this.frameIndex = this.frameIndex + 1;
          }
          this.tickCount = 0;
        }

        if (this.dY < 550) {
          this.dY += 3.75;
        } else {
          this.dY = this.dY;
        }
      } else if (this.dir === "up") {
        if (this.tickCount > this.ticksPerFrame) {
          if (this.frameIndex < 7) {
            this.frameIndex = this.frameIndex + 1;
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

      this.sX = this.frameIndex * this.sWidth + 25;
    }
  }, {
    key: 'collideWith',
    value: function collideWith(pipe) {

      if ((this.dY + 10 < pipe.topPipeY || this.dY - 5 > pipe.botPipeY || this.dY - 20 + this.dHeight > pipe.botPipeY) && (this.dX - 5 + this.dWidth > pipe.dX && this.dX - 5 + this.dWidth < pipe.dX + pipe.dWidth || this.dX - 5 > pipe.dX && this.dX - 5 < pipe.dX + pipe.dWidth) || this.dY - 5 + this.dHeight >= 598) {
        this.game.over = true;
        this.alive = false;
        window.gameoverMusic();
      }
    }
  }]);

  return Bird;
}(_sprite2.default);

exports.default = Bird;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Foreground = function (_Sprite) {
  _inherits(Foreground, _Sprite);

  function Foreground(options, game) {
    _classCallCheck(this, Foreground);

    var _this = _possibleConstructorReturn(this, (Foreground.__proto__ || Object.getPrototypeOf(Foreground)).call(this, options));

    _this.game = game;
    return _this;
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

  _createClass(Foreground, [{
    key: 'move',
    value: function move() {
      if (this.dX === -1002) {
        this.dX = 0;
      } else {
        this.dX -= 2;
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return Foreground;
}(_sprite2.default);

var NORMAL_FRAME_DELTA = 1000 / 60;
exports.default = Foreground;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.ctx.font = "42px Press Start 2P";
    this.ctx.fillStyle = "white";
    this.addJump = this.addJump.bind(this);
    this.addJump();
    this.scores = [];
    this.highscoretable = false;
  }

  _createClass(GameView, [{
    key: "startGame",
    value: function startGame() {
      var bgmusic = document.getElementById("bgmusic");
      bgmusic.currentTime = 0;
      this.lastTime = 0;
      this.bird = this.game.addBird();
      this.backgroundMusic();
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "addJump",
    value: function addJump() {
      var _this = this;

      var jumpmusic = document.getElementById("jumpsound");
      jumpmusic.volume = 0.1;
      document.addEventListener('keypress', function (e) {
        if (e.keyCode === 32) {
          _this.bird.jump(e, _this.ctx);
          if (_this.bird.alive) {
            jumpmusic.play();
          }
        }
        // jumpmusic.currentTime = 0;
      });
    }
  }, {
    key: "endBgMusic",
    value: function endBgMusic() {
      var bgmusic = document.getElementById("bgmusic");
      bgmusic.pause();
    }
  }, {
    key: "startModal",
    value: function startModal() {
      var modal = document.getElementsByClassName('game-div');
      [].forEach.call(modal, function (el) {
        el.className = el.className.replace('hidden', 'show');
      });
    }
  }, {
    key: "backgroundMusic",
    value: function backgroundMusic() {
      var bgmusic = document.getElementById("bgmusic");
      bgmusic.volume = 0.3;
      bgmusic.play();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      var modal = document.getElementsByClassName('game-div');
      [].forEach.call(modal, function (el) {
        el.className = el.className.replace('show', 'hidden');
      });
    }
  }, {
    key: "startHighScoreModal",
    value: function startHighScoreModal() {
      this.highscoretable = true;
      var modal = document.getElementsByClassName('score-div');
      var text = document.getElementById('score-input');
      text.value = "";
      [].forEach.call(modal, function (el) {
        el.className = el.className.replace('hidden', 'show');
      });
    }
  }, {
    key: "closeHighScoreModal",
    value: function closeHighScoreModal() {
      this.highscoretable = false;
      var modal = document.getElementsByClassName('score-div');
      [].forEach.call(modal, function (el) {
        el.className = el.className.replace('show', 'hidden');
      });
    }
  }, {
    key: "receiveScores",
    value: function receiveScores() {
      var scoresRef = firebase.database().ref("scores");
      scoresRef.orderByValue().limitToLast(5).on("child_added", function (snapshot) {
        snapshot.forEach(function (data) {
          console.log(data.val());
          console.log(data.key);
        });
      });
    }
  }, {
    key: "submitScore",
    value: function submitScore(e) {
      var score = this.game.score;
      var userName = e.target.value;
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
  }, {
    key: "animate",
    value: function animate(time) {
      var timeDelta = time - this.lastTime;
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
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map