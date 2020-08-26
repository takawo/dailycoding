//reference: @wks_jp's awesome tiling sketch!
//https://twitter.com/wks_jp/status/1290963165195296773

let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
}

function draw() {
	background(0, 0, 90);
	let cells = int(random(3, 10));
	let offset = width / 20;
	let d = (width - offset * 2) / cells;

	for (let k = cells; k >= 0; k--) {
		for (let n = 0; n < 2; n++) {
		for (let j = 0; j < k; j++) {
			for (let i = 0; i < k; i++) {
				let offset2 = offset + d / 2 * (cells - k);
				let cx = offset2 + i * d + d / 2;
				let cy = offset2 + j * d + d / 2;
				randomSeed(cx * cy+frameCount);
				let angle = int(random(4)) * 360 / 4+45;
				angle +=n * 180;
				noStroke();
				drawingContext.shadowColor = color(0, 0, 0, 15);
				drawingContext.shadowBlur = d / 4;

				let gradient = drawingContext.createRadialGradient(
					cx, cy, 0, cx, cy, d / 2);
				palette = shuffle(palette,true);
				let c1 = random(palette);
				let c2 = random(palette);
				while (c1 == c2) {
					c2 = random(palette);
				}

				if(n == 0){
				gradient.addColorStop(0, c1);
				gradient.addColorStop(1, c2);
				}else{
				gradient.addColorStop(0, c2);
				gradient.addColorStop(1, c1);

				}
				drawingContext.fillStyle = gradient;
				let ratio = 1;

				arc(cx, cy, d * ratio, d * ratio, angle, angle + 180, PIE);
			}
		}
		}
	}
	// noLoop();
	frameRate(0.5);

}