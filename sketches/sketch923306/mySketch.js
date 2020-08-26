let bounds = [];
let faceapi;
let detections = [];
let capture;
let count = 0;
let isDebug = true;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(0, 0, 90);
	drawingContext.imageSmoothingEnabled = false;

	let constraints = {
		video: {
			mandatory: {
				minWidth: 1280,
				minHeight: 720
			},
			optional: [{
				maxFrameRate: 30
			}]
		},
		audio: false
	};

	capture = createCapture(constraints);
	capture.hide();

	const faceOptions = {
		withLandmarks: true,
		withDescriptors: false,
		minConfidence: 0.5
	};
	faceapi = ml5.faceApi(capture, faceOptions, faceReady);
	separateGrid(0, 0, width, height);
}

function faceReady() {
	faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
	if (error) {
		console.log(error);
		return;
	}
	detections = result;
	faceapi.detect(gotFaces);
}

function draw() {
	if (detections.length > 0) {
		let imgMouth = findParts(capture, detections[0].parts.mouth, 0.1);
		// let imgNose = findParts(capture, detections[0].parts.nose);
		let imgLeftEye = findParts(capture, detections[0].parts.leftEye, 0.2);
		let imgRightEye = findParts(capture, detections[0].parts.rightEye, 0.2);
		switch (int(random(3))) {
			case 0:
				drawParts(imgLeftEye);
				break;
			case 1:
				drawParts(imgRightEye);
				break;
			case 2:
				drawParts(imgMouth);
				break;
		}
	}
	if (isDebug) {
		noStroke();
		rect(width - (180 + 10 / 2), height - (110 + 10 / 2), 160 + 10, 90 + 10);
		image(capture, width - 180, height - 110, 160, 90);

	}

}

function mousePressed() {
	isDebug = !isDebug;
	reset();
}

function reset() {
	background(0, 0, 90)
	count = 0;
	bounds = [];
	separateGrid(0, 0, width, height);
}

function findParts(img, data, ratio) {
	let minX = img.width;
	let minY = img.height;
	let maxX = 0;
	let maxY = 0;

	for (let p of data) {
		minX = min(p._x, minX);
		minY = min(p._y, minY);
		maxX = max(p._x, maxX);
		maxY = max(p._y, maxY);
	}
	let bound = new Bound(minX, minY, maxX - minX, maxY - minY);
	return img.get(bound.x - bound.w * ratio, bound.y - bound.h * ratio, bound.w * (1 + ratio * 2), bound.h * (1 + ratio * 2));
}

function drawParts(img) {
	let cx = bounds[count].x + bounds[count].w / 2;
	let cy = bounds[count].y + bounds[count].h / 2;
	let cw = bounds[count].w;
	let ch = bounds[count].h;
	let rotate_num = int(random(4));
	if (rotate_num % 2 == 1) {
		cw = bounds[count].h;
		ch = bounds[count].w;
	}

	push();
	translate(cx, cy);
	rotate(rotate_num * 360 / 4);
	translate(-cw / 2, -ch / 2);
	drawingContext.shadowColor = color(0, 0, 0, 30);
	drawingContext.shadowBlur = min(cw, ch) / 5;
	image(img, 0, 0, cw, ch);
	pop();

	count++;
	if (count > bounds.length - 1) {
		reset();
	}
}

class Bound {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

function separateGrid(x, y, w, h) {
	// drawingContext.shadowColor = color(0, 0, 0, 20);
	// drawingContext.shadowBlur = 10;
	// noStroke();
	// rect(x, y, w, h);
	bounds.push(new Bound(x, y, w, h));
	let ratio = 0.15;
	let nw = random(ratio, 1 - ratio) * w;
	let nh = random(ratio, 1 - ratio) * h;
	if (min(nw, nh) > width / 50) {
		separateGrid(x, y, nw, nh);
		separateGrid(x + nw, y, w - nw, nh);
		separateGrid(x, y + nh, nw, h - nh);
		separateGrid(x + nw, y + nh, w - nw, h - nh);
	}
}