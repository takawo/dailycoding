let myRec;
let x, y;
let dx, dy;
let d;
let speed;
let lastWord = "";
let font;

function preload() {
	font = loadFont("NotoSansJP-Medium.otf");
}

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	x = width / 2;
	y = height / 2;
	dx = 0;
	dy = 0;
	d = 5;
	speed = 1;
	myRec = new p5.SpeechRec('ja', parseResult);
	myRec.resultConfidence = 0.5;
	myRec.continuous = true;
	myRec.interimResults = true;
	myRec.start();
	background(0, 0, 90);
	textSize(30);
	textFont(font);
	text("点に話しかけてみてください．", 20, 45);
}

function draw() {
	fill(0, 0, 0);
	ellipse(x, y, d, d);
	x += dx;
	y += dy;

	if (x < 0) x = width;
	if (y < 0) y = height;
	if (x > width) x = 0;
	if (y > height) y = 0;
}

function parseResult() {
	let mostrecentword = myRec.resultString;
	print(lastWord);
	for (let i = 0; i < lastWord.length; i++) {
		mostrecentword.replace(lastWord.substr(i, 1), "");
	}
	lastWord = mostrecentword;

	if (mostrecentword.indexOf("左") !== -1 || mostrecentword.indexOf("ひだり") !== -1) {
		dx = -speed;
		dy = 0;
	}
	if (mostrecentword.indexOf("右") !== -1 || mostrecentword.indexOf("みぎ") !== -1) {
		dx = speed;
		dy = 0;
	}
	if (mostrecentword.indexOf("上") !== -1 || mostrecentword.indexOf("うえ") !== -1) {
		dx = 0;
		dy = -speed;
	}
	if (mostrecentword.indexOf("下") !== -1 || mostrecentword.indexOf("した") !== -1) {
		dx = 0;
		dy = speed;
	}
	if (mostrecentword.indexOf("ストップ") !== -1) {
		dx = 0;
		dy = 0;
	}
	if (mostrecentword.indexOf("クリア") !== -1 || mostrecentword.indexOf("くりあ") !== -1) {
		background(0, 0, 90);
	}
	if (mostrecentword.indexOf("大きく") !== -1 || mostrecentword.indexOf("おおきく") !== -1) {
		d = min(d + 2, 15);
	}
	if (mostrecentword.indexOf("小さく") !== -1 || mostrecentword.indexOf("ちいさく") !== -1) {
		d = max(d - 2, 1);
	}
	if (mostrecentword.indexOf("早く") !== -1 || mostrecentword.indexOf("はやく") !== -1) {
		speed = min(speed + 0.2, 5);
	}
	if (mostrecentword.indexOf("遅く") !== -1 || mostrecentword.indexOf("おそく") !== -1) {
		speed = max(speed - 0.2, 1);
	}
	if (mostrecentword.indexOf("終了") !== -1 || mostrecentword.indexOf("おわり") !== -1) {
		noLoop();
	}
}