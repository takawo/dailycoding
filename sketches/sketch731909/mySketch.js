var beat, drum, myPart;
var boxPat = [];
var drumPat = [];
var msg = 'click to play pattern.';
let bgColor;
let txtColor;
let graphics;
let isPlaying = false;
let font;

function preload() {
	beat = loadSound('beatbox.mp3');
	drum = loadSound('drum.mp3');
	font = loadFont("Righteous-Regular.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);

	let bgHue = random(360);
	let txtHue = (bgHue + 180) % 360

	bgColor = color(bgHue, 70, 100);
	txtColor = color(txtHue, 100, 100);

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	drawNoiseBackground(100000, graphics);

	resetPattern(boxPat, 8);
	resetPattern(drumPat, 8);

	var boxPhrase = new p5.Phrase('beat', playBox, boxPat);
	var drumPhrase = new p5.Phrase('drum', playDrum, drumPat);
	myPart = new p5.Part();
	myPart.addPhrase(boxPhrase);
	myPart.addPhrase(drumPhrase);
	myPart.setBPM(60);

	masterVolume(0.25);
}

function resetPattern(_arr, _n) {
	for (let i = 0; i < _n; i++) {
		_arr[i] = int(random(-1, 3));
	}
}

function draw() {
	background(bgColor);
	textFont(font);
	textAlign(CENTER, CENTER);
	textSize(windowWidth/10);
	fill(txtColor);
	text(msg, width / 2, height / 2);
	image(graphics, 0, 0);
	//print(myPart.getPhrase('beat'));
}

function playBox(time, playbackRate) {
	beat.rate(playbackRate);
	beat.play(time);
}

function playDrum(time, playbackRate) {
	drum.rate(playbackRate);
	drum.play(time);
}

function mouseClicked() {
	resetPattern(boxPat, 8);
	resetPattern(drumPat, 8);
	isPlaying = !isPlaying;
	let bgHue = random(360);
	let txtHue = (bgHue + 180) % 360

	bgColor = color(bgHue, 70, 100);
	txtColor = color(txtHue, 100, 100);

	if (isPlaying) {
		myPart.loop();
		msg = 'playing part...';
	} else {
		myPart.stop();
		msg = 'click to play \nother pattern.';
	}
}

function drawNoiseBackground(_n, _graphics) {
	let c = color(0, 0, 0, 5);
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