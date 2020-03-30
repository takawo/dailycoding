let video;
let posX, posY, posZ;
let pos = [0, 0, 0];
let isHandDetected = false;
let offsetW = 320 / 2 + 20;
let offsetH = 240 / 2 + 20;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	background(220, 80, 10);
}

Leap.loop(function(frame) {
	if (frame.hands === undefined || frame.hands.length === 0) {
		isHandDetected = false;
		posX = 0;
		posY = 0;
		posZ = 0;
	} else {
		isHandDetected = true;
		var handsLength = frame.hands.length;
		var hand = frame.hands[0];
		var posReal = hand.palmPosition;
		posX = map(hand.palmPosition[0], -330, 330, -width / 2, width / 2);
		posY = map(hand.palmPosition[2], -260, 260, -height / 2, height / 2);
		posZ = map(hand.palmPosition[1], 0, 500, 500, -500);
	}
});

function draw() {
	background(220, 80, 10, 10);
	if (isHandDetected) {
		push();
		translate(posX, posY, posZ);
		normalMaterial();
		sphere(80);
		pop();
	}
	push();
	translate(-width / 2 + offsetW, -height / 2 + offsetH);
	rotateY(PI);
	texture(video);
	noStroke();
	plane(320, 240);
	pop();
}