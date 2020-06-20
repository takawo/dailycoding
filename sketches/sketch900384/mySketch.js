// reference: Akiyoshi Kataoka's Awesome Illusion
//https://twitter.com/AkiyoshiKitaoka/status/1262743320167542787

let cells;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	cells = 13}

function draw() {
	background(0, 0, 90);

	let d = width / cells;
	for (let j = 0; j < cells; j++) {
		for (let i = 0; i < cells; i++) {

			let n = i + j * cells + 1;
			let x = i * d;
			let y = j * d;
			if (n % 2 == 0) {
				fill(0, 0, 100);
			} else {
				fill(0, 0, 20);
			}
			noStroke();
			rectMode(CORNER);
			rect(x, y, d, d);

			if (i != 0) {
				push();
				translate(x, y);
				rotate(45);
				rectMode(CENTER);

				let dd = d / 4.5;
				if (n % 2 == 0) {
					fill(0, 0, 100);
				} else {
					fill(0, 0, 20);
				}
				if (j != 0) {
					rect(-dd / 2, -dd / 2, dd, dd);
					rect(dd / 2, dd / 2, dd, dd);
					if (n % 2 == 0) {
						fill(0, 0, 20);
					} else {
						fill(0, 0, 100);
					}
					rect(-dd / 2, dd / 2, dd, dd);
					rect(dd / 2, -dd / 2, dd, dd);
				}
				pop();
			}
		}
	}
	noLoop();
}