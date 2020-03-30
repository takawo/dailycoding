let boardRadius = 10; //radius of hex grid
let size; //size of hexes
let originHex; //very center of the board
let hexes = [];
let mainLayout;
let graphics;

let pallete = ["#0A0311", "#3E1C4B", "#13065C", "#0B089A", "#A922B0", "#D54705", "#76A6A9", "#2A34AF"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	size = Point(15, 15);
	mainLayout = hexLayout(pointyOrient, size);
	hexGenerateBoard(boardRadius, hexes, Hex(0, 0, 0));

	graphics = createGraphics(width, height);
	graphics.colorMode(HSB, 360, 100, 100, 100);
	graphics.noStroke();
	for (let i = 0; i < width * height * 25 / 100; i++) {
		let r = (1 - random(random(random()))) * sqrt(sq(width) + sq(height)) / 2;
		let angle = random(360);
		let x = width / 2 + cos(angle) * r;
		let y = height / 2 + sin(angle) * r;
		let w = random(3);
		let h = random(3);
		random(100) > 50 ? graphics.fill(0, 0, 100, 5) : graphics.fill(0, 0, 0, 15);
		graphics.ellipse(x, y, w, h);
	}
}

function draw() {
	background(0, 0, 55);
	image(graphics, 0, 0);
	push();
	translate(width / 2, height / 2);
	//hexDrawArray(mainLayout, hexes, color(0, 50, 100));
	// hexDebugGrid(mainLayout, hexes);

	// noStroke();
	let i = 0;

	for (let h of hexes) {
		// print(h);
		let points = hexGetCorners(mainLayout, h);
		let center = createVector(0, 0);
		for (let p of points) {
			center.add(createVector(p.x, p.y));
		}
		center.div(points.length);

		for (let p of points) {
			p.x -= center.x;
			p.y -= center.y;
		}
		let distance = dist(points[0].x, points[0].y, center.x, center.y);
		push();
		translate(center.x, center.y);
		rotate(random(360));
		let n = int(random(points.length));
		let nn = int(random(5, 10));
		let isCircle = random(100) > 50 ? true : false;
		for (let m = nn; m > 0; m--) {
			let r = map(sqrt(sq(h.q) + sq(h.s) + sq(h.r)), 0, 8, 5, 0);
			let q = r;
			let p1 = createVector(points[n].x, points[n].y).mult(q);
			let p2 = createVector(points[(n + 1) % points.length].x, points[(n + 1) % points.length].y).mult(q);
			let p3 = createVector(points[(n + 3) % points.length].x, points[(n + 3) % points.length].y).mult(q);
			let p4 = createVector(points[(n + 4) % points.length].x, points[(n + 4) % points.length].y).mult(q);
			if (isCircle) {
			arc(0,0,distance/3*m/nn,distance/3*m/nn,0,90,PIE);
			
			} else {
				if (n % 2 == 0) {
					beginShape();
					vertex(p1.x * m / nn, p1.y * m / nn);
					vertex(p2.x * m / nn, p2.y * m / nn);
					// vertex(p3.x* m/nn,p3.y* m/nn);      
					vertex(p4.x * m / nn, p4.y * m / nn);
					endShape(CLOSE);
				} else {
					beginShape();
					// vertex(p1.x * m/nn,p1.y* m/nn);      
					vertex(p2.x * m / nn, p2.y * m / nn);
					vertex(p3.x * m / nn, p3.y * m / nn);
					vertex(p4.x * m / nn, p4.y * m / nn);
					endShape(CLOSE);
				}
			}
		}

		beginShape();


		// vertex(points[n].x, points[n].y);
		// vertex(points[(n + 1) % points.length].x, points[(n + 1) % points.length].y);
		// // zif (random(100) > 50) {
		// //   let x = lerp(points[(n + 3) % points.length].x,
		// //     points[(n + 4) % points.length].x,
		// //     0.5);
		// //   let y = lerp(points[(n + 3) % points.length].y,
		// //     points[(n + 4) % points.length].y,
		// //     0.5);
		// //   vertex(x, y);
		// // } else {
		// vertex(points[(n + 3) % points.length].x, points[(n + 3) % points.length].y);
		// vertex(points[(n + 4) % points.length].x, points[(n + 4) % points.length].y);
		// }
		endShape(CLOSE);
		pop();

		// stroke(0, 0, 10);
		// ellipse(center.x, center.y, 10, 10);
		i++;
	}
	pop();
	noLoop();
}