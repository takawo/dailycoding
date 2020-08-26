let isRecording = false;

function setup() {
	createCanvas(600, 600);
}

function draw() {
	background(255);
	noFill();
	let i = 0;
	drawingContext.shadowColor = color(0, 128);
	drawingContext.shadowBlur = 15;
	for (let d = width - 20; d > 0; d -= 50) {
		drawingContext.setLineDash([30, 10]);
		drawingContext.lineDashOffset = 1 * frameCount % 40 * (i % 2 == 0 ? -1 : 1);
		strokeWeight(5);
		strokeCap(SQUARE);
		rect((width - d) / 2, (height - d) / 2, d, d);
		i++;
	}
}

function mousePressed() {
	if (isRecording == true) {
		stopRecording();
	} else {
		startRecording();
	}
	isRecording = !isRecording;
}