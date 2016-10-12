function Ball(gameLimits, pos) {
	this.gameLimits = gameLimits;
	this.pos = pos;
	this.speed = {x: -4, y: 1};
	this.fillStyle = "rgb(255,255,255)";
};

Ball.prototype.update = function() {
	this.pos.x += this.speed.x;
	this.pos.y += this.speed.y;
};

Ball.prototype.draw = function(screen) {
	screen.fillStyle = this.fillStyle;
	screen.fillRect(this.pos.x, this.pos.y, 5, 5);
};