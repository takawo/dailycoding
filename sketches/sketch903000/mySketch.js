let glitch;

function setup() {
	let c = createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	glitch = new Glitch();
	c.drop(gotFile);
}

function draw() {
	background(0, 0, 90);
	fill(0, 0, 10);
	noStroke();
	textSize(60);
	textStyle(BOLD);
	textAlign(CENTER, CENTER);
	text('Drag and drop\nwhatever file\nyou want to glitch\nonto this canvas.', width / 2, height / 2);
	noLoop();
}

function gotFile(file) {
	glitch.resetBytes();
	glitch.loadBytes(file.data, function() {
		glitch.limitBytes(0.1, 0.9);
		glitch.randomBytes(int(random(3000))); 
		glitch.saveBytes(file.name.replace(".", "-glitched."));
	});
}