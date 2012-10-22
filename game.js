game = {}

game.Ship = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.heading = 90 * (Math.PI/180); // angle in radians
	this.dx = 0;
	this.dy = 0;
	this.sprite = {};
	this.thrustersOn = false;
	this.turningRight = false;
	this.turningLeft = false;
	this.maxSpeed = 15;
}

game.Sprite = function (path, x, y, depth) {
	this.path = path;
	this.x = x;
	this.y = y;
	this.depth = depth;
}

game.Ship.prototype.render = function(ctx) {
	var img = new Image();
	img.src = this.sprite.path;
	
	ctx.save();
	
	ctx.translate(this.x - (this.width/2), this.y - (this.height/2))
	
	ctx.rotate(this.heading);
	
	//console.log(this.path)
	
	if (game.playerShip.thrustersOn) {
		
		var thrusterLeft = new game.Sprite("imgs/sprites/thrusters_left.png", - (this.width/2) - 20, -40, 2);
		var thrusterRight = new game.Sprite("imgs/sprites/thrusters_right.png", - (this.width/2) - 20, 20, 3);
		
		var imgTL = new Image();
		imgTL.src = thrusterLeft.path;
		
		var imgTR = new Image();
		imgTR.src = thrusterRight.path;
		
		ctx.drawImage(imgTL, thrusterLeft.x, thrusterLeft.y);
		ctx.drawImage(imgTR, thrusterRight.x, thrusterRight.y);
	};
	
	// Draw the ship
	ctx.drawImage(img, -(this.width/2), -(this.height/2));
	
	
	ctx.restore();
}

game.Sprite.prototype.render = function(ctx, rotate) {
	var img = new Image();
	img.src = this.path;
	
	ctx.drawImage(img, this.x, this.y);
}

game.ViewPort = {
	x: 0,
	y: 0,
	width: 480,
	height: 320,

    getBottom: function() {
        return this.y + this.height
    },

    getRight: function (){
        return this.x + this.width
    }
};

game.Boundaries = {
    x: 1244,
    y:980
}