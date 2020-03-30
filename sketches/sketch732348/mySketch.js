let oscillatorA;
let oscillatorB;
let fft;
let types = ['sine', 'triangle', 'sawtooth', 'square'];

let graphics;
let backgroundColor;
let strokeColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	oscillatorA = new p5.Oscillator();
	oscillatorB = new p5.Oscillator();
	oscillatorInit();
	init();
}

function setRandomOscillator(oscillator, _types, _amp) {
	oscillator.setType(_types[int(random(_types.length))]);
	oscillator.freq(int(random(20, 200)));
	oscillator.amp(_amp);
	return oscillator;
}

function oscillatorInit() {
	oscillatorA = setRandomOscillator(oscillatorA, types, 0);
	oscillatorA.start();

	oscillatorB = setRandomOscillator(oscillatorB, types, 0.5);

	oscillatorB.disconnect();
	oscillatorB.start();
	oscillatorA.amp(oscillatorB.scale(-1, 1, 1, -1));

	fft = new p5.FFT();
}

function init() {
	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(graphics, 100000);
	let n = int(random(3, 10));
	let bh = int(random(n)) * 360 / n;
	let sh = (180 + bh) % 360;
	backgroundColor = color(bh, 80, 10);
	strokeColor = color(sh, 100, 100);
}


function draw() {
	blendMode(BLEND);
	background(backgroundColor);
	blendMode(ADD);
	image(graphics, 0, 0);

	let modFreq = map(mouseY, 0, height, 400, 0);
	oscillatorB.freq(modFreq);

	let modAmp = map(mouseX, 0, width, 0, 1);
	oscillatorB.amp(modAmp, 0.01);

	waveform = fft.waveform();

	stroke(strokeColor);
	noFill();
	strokeWeight(2);
	strokeJoin(MITER);
	beginShape();
	for (let i = 0; i < waveform.length; i++) {
		let x = map(i, 0, waveform.length, 0, width);
		let y = map(waveform[i], -1, 1, -height / 2, height / 2);
		y *= 2;
		vertex(x, y + height / 2);
	}
	endShape();
	strokeWeight(1);
	noFill();
	text('Frequency : ' + modFreq.toFixed(3) + ' Hz', 20, 20);
	text('Amplitude : ' + modAmp.toFixed(3), 20, 40);
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 100, 5);
	for (let i = 0; i < _n; i++) {
		let x = random(1) * width;
		let y = random(1) * height;
		let w = random(1, 2);
		let h = random(1, 2);
		_graphics.noStroke();
		_graphics.fill(c);
		_graphics.ellipse(x, y, w, h);
	}
}