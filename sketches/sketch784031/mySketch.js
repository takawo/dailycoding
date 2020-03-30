function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
}
function draw(){
  background(0, 0, 95);
  separateGrid(0, 0, width);
	frameRate(1);
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 15) {
        separateGrid(i, j, w);
      } else {
				rect(i,j,w,w);
      }
    }
  }
}