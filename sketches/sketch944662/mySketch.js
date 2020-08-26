let palette = ["#4D6F83", "#B1B0B1", "#278DD3", "#F8B623", "#3C494F", "#D51311", "#FDFDFD", "#02020C"];

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360, 100, 100, 100);
	ortho(-width / 2, width / 2, height / 2, -height / 2, -1600, 1600);

}

function draw() {
	background(0, 0, 10);
	randomSeed(frameCount / 80);
	orbitControl();
	ambientLight(0, 0, 66);
	// pointLight(0,0,-100, 0, 0, 100);
	directionalLight(0, 0, 25, 1, 0, -1);

	let d = width * 0.55;
	rotateX(int(random(8)) * 360 / 8);
	rotateY(int(random(8)) * 360 / 8);
	rotateZ(int(random(8)) * 360 / 8);
	push();
	translate(-d / 2, -d / 2, -d / 2);
	separateGrid(0, 0, 0, d);
	pop();
	// noLoop();
}


function separateGrid(x, y, z, d) {
	let sepNum = int(random(1, 4));
	let w = d / sepNum;
	for (let i = x; i < x + d - 1; i += w) {
		for (let j = y; j < y + d - 1; j += w) {
			for (let k = z; k < z + d - 1; k += w) {
				if (random(100) < 90 && d > width / 5) {
					separateGrid(i, j, k, w);
				} else {
					push();
					translate(i + w / 2, j + w / 2, k + w / 2);
					noStroke();
					specularMaterial(0, 0, 20);
					fill(random(palette));
					if (random(100) > 50) {
						sphere(w / 2 * 0.8);
					} else {
						box(w * 0.8);
					}
					pop();
				}
			}
		}
	}
}