let data;

function preload() {
  let url = 'https://gist.githubusercontent.com/shinout/1403826/raw/421d01202c4b065cd2c4c5f4294492bd2d8809b8/jis1_regular_merged.json';
  data = loadJSON(url);
}

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
      if (random(100) < 90 && d > width / 5) {
        separateGrid(i, j, w);
      } else {
        textSize(w);
        textAlign(CENTER, CENTER);
        let str = data[int(random(Object.keys(data).length))];
        text(str, i + w / 2, j + w / 2 + w / 8);
      }
    }
  }
}