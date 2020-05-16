//reference: Dan Shiffman's awesome youtube video! I love it.
//https://www.youtube.com/watch?v=4066MndcyCk

let points = [];
let point_num = 50;

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);

	pixelDensity(1);

	for (let i = 0; i < point_num; i++) {
		let x = random(width);
		let y = random(height);
		points.push(createVector(x, y));
	}

}

function draw() {
	background(0);

	loadPixels();
	// print(pixels.length);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {

			let distances = [];
			for (let i = 0; i < points.length; i++) {
				distances[i] = dist(x, y, points[i].x, points[i].y);
			}

			let num = 0;
			let sorted = sort(distances);
			let r = map(sorted[0], 0, width / 5, 0, 255);
			let g = map(sorted[0], 0, width / 5, 255, 0);
			let b = map(sorted[1], 0, width / 5, 0, 255);

			let index = (x + y * width) * 4;
			pixels[index] = r; //R
			pixels[index + 1] = g; //G
			pixels[index + 2] = b; //B
			// pixels[index + 3] = n; // A
		}
	}
	updatePixels();

	// for (let p of points) {
	//   stroke(0, 255, 0);
	//   strokeWeight(8);
	//   point(p.x, p.y);
	// }

	noLoop();
}