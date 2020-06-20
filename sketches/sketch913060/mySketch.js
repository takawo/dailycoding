let bounds = [];
let capture;
let imgs = [];
let scl = 2;
let detections = [];
let count = 0;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	capture = createCapture({
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
	}, function() {
		capture.size(1280 / scl, 720 / scl);
		capture.hide();
		const faceOptions = {
			withLandmarks: true,
			withExpressions: false,
			withDescriptors: false
		};
		faceapi = ml5.faceApi(capture, faceOptions, faceReady);
	});
	separateGrid(0, 0, width, height);
}

function draw() {

	let img = capture.get();

	if (detections.length > 0) {

		let points = detections[0].landmarks.positions;
		let faceCenter = createVector(points[28]._x, points[28]._y);
		let faceW = dist(points[28]._x, points[28]._y,
			points[15]._x, points[15]._y) * 2;
		let faceH = dist(points[28]._x, points[28]._y,
			points[8]._x, points[8]._y) * 2;
		let face = img.get((faceCenter.x - faceW / 2),
			(faceCenter.y - faceH / 2),
			faceW * 1.2, faceH * 1.2);

		let cx = bounds[count].x + bounds[count].w / 2;
		let cy = bounds[count].y + bounds[count].h / 2;
		let cw = bounds[count].w;
		let ch = bounds[count].h;
		let rotate_num = count % 4;
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
		image(face, 0, 0, cw, ch);
		pop();

		count++;
		if (count > bounds.length - 1) {
			count = 0;
			bounds = [];
			separateGrid(0, 0, width, height);
		}

	}
}

function separateGrid(x, y, w, h) {
	// drawingContext.shadowColor = color(0, 0, 0, 20);
	// drawingContext.shadowBlur = 10;
	// noStroke();
	// rect(x, y, w, h);
	bounds.push(new Bound(x, y, w, h));
	let ratio = 0.05;
	let nw = random(ratio, 1 - ratio) * w;
	let nh = random(ratio, 1 - ratio) * h;
	if (min(nw, nh) > width / 20) {
		separateGrid(x, y, nw, nh);
		separateGrid(x + nw, y, w - nw, nh);
		separateGrid(x, y + nh, nw, w - nh);
		separateGrid(x + nw, y + nh, w - nw, h - nh);
	}
}

function faceReady() {
	faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
	if (error) {
		console.log(error);
		return;
	}
	detections = result;
	faceapi.detect(gotFaces);
}

class Bound {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}