let video;
let w = 640;
let h = 480;
let clmtrackr;
let positions = [];

let leftEye = [23, 24, 25, 26];
let lMin, lMax;
let rightEye = [28, 29, 30, 31];
let rMax, rMin;
let ratio = 1.3;

function setup() {
	createCanvas(640, 480);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	video = createCapture(VIDEO);
	video.size(w, h);
	video.hide();

	clmtrackr = new clm.tracker();
	clmtrackr.init(pModel);
	clmtrackr.start(video.elt);
}

function draw() {
	positions = clmtrackr.getCurrentPosition();
	// scale(-1, 1);
	push();
	//translate(-width, 0);
	imageMode(CORNER);
	image(video, 0, 0, width, height);
	drawPoints();
	pop();
}

function drawPoints() {
	lMin = createVector(width, height);
	lMax = createVector(0, 0);
	rMin = createVector(width, height);
	rMax = createVector(0, 0);

	for (var i = 0; i < positions.length - 1; i++) {
		noStroke();

		for (let l of leftEye) {
			if (i == l) {
				lMin.x = min(lMin.x, positions[i][0]);
				lMin.y = min(lMin.y, positions[i][1]);
				lMax.x = max(lMax.x, positions[i][0]);
				lMax.y = max(lMax.y, positions[i][1]);
			}
		}
		for (let r of rightEye) {
			if (i == r) {
				rMin.x = min(rMin.x, positions[i][0]);
				rMin.y = min(rMin.y, positions[i][1]);
				rMax.x = max(rMax.x, positions[i][0]);
				rMax.y = max(rMax.y, positions[i][1]);
			}
		}


		// fill(0, 100, 100);
		// ellipse(positions[i][0], positions[i][1], 6, 6);
	}
	let lw = dist(lMin.x, 0, lMax.x, 0) * ratio;
	let lh = dist(0, lMin.y, 0, lMax.y) * ratio;
	let rw = dist(rMin.x, 0, rMax.x, 0) * ratio;
	let rh = dist(0, rMin.y, 0, rMax.y) * ratio;
	let lc = p5.Vector.lerp(lMin, lMax, 1 / 2);
	let rc = p5.Vector.lerp(rMin, rMax, 1 / 2);
	lMin.x = lc.x - lw / 2;
	lMin.y = lc.y - lh / 2;
	lMax.x = lc.x + lw / 2;
	lMax.y = lc.y + lh / 2;

	//rectMode(CORNERS);
	// rect(lMin.x, lMin.y, lMax.x, lMax.y);
	// rect(rMin.x, rMin.y, rMax.x, rMax.y);

	let lEye = get(lMin.x, lMin.y, lw, lh);
	let rEye = get(rMin.x, rMin.y, rw, rh);


	background(0, 0, 100, 30);
	rectMode(CENTER);
	fill(0, 0, 10, 100);
	noStroke();
	if (lw * lh < width / 2 * height / 2) {
		rect(lc.x, lc.y, lw * 1.2, lh * 1.5);
		image(rEye, 200, 30, 120, 60);
	}
	if (rw * rh < width / 2 * height / 2) {
		rect(rc.x, rc.y, rw * 1.2, rh * 1.5);
		image(lEye, 50, 30, 120, 60);
	}
}