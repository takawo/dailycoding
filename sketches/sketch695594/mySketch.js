let offset = 40;
let pallete = ["#B1740F", "#1789FC", "#FFD07B", "#FDB833", "#296EB4"];

function setup() {
	createCanvas(800, 800);
	init();
}

funciton init(){

}


function draw() {
	background(255);
	let x = offset;
	let y = offset;
	let w = width - offset * 2;
	let h = height - offset * 2;
	let depth = int(random(3, 15));
	let n = int(random(pallete.length));
	separateRect(x, y, w, h, depth, n);
	noLoop();
}

function mousePressed(){
	redraw();
}

function separateRect(_x, _y, _w, _h, _depth, _n) {
	let density = sqrt(sq(_w) + sq(_h));
	let maxDensity = sqrt(sq(width - offset * 2) + sq(height - offset * 2));
	strokeWeight(0.5);
	noStroke();
	fill(pallete[_n % pallete.length]);
	rect(_x, _y, _w, _h);
	if (_depth > 0) {
		let n = .5;random(0.4, 0.6);
		let x1, y1;
		if (random(100) < 50) {
			x1 = _x;
			y1 = lerp(_y, _y + _h, n);
		} else {
			x1 = lerp(_x, _x + _w, n);
			y1 = _y;
		}
		let w = _w - abs(_x - x1);
		let h = _h - abs(_y - y1);
		separateRect(x1, y1, w, h, _depth - 1, _n + 3)
		if (_w - w != 0) {
			separateRect(_x, _y, _w - w, h, _depth - 1, _n + 1)
		} else {
			separateRect(_x, _y, _w, _h - h, _depth - 1, _n + 2)
		}
	}
}