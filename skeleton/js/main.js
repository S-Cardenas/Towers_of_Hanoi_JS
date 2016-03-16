var HanoiView = require('./hanoi-view');
var HanoiGame = require('../../hanoi-core-solution/game');

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
	console.log("Did it load?");
});
