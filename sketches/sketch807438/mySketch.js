let url = "https://coolors.co/app/e2302d-510048-000028-e25b53-044472";
let pallete = [];
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  pallete = createPallete(url);
  speech = new p5.Speech(); // speech synthesis object
}

function draw() {
  background(0, 0, 95);
  separateGrid(0, 0, width);
  frameRate(1);
  speech.setVoice("Google UK English Female");
  // print(speech.listVoices());
  noLoop();
}

function separateGrid(x, y, d) {
  let sepNum = int(random(1, 4));
  let w = d / sepNum;
  for (let i = x; i < x + d - 1; i += w) {
    for (let j = y; j < y + d - 1; j += w) {
      if (random(100) < 90 && d > width / 6) {
        separateGrid(i, j, w);
      } else {
        let bgNum = int(random(pallete.length));
        let bgColor = pallete[bgNum];
        let s = str[int(random(str.length))];
        let button = createButton(s);
        button.mousePressed(function() {
          speech.speak(s);
        });
        button.style("background-color", bgColor);
        button.style("color", "#ffffff");
        button.style("margin", "0px");
        button.style("vertical-align", "middle");
        button.style("text-align", "center");
        button.style("line-height", w + "px");
        button.style("font-size", w * 2 / 3 + "px");
        button.position(i + 2, j + 2);
        button.style("width", w - 2 * 2 + "px");
        button.style("height", w - 2 * 2 + "px");
        button.style("border-radius", w / 10 + "px");
        button.style("outline", "none");
      }
    }
  }
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}