function drawRandomCurve() {
	var canvas = document.getElementById('le-canvas');
	var ctx = canvas.getContext('2d');
	
	ctx.moveTo(getRandBetween(0, 400), 0);
	
	var controlX1 = getRandBetween(-10, 180);
    var controlY1 = getRandBetween(0, 100);
    var controlX2 = getRandBetween(0, 400);
    var controlY2 = getRandBetween(100, 250);
    var endX = getRandBetween(0, 10);
    var endY = 480;
    
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, 
        controlY2, endX, endY);
	
	ctx.lineWidth = 0.2;
	
	ctx.strokeStyle = 'rgba(0, 0, 0,' + 1/getRandBetween(20, 35) + ')';
	
	ctx.stroke();
}

function drawSprites(howMany) {
	
	var canvas = document.getElementById('le-canvas');
	var ctx = canvas.getContext('2d');
	
	var startX = getRandBetween(0, 250);
	var startY = 0;
	var controlX1 = getRandBetween(-10, 180);
    var controlY1 = getRandBetween(0, 100);
    var controlX2 = getRandBetween(0, 400);
    var controlY2 = getRandBetween(100, 250);
    var endX = getRandBetween(0, 10);
    var endY = 480;
    
    for (var i=0; i <= 1; i += 1/howMany) {
    	var p = getCurvePoint(startX, startY, controlX1, controlX2, controlY1, controlY2, endX, endY, i);
    	
    	var pointTo = getCurvePoint(startX, startY, controlX1, controlX2, controlY1, controlY2, endX, endY, i + (1/howMany) );
    	
    	drawTriangle(ctx, p.x, p.y, 15, 5, pointTo)
    	
    	console.log(p.x + " : "+ p.y)
	};
	
	ctx.moveTo(startX, startY);
	
	ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
	
	ctx.lineWidth = 0.2;
	
	//ctx.strokeStyle = 'rgba(0, 0, 0,' + 1/getRandBetween(20, 35) + ')';
	
	ctx.stroke();			    
};

// Drawing methods

// TODO draw the triangle pointing to the right, initial orientation influences rotation
function drawTriangle(ctx, x, y, width, height, pointTo)
{
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(calcRotation({x:x, y:y}, pointTo));
	
	x = y = 0;
	
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - (width - 2), y - height);
	ctx.lineTo(x + (width - 2), y - height);
	ctx.lineTo(x, y);				
	ctx.closePath();
	
	ctx.fill();
	
	ctx.restore();
}

function drawRotateSquare(x, y) {
	ctx = contextFactory.getContext('le-canvas')
	
	//console.dir(ctx)
	
	ctx.translate(x, y);
	ctx.rotate(Math.PI/3)
			
	ctx.fillRect(0, 0, 100, 200)
};

// Infrastructure
contextFactory = {};
contextFactory.getContext = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext('2d');
	
	return ctx;
};