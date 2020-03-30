function setup() {
	//windowWidth,windowHeightを使うと画面全体にキャンバスの大きさを指定できる．
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(frameCount % 360, 80, 100);
}

function mousePressed() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let fs = fullscreen();
		fullscreen(!fs);
		resizeCanvas(windowWidth, windowHeight);
	}
}

//ウィンドウサイズが変更されたときに実行される関数
function windowResized() {
	// print("ウィンドウサイズの変更");
	resizeCanvas(windowWidth, windowHeight);
}

//windowResized関数でリサイズされたときにキャンバスのサイズを変更する