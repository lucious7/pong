function Player(gameLimits, pos, num) {
	this.gameLimits = gameLimits;
	this.pos = pos;
	this.num = num;
	this.width = 5; 
	this.height = 60;
	this.speed = 6;
	this.fillStyle = "rgb(255,255,255)";
	this.keyboarder = new Keyboarder();
	this.keys = [{UP: this.keyboarder.KEYS.A, DOWN: this.keyboarder.KEYS.Z},
				 {UP: this.keyboarder.KEYS.UP, DOWN: this.keyboarder.KEYS.DOWN}];

}

Player.prototype.update = function() {
	if(this.keyboarder.isDown(this.keys[this.num].UP) && this.pos.y > this.gameLimits.upper){
		this.pos.y += -this.speed;
	}
	if(this.keyboarder.isDown(this.keys[this.num].DOWN) && this.pos.y + this.height < this.gameLimits.lower){
		this.pos.y += this.speed;
	}
};

Player.prototype.draw = function(screen) {
	screen.fillStyle = this.fillStyle;
	screen.fillRect(this.pos.x, this.pos.y, this.width, this.height);	
};