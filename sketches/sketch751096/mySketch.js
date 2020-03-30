let colors = ["#DADCDA", "#DE200C", "#3A6DA8", "#A8BACC", "#0A1D4E", "#CD4645", "#C0AEB5", "#838CA9"];

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
	let bgNum = int(random(colors.length));
	let bg = colors[bgNum];
	background(bg);
	colors.splice(bgNum, 1);
	let cellNum = int(random(3, 15));
	let offset = 600 / 10; //60px;
	let cell = (600 - offset * 2) / cellNum;

	for (let j = 0; j < cellNum; j = j + 1) {
		for (let i = 0; i < cellNum; i = i + 1) {
			let x = i * cell + offset + cell / 2;
			let y = j * cell + offset + cell / 2;
			let d = cell * 1.25;
			let c = random(colors);
			if (random(100) < 50) {
				fill(c);
				noStroke();
			} else {
				stroke(c);
				noFill();
			}
			push();
			translate(x, y);
			let n = int(random(8));
			let angle = n * 360 / 8;
			rotate(angle);
			rectMode(CENTER);

			let shapeNum = int(random(4));
			if (shapeNum == 0) {
				square(0, 0, d / 2);
			} else if (shapeNum == 1) {
				circle(0, 0, d / 2);
			} else if (shapeNum == 2) {
				triangle(-d / 4, -d / 4, d / 4, -d / 4, -d / 4, d / 4);
			} else if (shapeNum == 3) {
				arc(0, 0, d / 2, d / 2, 0, 270);
			}
			pop();
		}
	}
	for (let i = 0; i < 100000; i = i + 1) {
		stroke(255, 15);
		let px = random(600);
		let py = random(600);
		point(px, py);
	}
}