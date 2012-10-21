// Calcs
			
// TODO find a y at x function so we can get y as a function of x. 
function getCurvePoint(startX, startY, controlX1, controlX2, controlY1, controlY2, endX, endY, t) {
	var p = {};
	p.x = Math.pow(1-t, 3)*startX + 3 * Math.pow(1 - t, 2) * t * controlX1 + 3 * (1-t)* Math.pow(t, 2) * controlX2 + Math.pow(t, 3) * endX;
	p.y = Math.pow(1-t, 3)*startY + 3 * Math.pow(1 - t, 2) * t * controlY1 + 3 * (1-t)* Math.pow(t, 2) * controlY2 + Math.pow(t, 3) * endY;
	
	return p;
};

function getRandBetween(first, last){
	return Math.floor(Math.random()*last) + first;
}

function calcRotation (p1, p2) {
	var x = p2.x - p1.x;
	var y = p2.y - p1.y;
	
	return -Math.atan2(x, y) // negative to adjust for the triangle's initial orientation
}