//reference : christopher carlson's awesome article😁
//https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/

let graphices = [];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	for (let i = 0; i < 2; i++) {
		let graphics = createGraphics(width, height);
		graphics.colorMode(HSB, 360, 100, 100, 100);
		graphics.angleMode(DEGREES);
		graphics.background(0, 0, 100 - i * 100);
		graphics.strokeWeight(graphics.width * 1 / 3);
		graphics.stroke(0, 0, i * 100);
		graphics.noFill();
		graphics.arc(0, 0, graphics.width, graphics.height, 0, 90);
		graphics.fill(100 - i * 100);
		graphics.arc(graphics.width, graphics.height, graphics.width, graphics.height, 0 + 180, 90 + 180);
		graphices.push(graphics);
	}

}

function draw() {
	background(0, 0, 90);
	let offset = width / 10;
	separateGrid(offset, offset, width - offset * 2);
	noLoop();
	// image(graphics, offset, offset,
	//   width - offset * 2,
	//   height - offset * 2);
}


function separateGrid(x, y, d) {
	let sepNum = 2;
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			if (random(100) < 80 && w > width / 15) {
				separateGrid(i, j, w);
			} else {
				// rect(i, j, w, w);
				let graphics = random(graphices);
				push();
				translate(i + w / 2, j + w / 2);
				rotate(int(random(4)) * 360 / 4);
				imageMode(CENTER);
				image(graphics, 0, 0, w, w);
				pop();
			}
		}
	}
}