function Game(screen) {

	this.screen = screen;
	this.ctx = screen.getContext("2d");
	this.center = {x: this.screen.width/2, y: this.screen.height/2};
	this.upperlineY = 50;
	this.lowerlineY = this.screen.height - 10;

	this.playerOneScore = 0;
	this.playerTwoScore = 0;

	this.playerOne = new Player({upper: this.upperlineY, lower: this.lowerlineY}, 
								{x: 10 , y: this.center.y}, 0);
	this.playerTwo = new Player({upper: this.upperlineY, lower: this.lowerlineY}, 
								{x: this.screen.width - 15 , y: this.center.y}, 1);
	this.ball = new Ball({upper: this.upperlineY, lower: this.lowerlineY}, 
						 {x: this.center.x, y: this.center.y});

	var self = this;
	function tick() {
		self.update();
		self.draw();
		requestAnimationFrame(tick);
	};

	tick();
}

Game.prototype.update = function() {
	this.playerOne.update();
	this.playerTwo.update();
	this.ball.update();
	this.handleCollision();
};

var paddleSound = document.createElement("audio");
paddleSound.src = "sfx/paddle.ogg";
var wallSound = document.createElement("audio");
wallSound.src = "sfx/wall.ogg";
var pointSound = document.createElement("audio");
pointSound.src = "sfx/point.ogg";

Game.prototype.handleCollision = function() {
	if( this.ball.pos.x - this.playerOne.width <= this.playerOne.pos.x && 
		this.ball.pos.y >= this.playerOne.pos.y &&
		this.ball.pos.y <= this.playerOne.pos.y + this.playerOne.height){

		var player = this.playerOne;

	} else if( this.ball.pos.x + this.playerTwo.width >= this.playerTwo.pos.x && 
		this.ball.pos.y >= this.playerTwo.pos.y &&
		this.ball.pos.y <= this.playerTwo.pos.y + this.playerTwo.height){

		var player = this.playerTwo;

	}
	if(player){
		paddleSound.play();
		this.ball.speed.x = -this.ball.speed.x;
		this.ball.speed.y = -(this.ball.speed.y/20) * (player.pos.y + player.height/2 - this.ball.pos.y) * 2;
	} else if(this.ball.pos.x < 0){
		pointSound.play();
		this.playerTwoScore++;
		this.resetBall();
	} else if(this.ball.pos.x > this.screen.width){
		pointSound.play();
		this.playerOneScore++;
		this.resetBall();
	} else if(this.ball.pos.y - 5 <= this.upperlineY || this.ball.pos.y + 5 >= this.lowerlineY){
		wallSound.play();
		this.ball.speed.y = -this.ball.speed.y;
	}
};

Game.prototype.resetBall = function() {
	this.ball.pos = {x: this.center.x, y: this.center.y};
	this.ball.speed.x = -this.ball.speed.x;
	this.ball.speed.y = 1;
};

Game.prototype.draw = function() {
	this.clearScene();
	this.drawScoreboard();
	this.drawLines();
	this.playerOne.draw(this.ctx);
	this.playerTwo.draw(this.ctx);
	this.ball.draw(this.ctx);
};

Game.prototype.clearScene = function() {
	this.ctx.fillStyle = "rgb(0,0,0)";
	this.ctx.fillRect(0,0, this.screen.width, this.screen.height);
};

Game.prototype.drawScoreboard = function() {
	this.ctx.fillStyle = "rgb(255,255,255)";
	this.ctx.font = "40px Consolas";
	this.ctx.fillText(this.playerOneScore, this.center.x - this.screen.width/4, 40);
	this.ctx.fillText(this.playerTwoScore, this.center.x + this.screen.width/4, 40);
};

Game.prototype.drawLines = function() {
	//vertical line
	this.ctx.strokeStyle = "rgb(255,255,255)";
	this.ctx.setLineDash([5]);
	this.ctx.beginPath();
	this.ctx.moveTo(this.center.x, 0);
	this.ctx.lineTo(this.center.x, this.screen.height);
	this.ctx.stroke();

	//upper line
	this.ctx.fillRect(0, this.upperlineY, this.screen.width, 5);
	//lower line
	this.ctx.fillRect(0, this.lowerlineY, this.screen.width, 5);
};