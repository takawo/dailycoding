// ml5 Face Detection Model
let faceapi;
let detections = [];
let capture;
let g;

function setup() {
	createCanvas(1280, 720);
	angleMode(DEGREES);

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
	g = createGraphics(width, height);
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
	g.clear();
	// image(capture, 0, 0);
	// Just look at the first face and draw all the points
	if (detections.length > 0) {
		background(255);
		line(width / 2, 0, width / 2, height);
		line(0, height / 2, width, height / 2);
		let nose = detections[0].parts.nose[6];
		let jaw = detections[0].parts.jawOutline[8];
		// let noses= detections[0].parts.nose;
		// let jaws = detections[0].parts.jawOutline;
		let angle = atan2(jaw._y - nose._y, jaw._x - nose._x);
		let pos = createVector(nose._x, nose._y);
		let center = createVector(width / 2, height / 2);
		let vec = p5.Vector.sub(center, pos);

		g.push();
		g.translate(vec.x, vec.y);
		g.image(capture, 0, 0);
		g.pop();

		push();
		imageMode(CENTER);
		translate(width / 2, height / 2);
		rotate(-angle + 90);
		image(g, 0, 0);
		pop();

	}
}