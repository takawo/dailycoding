let graphics;
let emojiArr = [];
let emoji;
let emojiIndex;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	emojiArr = createEmojiArr();
	emojiIndex = int(random(emojiArr.length));
	emoji = emojiArr[emojiIndex];

	graphics = createGraphics(width / 2, height / 2);
	graphics.textSize(graphics.width / 2);
	graphics.textAlign(CENTER, CENTER);
	graphics.text(emoji, graphics.width / 2, graphics.height / 2);
}

function draw() {
	//background(255);
	let x = sin(frameCount * 5 / 4) * width / 4;
	let y = cos(frameCount * 3 / 4) * height / 4;
	push();
	translate(width / 2, height / 2);
	push();
	translate(x, y);
	rotate(frameCount * 3);
	scale(tan(frameCount * 0.01 % 90));
	imageMode(CENTER);
	image(graphics, 0, 0);
	pop();
	pop();

	if (frameCount % 180 == 0) {
		emojiIndex = int(random(emojiArr.length));
		emoji = emojiArr[emojiIndex];
		graphics.clear();
		graphics.text(emoji, graphics.width / 2, graphics.height / 2);

	}
}

function createEmojiArr() {
	let arr = [];
	let emoji;
	for (let i = 128512; i < 128592; i++) {
		emoji = String.fromCodePoint(i);
		arr.push(emoji);
	}
	for (let i = 127744; i < 128318; i++) {
		emoji = String.fromCodePoint(i);
		arr.push(emoji);
	}
	return arr;
}