var iso = {
	tileWidth : 30,
	tileHeight : 30,
	maxX: 450,
	maxZ: 450,
	tiles: [],
	alpha: 45 * (Math.PI/180),
	theta: 30 * (Math.PI/180)
	
};

iso.drawIsoTile = function (ctx, startX, startY) {
	x = 0;
	y = 0;
	
	var img = new Image();
	img.src = resources.tilePath;
	
	ctx.save();
	
	ctx.translate(startX, startY)
	
	ctx.drawImage(img, -21, 0); // TODO investigate why on earth there's this offset with the x position when rendering the image
	
	ctx.scale(1, 0.5);
	ctx.rotate(45 * (Math.PI/180));
	
	ctx.beginPath();
	ctx.lineTo(iso.tileWidth, y);
	ctx.lineTo(iso.tileWidth, iso.tileHeight);
	ctx.lineTo(x, iso.tileHeight)
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.stroke();
	
	ctx.restore();
}

iso.buildFloor = function (ctx) {
	
	for (var j=1; j <= 10; j++) {
		
		for (var i=1; i <= 30; i++) {
			// Ugly hack to avoid regenerating tiles
			
			if (iso.tiles[i] != undefined && iso.tiles[i][j] != undefined) {
				
				var tile = iso.tiles[i][j];
				
				var y  = tile.y;
				
				var x = (tile.x-1)*iso.tileWidth;
				var z = -(tile.z-1)*iso.tileWidth;
				
				var screenCoords = iso.mapToScreen(x, y, z);
				
				var sprite = new game.Sprite(resources.tilePath, screenCoords.x - 21, screenCoords.y, tile.depth); // TODO investigate why on earth there's this offset with the x position when rendering the image
				renderer.pipeline.push(sprite);
				//iso.drawIsoTile(ctx, screenCoords.x, screenCoords.y)
			} else {
				
				var y = getRandBetween(5, 10);
				var depth = iso.getDepth(i, 1, j); // Using 1 as the y param because we're only building one floor
				
				if (j == 1) {
					iso.tiles[i] = [];
				};
				
				iso.tiles[i][j] = {
					x:i,
					y:y,
					z:j,
					depth : depth
				}
				
				var x = (i-1)*iso.tileWidth;
				var z = -(j-1)*iso.tileWidth;
				
				var screenCoords = iso.mapToScreen(x, y, z);
				
				var sprite = new game.Sprite(resources.tilePath, screenCoords.x - 21, screenCoords.y, depth); // TODO investigate why on earth there's this offset with the x position when rendering the image
				renderer.pipeline.push(sprite);
				//iso.drawIsoTile(ctx, screenCoords.x, screenCoords.y)
			};
			
		};
		
	};
	
	//console.dir(iso.tiles)
}

iso.mapToScreen = function (xpp, ypp, zpp) {
	
	var yp = ypp;
	var xp = xpp*Math.cos(iso.alpha) + zpp * Math.sin(iso.alpha);
	var zp = zpp*Math.cos(iso.alpha) - xpp * Math.sin(iso.alpha);
	
	var x = xp;
	y = yp * Math.cos(iso.theta) - zp*Math.sin(iso.theta);
	
	return {x : x, y : y} 
}

iso.mapToIso = function (screenX, screenY) {
	
	var cosAlpha = Math.cos(iso.alpha);
	var sinAlpha = Math.sin(iso.alpha);
	
	var cosTheta = Math.cos(iso.theta);
	var sinTheta = Math.sin(iso.theta);
	
	var z = (screenX/cosAlpha - screenY/(sinAlpha*sinTheta)) * (1/(cosAlpha / sinAlpha + sinAlpha/cosAlpha));
	var x = (1/cosAlpha)*(screenX-z*sinAlpha);
	
	return {z:z, x:x};
}

iso.getDepth = function (x, y, z) {
	var leeway = 5;
	
	var x = Math.abs(x) * leeway;
	var y = Math.abs(y);
	var z = Math.abs(z) * leeway;
	
	var a = iso.maxX;
	var b = iso.maxZ;
	
	var floor = a*(b-1) + x;
	var depth = a*(z-1) + x + floor * y;
	
	return depth;
}

iso.getClickedTile = function (x, z) {
	
	var x = Math.ceil(x/iso.tileWidth);
	var z = Math.ceil(Math.abs(z)/iso.tileWidth);
	
	var tile = iso.tiles[x][z] 
	
	return tile;
}