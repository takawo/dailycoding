// ml5 Face Detection Model
let faceapi;
let detections = [];
let capture;

function setup() {
	createCanvas(1280, 720);

	let constraints = {
		video: {
			mandatory: {
				minWidth: width,
				minHeight: height
			},
			optional: [{
				maxFrameRate: 30
			}]
		},
		audio: false
	};

	// Creat the video and start face tracking
	capture = createCapture(constraints);
	capture.size(width / 2, height / 2);
	capture.hide();
	// Only need landmarks for this example
	const faceOptions = {
		withLandmarks: true,
		withExpressions: false,
		withDescriptors: false
	};
	faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

// Start detecting faces
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

// Draw everything
function draw() {
	// image(capture, 0, 0);

	// Just look at the first face and draw all the points
	if (detections.length > 0) {
		background(255);
		line(width/2,0,width/2,height);
		line(0,height/2,width,height/2);
		let nose = detections[0].parts.nose[0];
		let pos = createVector(nose._x, nose._y);
		let center = createVector(width / 2, height / 2);
		let vec = p5.Vector.sub(center, pos);
		push();
		translate(vec.x, vec.y);
		image(capture, 0, 0);
		pop();
	}
}