//reference: @hoshiasahi07's awesome 顔シレーター(face oscillator) tweet.
//https://twitter.com/hoshiasahi07/status/1291727540982185985

p5.disableFriendlyErrors = true;

// ml5 Face Detection Model
let faceapi;
let detections = [];
let offset, margin;
let icons = ["😑", "😀", "😰", "😡", "😱", "😒", "😮"];
let osc_types = ['sine', 'triangle', 'sawtooth', 'square']
let isDebug = true;
let video;
let oscs = [];
let isPlaying = false;

function setup() {
	createCanvas(640, 480);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	let constraints = {
		video: {
			mandatory: {
				minWidth: 640,
				minHeight: 480
			},
			optional: [{
				maxFrameRate: 120
			}]
		},
		audio: true
	};
	video = createCapture(constraints, function() {
		for (let i = 0; i < 6; i++) {
			let osc = new p5.Oscillator(osc_types[i % osc_types.length]);
			osc.start();
			osc.amp(0, 0);
			oscs.push(osc);
			isPlaying = true;
		}
	});
	video.size(width, height);
	video.hide();
	const faceOptions = {
		withLandmarks: false,
		withExpressions: true,
		withDescriptors: false
	};
	faceapi = ml5.faceApi(video, faceOptions, faceReady);

	offset = width / 20;
	margin = offset / 3;
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

// Draw everything
function draw() {
	image(video, 0, 0);
	fill(0, 0, 100, 50);
	rect(0, 0, width, height);

	// Just look at the first face and draw all the points
	if (detections.length > 0) {
		// print(detections);
		let center = createVector(detections[0].detection._box.x +
			detections[0].detection._box._width / 2,
			detections[0].detection._box.y +
			detections[0].detection._box._height / 2);
		let obj = detections[0].expressions;
		// let points = detections[0].landmarks.positions;
		// for (let i = 0; i < points.length; i++) {
		//   stroke(161, 95, 251);
		//   strokeWeight(4);
		//   point(points[i]._x, points[i]._y);
		// }

		if (isPlaying) {

			for (let i = 0; i < oscs.length; i++) {
				let key = Object.keys(obj);
				let freq = constrain(map(center.y, 0, height, 100, 800), 100, 800);
				let amp = constrain(map(obj[key[i + 1]], 0, 1, 0, 1), 0, 1);
				let pan = map(center.x, 0, width, 1.0, -1.0);
				oscs[i].freq(freq, 0);
				oscs[i].amp(amp, 0);
				oscs[i].pan(pan, 0);
			}

		}

		cellW = (width - offset * 2 - margin * (Object.keys(obj).length - 1)) / Object.keys(obj).length;
		cellH = height / 8;

		// print(Object.keys(obj));
		if (isDebug) {
			let i = 0;
			for (let k of Object.keys(obj)) {

				noStroke();
				fill(0);

				let x = map(i, 0, Object.keys(obj).length - 1, offset, width - offset - cellW);
				let y = height - margin * 3;

				let h = map(i, 0, Object.keys(obj).length, 0, 360);
				let s = sq(obj[k]) * 100;

				fill(h, s, 100);
				rect(x, y, cellW, -obj[k] * cellH);

				fill(0, 0, 20);
				textAlign(CENTER, CENTER);
				textSize(12);
				textStyle(BOLD);
				let label = k;
				text(label.toUpperCase(), x + cellW / 2, y + margin);

				if (obj[k] > 0.5) {
					textSize(40);
					text(icons[i], x + cellW / 2, y - obj[k] * cellH - 25);
				}
				i++;
			}
		}
	}

}

function mousePressed() {
	isDebug = !isDebug;
}

function floatRound(value, base) {
	return round(value * base) / base;
}