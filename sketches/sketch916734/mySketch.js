//reference: junkiyoshi's awesome 3D sketch!
//https://twitter.com/junkiyoshi/status/1271400163311902720

let capture;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background(20);
  orbitControl();
  rotateY(180 + frameCount);

  let img = capture.get();
  let step = 20;
  for (let i = 0; i < step; i++) {
    let y = map(i, 0, step, -height / 3, height / 3);
    push();
    translate(0, y, 0);
    rotateY(i);
    let img_trim = img.get(0, i / step * img.height, img.width, img.height / step);
    let n = noise(i / 10, frameCount / 100);
    let d = map(n, 0, 1,30, 300);
    texture(img_trim);
    noStroke();
    cylinder(d, height * 2 / 3 / step);
    pop();
  }
	if(frameCount > 720){
		print("sorry we cannot play this sketch over 720 frames, because webgl lost context...");
		noLoop();
		// cause webgl context lost.
	}
}