var map = {};
map.translateX = 250;
map.translateY = 0;

var resources = {};
resources.tilePath = 'imgs/blue_tile.png';
resources.ballPath = 'imgs/ball.png';
resources.shadowPath = 'imgs/shadow.png';

game = {};

game.ball={x:0, y:0, z:0, depth:999999999 };

game.clickedTile = {};

game.drawSprite = function (imgPath, ctx, x, y) {
				
	var img = new Image();
	
	img.src = imgPath;
	
	ctx.drawImage(img, x, y);
}

game.drawTheBall = function (ctx, x, y, depth) {
	// Offsets
	var x = x - 8; 
	var y = y - 25;
	//TODO read about these offsets when working with drawImage(); 
	
	var shadowSprite = new game.Sprite(resources.shadowPath, x, y + 10, depth+1);
	var ballSprite = new game.Sprite(resources.ballPath, x, y, depth + 2);
	
	renderer.pipeline.push(shadowSprite);
	renderer.pipeline.push(ballSprite);
	//game.drawSprite(resources.shadowPath, ctx, x , y + 10);
	
	//game.drawSprite(resources.ballPath, ctx, x , y);
}

game.moveBall = function()
{
	if (game.clickedTile.z == undefined) {
		var tempIsoPos = iso.mapToIso(1, 1);
		game.clickedTile = iso.getClickedTile(tempIsoPos.x, tempIsoPos.z);
	};
	
	var targetX = game.clickedTile.x * iso.tileWidth;
	var targetZ = -game.clickedTile.z * iso.tileWidth;
	
	game.ball.x += Math.ceil((targetX  - game.ball.x)*0.5)
	game.ball.y = game.clickedTile.y;
	game.ball.z += Math.ceil((targetZ  - game.ball.z)*0.5)
	
	var tileX = Math.ceil(game.ball.x/iso.tileWidth);
	var tileZ = Math.ceil(Math.abs(game.ball.z)/iso.tileWidth);
	
	var currentTile = iso.tiles[tileX][tileZ];
	
	game.ball.depth = currentTile.depth;
}

game.Sprite = function (path, x, y, depth) {
	this.path = path;
	this.x = x;
	this.y = y;
	this.depth = depth;
}

game.Sprite.prototype.render = function(ctx) {
	var img = new Image();
	img.src = this.path;
	//console.log(this.path)
	ctx.drawImage(img, this.x, this.y);
}
