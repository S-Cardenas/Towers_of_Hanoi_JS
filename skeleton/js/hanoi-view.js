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
