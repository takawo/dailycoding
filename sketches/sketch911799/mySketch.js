let faceapi;
let detections = [];
let capture;
let scl = 4;
let currentPos;
let stepW, stepH;

function setup() {
	createCanvas(800, 800);
	currentPos = createVector(0, 0);
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
	stepH = random(height / 30, height / 8);
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


function draw() {
	let img = capture.get();
	// background(img);

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

		stepW = int(faceW * stepH / faceH);
		image(face, currentPos.x, currentPos.y, stepW, stepH);

		currentPos.x += stepW;
		if (currentPos.x > width) {
			currentPos.x = 0;
			currentPos.y += stepH;
			stepH = random(height / 30, height / 8);
		}
		if (currentPos.y > height) {
			currentPos.x = 0;
			currentPos.y = 0;
			background(255);
		}
	}
}