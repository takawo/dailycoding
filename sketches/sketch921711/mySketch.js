var connectCounter = 0;

let socket = io.connect(":30000?sketch=921645",function() { connectCounter++; });


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);

	socket.on("mouse", function(data) {
		fill(255);
		circle(data.x, data.y, data.d);
		line(mouseX, mouseY, data.x, data.y);
	});
}

function draw() {
	let num = connectCounter;
	text(num, 100, 100);
	var data = {
		x: mouseX,
		y: mouseY,
		d: 20
	}; //dataの中身は自分の送りたいものを指定する。
	socket.emit("mouse", data); //"mouse"の部分は任意の文字列
}