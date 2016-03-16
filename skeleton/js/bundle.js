/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);
	
	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
		console.log("Did it load?");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var View = function (game, $el) {
		this._game = game;
		this._$el = $el;
		this._$start = null;
	
		this.setupTowers();
		this.bindEvents();
	};
	
	View.prototype.bindEvents = function () {
		this._$el.on('click', 'ul', this.onClick.bind(this));
	};
	
	View.prototype.makeMove = function (start, end) {
		var result = this._game.move(start, end);
		if (result) {
			if (this._game.isWon()) {
				this.render();
				$("li").toggleClass("game-over");
				$("ul").toggleClass("game-over");
				alert("Good work, you!!");
			}
		}
		else {
			alert("Invalid Move. Try again!!!");
		}
	
	};
	
	View.prototype.onClick = function (e) {
		if (this._game.isWon()) return;
		var $tower = $(e.currentTarget);
	
		if (this._$start) {
			var start = this._$start.data('tower').id;
			var end = $tower.data('tower').id;
			this.makeMove(start, end);
			this._$start.toggleClass('selected');
			this._$start = null;
		} else {
			this._$start = $tower;
			$tower.toggleClass('selected');
		}
		this.render();
	};
	
	View.prototype.setupTowers = function () {
		this._$el.append('<ul class="tower" data-tower=\'{"id": 0}\'></ul>');
		var $ul = $('.tower').first();
		$ul.append('<li></li>');
		$ul.append('<li></li>');
		$ul.append('<li></li>');
		this._$el.append('<ul class="tower" data-tower=\'{"id": 1}\'></ul>');
		$ul = $($('.tower')[1]);
		$ul.append('<li></li>');
		$ul.append('<li></li>');
		$ul.append('<li></li>');
		this._$el.append('<ul class="tower" data-tower=\'{"id": 2}\'></ul>');
		$ul = $($('.tower')[2]);
		$ul.append('<li></li>');
		$ul.append('<li></li>');
		$ul.append('<li></li>');
	
		this.render();
	};
	
	View.prototype.render = function() {
		$('li').removeClass();
		var towers = this._game.towers;
		for (var i = 0; i < towers.length; i++) {
			var stack = towers[i];
			var $ul = $($('ul')[i]);
			for (var j = 0; j < stack.length; j++) {
				var $li = $($ul.find('li')[j]);
				$li.toggleClass('disk-' + stack[stack.length - 1 - j]);
			}
		}
	
	};
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};
	
	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];
	
	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};
	
	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};
	
	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};
	
	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};
	
	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }
	
	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map