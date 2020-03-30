function setup() {
	createCanvas(740, 500);
	background("#005481");
}

function draw() {
	//マウスを押したときだけ{}処理する mousePressed関数でも同様のことはできる
	if (mouseIsPressed) {
		let x = mouseX;
		let y = mouseY;

		x = x + random(-10, 10);
		y = y + random(-10, 10);

		stroke("#19A591");
		point(x, y);
		point(x + random(20, 30), y - random(20, 30));

		stroke("#EEF1F7");
		point(x, y);
		point(x - random(10, 50), y + random(10, 50));

		noStroke();
		fill("#B2D6B5");
		let d = random(2, 5);
		x = x + random(-10, 10);
		y = y + random(-10, 10);
		ellipse(x, y, d, d);


		fill("#EEF1F7");
		x = x + random(-20, 20);
		y = y + random(-20, 20);
		ellipse(x, y, d - 1, d - 1);
	}
}

//キーボードを押したときに実行される関数keyPressed
function keyPressed() {
	background("#005481");
}