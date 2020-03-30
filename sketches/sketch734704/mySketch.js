let osc, envelope, fft;
let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;
let midiValue;
let freqValue;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	osc = new p5.SinOsc();

	envelope = new p5.Envelope();
	envelope.setADSR(0.001, 0.5, 0.1, 1.5);
	envelope.setRange(0.5, 0);

	osc.start();

	fft = new p5.FFT();
	background(0, 0, 20);
}

function draw() {
	background(0, 0, 20, 30);

	if (frameCount % 60 == 1) {
		midiValue = scaleArray[note];
		freqValue = midiToFreq(midiValue) * pow(2, int(random(-3, 3)));
		osc.freq(freqValue);

		envelope.play(osc, 0, 0.1);
		note = (note + 1) % scaleArray.length;
	}

	let spectrum = fft.analyze();
	for (var i = 0; i < spectrum.length / 20; i++) {
		noStroke();
		let hueValue = map(midiValue, scaleArray[0], scaleArray[scaleArray.length - 1], 0, 360);
		fill(hueValue, 80, 100);
		var x = map(i, 0, spectrum.length / 20, 0, width);
		var h = map(spectrum[i], 0, 255, 0, height);
		rect(x, height, spectrum.length / 20, -h);
	}
}