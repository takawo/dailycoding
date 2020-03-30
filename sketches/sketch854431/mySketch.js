let blend_mode;
let colorPickerA;
let colorPickerB;
let colorPickerC;
let blurRadius;

function setup() {
	createCanvas(800, 800);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);

	textAlign(CENTER);
	background(200);

	sel = createSelect();
	sel.option('BLEND');
	sel.option('ADD');
	sel.option(' DARKEST');
	sel.option('LIGHTEST');
	sel.option('DIFFERENCE');
	sel.option('EXCLUSION');
	sel.option('MULTIPLY');
	sel.option('SCREEN');
	sel.option('REPLACE');
	sel.option('REMOVE');
	sel.option('OVERLAY');
	sel.option('HARD_LIGHT');
	sel.option('SOFT_LIGHT');
	sel.option('DARKEST');
	sel.option('DODGE');
	sel.option('BURN');
	sel.position(width - sel.size().width - 55, 25);

	blend_mode = MULTIPLY;
	sel.selected('MULTIPLY');

	sel.changed(mySelectEvent);

	colorPickerA = createColorPicker(color(0, 0, 95));
	colorPickerA.position(width - 150, 60);

	colorPickerB = createColorPicker(color(180, 100, 100));
	colorPickerB.position(width - 150, 90);

	colorPickerC = createColorPicker(color(0, 0, 50));
	colorPickerC.position(width - 150, 120);

	blurRadius = createSlider(0, 200, 30);
	blurRadius.position(width - 150, 150);
	blurRadius.size(100, 40);

	textFont("Helvetica");
	textAlign(RIGHT, CENTER);
}

function mySelectEvent() {
	blend_mode = eval(sel.value());
}

function draw() {

	let backgroundColor = colorPickerA.color();
	let fillColor = colorPickerB.color();
	let shadowColor = colorPickerC.color();

	drawingContext.shadowColor = shadowColor;
	drawingContext.shadowBlur = blurRadius.value();

	background(backgroundColor);
	blendMode(blend_mode);

	push();
	translate(width / 2, height / 2 + height / 20);
	let colorStartAngle = hue(fillColor);
	rotate(-90);
	let r = 180;
	for (let angle = 0; angle < 360; angle += 360 / 3) {
		let x = cos(angle) * r / 1.5;
		let y = sin(angle) * r / 1.5;
		fill((colorStartAngle + angle) % 360, saturation(fillColor), brightness(fillColor));
		noStroke();
		ellipse(x, y, r * 2, r * 2);
	}
	pop();

	drawingContext.shadowBlur = 0;
	blendMode(BLEND);
	fill(0, 0, brightness(backgroundColor) > 50 ? 0 : 100);
	text("Blend Mode:", sel.position().x - 10, 35);
	text("Background Color", colorPickerA.position().x - 10, 70);
	text("Base Fill Color", colorPickerB.position().x - 10, 100);
	text("Shadow Color", colorPickerC.position().x - 10, 130);
	text("Shadow Blur Radius: " + blurRadius.value(), blurRadius.position().x - 10, 170);
}