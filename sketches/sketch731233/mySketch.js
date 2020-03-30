// forked from https://kylemcdonald.github.io/cv-examples/

var capture;
var previousPixels;
var w = 640;
var h = 480;
let slider;
let diffGraph;
let graphHeight = h * 1 / 3;

function setup() {
	capture = createCapture({
		audio: false,
		video: {
			width: w,
			height: h
		}
	}, function() {
		// console.log('capture ready.')
	});
	capture.elt.setAttribute('playsinline', '');
	capture.size(w, h);
	createCanvas(w, h);
	capture.hide();
	slider = createSlider(0, 100, 25);
	slider.position(20, 20);
	diffGraph = new Graph(w, 0, w * h);
}

function copyImage(src, dst) {
	var n = src.length;
	if (!dst || dst.length != n) dst = new src.constructor(n);
	while (n--) dst[n] = src[n];
	return dst;
}

function draw() {
	background(255, 5);
	capture.loadPixels();
	var total = 0;
	if (capture.pixels.length > 0) { // don't forget this!
		if (!previousPixels) {
			previousPixels = copyImage(capture.pixels, previousPixels);
		} else {
			var w = capture.width,
				h = capture.height;
			var i = 0;
			var pixels = capture.pixels;
			var thresholdAmount = slider.value() * 255. / 100.;
			thresholdAmount *= 3; // 3 for r, g, b
			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var rdiff = abs(pixels[i + 0] - previousPixels[i + 0]);
					var gdiff = abs(pixels[i + 1] - previousPixels[i + 1]);
					var bdiff = abs(pixels[i + 2] - previousPixels[i + 2]);
					previousPixels[i + 0] = pixels[i + 0];
					previousPixels[i + 1] = pixels[i + 1];
					previousPixels[i + 2] = pixels[i + 2];
					var diffs = rdiff + gdiff + bdiff;
					var output = 255;
					if (diffs > thresholdAmount) {
						output = 0;
						total += 1;
					}
					pixels[i++] = output;
					pixels[i++] = output;
					pixels[i++] = output;

					i++;
				}
			}
		}
	}
	if (total > 0) {
		capture.updatePixels();
		image(capture, 0, 0, 640, 480);
	}
	fill(0);
	noStroke();
	text("Pixels : " + total, 15, 50);
	stroke(128, 128);
	strokeWeight(1);
	line(0, height / 2 - graphHeight / 2, width, height / 2 - graphHeight / 2);
	line(0, height / 2, width, height / 2);
	line(0, height / 2 + graphHeight / 2, width, height / 2 + graphHeight / 2);

	push();
	translate(0, height / 2 - graphHeight / 2);
	stroke(0);
	noFill();
	diffGraph.addSample(total * 5);
	diffGraph.draw(width, graphHeight, 1.5);
	pop();
}