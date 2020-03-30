let endDate = new Date('2120/11/28 00:00:00');
let font;
let txtSize;
function preload() {
	font = loadFont("NotoSerifJP-ExtraLight.otf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	textFont(font);
	txtSize = max(width, height);	
}

function draw() {
	background(0, 0, 95);

	let nowDate = new Date();
	let period = endDate - nowDate;

	if (period >= 0) {
		let day = floor(period / (1000 * 60 * 60 * 24));
		period -= (day * (1000 * 60 * 60 * 24));
		let hour = floor(period / (1000 * 60 * 60));
		period -= (hour * (1000 * 60 * 60));
		let minutes = floor(period / (1000 * 60));
		period -= (minutes * (1000 * 60));
		let second = floor(period / 1000);
		let str = "残り" + zeroFill(day, 5) + "日";
		str += "\n";
		str += zeroFill(hour, 2) + "時間" + zeroFill(minutes, 2) + "分" + zeroFill(second, 2) + "秒";
		textSize(txtSize / 10);
		fill(0, 0, 15);
		textAlign(CENTER, CENTER);
		text(str, width / 2, height / 2);
	}
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
	txtSize = max(width, height);
}


function zeroFill(n, fillCount) {
	let m = pow(10, fillCount);
	return ((m + n) + "").slice(-1 * fillCount);
}