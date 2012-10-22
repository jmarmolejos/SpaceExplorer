animator = {};
animator.canvasWidth = 300;
animator.canvasHeight = 480;

animator.curve = {
	startX : getRandBetween(0, 250),
	startY : 0,
	controlX1 : getRandBetween(-10, 180),
    controlY1 : getRandBetween(0, 100),
    controlX2 : getRandBetween(0, 400),
    controlY2 : getRandBetween(100, 250),
    endX : getRandBetween(0, 10),
    endY : 480
};

animator.newCurve = function() {
	this.curve = {
		startX : getRandBetween(0, 250),
		startY : 0,
		controlX1 : getRandBetween(-10, 180),
	    controlY1 : getRandBetween(0, 100),
	    controlX2 : getRandBetween(0, 400),
	    controlY2 : getRandBetween(100, 250),
	    endX : getRandBetween(0, 10),
	    endY : 480
	};
};

animator.stepCount = 0;

animator.step = function() {
	
	ctx = contextFactory.getContext('le-canvas');
	
	ctx.clearRect(0, 0, animator.canvasWidth, animator.canvasHeight);
	
	var curvePoint = getCurvePoint(animator.curve.startX, 
		animator.curve.startY, 
		animator.curve.controlX1, 
		animator.curve.controlX2,
		animator.curve.controlY1,
		animator.curve.controlY2,
		animator.curve.endX,
		animator.curve.endY,
		animator.stepCount/100);
		
	var refPoint = getCurvePoint(animator.curve.startX, 
		animator.curve.startY, 
		animator.curve.controlX1, 
		animator.curve.controlX2,
		animator.curve.controlY1,
		animator.curve.controlY2,
		animator.curve.endX,
		animator.curve.endY,
		(animator.stepCount + 1)/100);
	
	drawTriangle(ctx, curvePoint.x, curvePoint.y, 10, 5, refPoint);
	
	animator.stepCount++;
	
	if (animator.stepCount > 100) {
		animator.newCurve(); 
		animator.stepCount = 0;
	};
};